const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user; 
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { role } = require("../models/index");

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
exports.teacherBoard = (req, res) => {
    res.status(200).send("Teacher Content.");
  };  

exports.gestionaireBoard = (req, res) => {
    res.status(200).send("Gestionaire Content.");
  };
  
exports.studentBoard = (req, res) => {
    res.status(200).send("Student Content.");
  }; 

exports.allUsers = async (req, res) => {
  const {currentPage,perPage} = req.query
  try { 
    //const user = await User.find().skip((perPage * currentPage) - perPage).limit(perPage).populate("roles", "-__v").exec() 
    const user = await User.find().populate("roles", "-__v").exec() 
    res.status(200).send(user);    
  } catch (error) { 
    res.status(500).send({ message: error });
  } 
}; 


exports.allRoles = async (req, res) => {
  const {currentPage,perPage} = req.query
  try { 
    const roles = await Role.find();
    res.status(200).send(roles);       
  } catch (error) { 
    res.status(500).send({ message: error });
  } 
}; 
exports.deleteUser = async (req, res) => {    
  try {
    const DeltedUser = await User.findOneAndRemove({email: req.body.email});
    res.status(200).send({message: 'User successfully deleted'});
  } catch (error) { 
    res.status(500).send(error);
  }
};  

exports.updateUser = async (req, res) => {  
  const roles = await Role.findOne({ name: req.body.roles[0]}); 
    const UpdateedUser  = {
      firstname: req.body.firstname, 
      lastname: req.body.lastname, 
      email: req.body.email,
      roles: [roles._id],  
      password: bcrypt.hashSync(req.body.password, 8), 
    }
  try{
    
    const updatedUser = await User.findOneAndUpdate({email: req.body.oldEmail},{$set:{...UpdateedUser}}) 

    res.status(200).send({msg:'User updated successfully',updatedUser})
  }catch(err){
    res.status(400).send(err); 
  } 
};  


