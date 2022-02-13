const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./models/index");
const Role = db.role;   
const dbConfig = require("./config/db.config")


db.mongoose  
  .connect(`mongodb+srv://${dbConfig.HOST}:${dbConfig.password}@cluster0.hgywt.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
  }) 
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial()
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  function initial() { 
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
  
        new Role({
          name: "teacher"
        }).save(err => {
          if (err) {
            console.log("error", err); 
          }
  
          console.log("added 'teacher' to roles collection");
        });
  
        new Role({
          name: "gestionaire"
        }).save(err => { 
          if (err) {  
            console.log("error", err);
          }
  
          console.log("added 'gestionaire' to roles collection");
        });

        new Role({
          name: "student"
        }).save(err => { 
          if (err) {
            console.log("error", err); 
          }
  
          console.log("added 'student' to roles collection");
        });
      }
    });
  }
  
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to samer application." });
}); 

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/salle.routes')(app); 
// set port, listen for requests  
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});  