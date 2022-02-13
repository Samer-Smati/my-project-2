const config = require("../config/auth.config");
const db = require("../models/index");

const Salle = db.salle;
const User = db.user;


exports.allSalles = async (req, res) => {
    try { 
      const salles = await Salle.find().populate("assigned_to", "firstname lastname phone email -_id").exec() ;  
      res.status(200).send(salles);       
    } catch (error) { 
      res.status(500).send({ message: error });
    }  
}; 
 
exports.addSalle = async (req, res) => {
    const salle = new Salle({
        name: req.body.name,
        status: req.body.status,  
      });
     
      try { 
        await salle.save((err, oneSalle) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
      
          if (req.body.assigned_to) {
            User.find( 
              {email: req.body.assigned_to},  
              (err, assigned_to) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                } 
                oneSalle.assigned_to = assigned_to.map(user => user._id);
                oneSalle.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }

                  res.send({ message: "Salle was registered successfully!" });
                });
              }
            );
          }
        });
      } catch (error) {
        res.status(500).send({ message: error }); 
      }
}; 


exports.updateSalle = async (req, res) => {  
  const user = await User.findOne({ email: req.body.assigned_to});  
  req.body.assigned_to = user
  try{
    const updatedSalle = await Salle.findOneAndUpdate({name: req.body.nameClass},{$set:{...req.body}}) 
    res.status(200).send({msg:'Salle updated successfully',updatedSalle})
  }catch(err){
    res.status(400).send(err); 
  }  
};  

exports.deleteSalle = async (req, res) => {    
  
  try {
    const DeltedSalle = await Salle.findOneAndRemove({name: req.body.name});
    res.status(200).send({message: 'Salle successfully deleted'});
  } catch (error) { 
    res.status(500).send(error);
  }
};  