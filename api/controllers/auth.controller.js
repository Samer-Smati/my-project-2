const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname, 
    email: req.body.email,
    formation: req.body.formation,
    product: req.body.product, 
    number: req.body.number, 
    password: bcrypt.hashSync(req.body.password, 8),
  });
  
  try { 
    await user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.roles) {
        Role.find(
          { 
            name: { $in: req.body.roles } 
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "student" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            } 
  
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error }); 
  }
  
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        formation: user.formation, 
        product: user.product,
        number: user.number,   
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};