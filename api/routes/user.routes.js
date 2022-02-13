const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get( 
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get( 
    "/api/teacher",
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.teacherBoard
  );

  app.get( 
    "/api/student", 
    [authJwt.verifyToken, authJwt.isStudent],
    controller.studentBoard
  ); 

  app.get( 
    "/api/gestionaire", 
    [authJwt.verifyToken, authJwt.isGestionaire],
    controller.gestionaireBoard
  );
  app.get(
    "/users",
    controller.allUsers
  );
  app.get(
    "/roles",
    controller.allRoles 
  );
  app.post(  
    "/delete",
    controller.deleteUser 
  ); 
  app.put(
    "/updateUser",
    controller.updateUser  
  ); 
};