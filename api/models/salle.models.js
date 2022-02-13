const mongoose = require('mongoose');

const salleSchema = mongoose.model(
    "Salle",new mongoose.Schema({
        name: {type:String,required:true,unique:true},    
        status: {type:String,required:true},
        created_At: {type:Date,default:Date.now()}, 
        assigned_to: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            unique:true,  
            ref: "User"
          }
        ]
      })
);
 
module.exports = salleSchema;

