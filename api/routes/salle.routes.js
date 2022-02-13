const controller = require("../controllers/salle.controller");

module.exports = function(app) {

    app.get( 
        "/salles",
        controller.allSalles 
      );
      app.post(  
        "/addSalle", 
        controller.addSalle  
      ); 
      app.put(  
        "/editSalle", 
        controller.updateSalle   
      );  
      app.post(
        "/deleteSalle", 
        controller.deleteSalle   
      ); 
}