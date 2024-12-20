const express = require("express");
const app = express();

// mongoose is the driver that helps us to interact with the database and makes sure that the data is properly validated and structured
const mongoose = require("mongoose");
const User = require("./model/user.model");
const userRoutes = require("./routes/user.routes.js");
// it enables our server to PARSE the json sent by the client
app.use(express.json());

const PORT = 3000;

const DBurl =
  "mongodb+srv://selmonbhai:ZLVkMulJzttssMcl@cluster0.gec1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";




mongoose.connect(DBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database has been Connected!"))
.catch((err)=> console.log(err));


//home route
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the best CRUD API ever</h1><br> <p>This CRUD Api is built using node.js, express and mongoDB</p>"
  );
});

//these routes are for USER MANAGEMENT from the database
app.use("/api/users", userRoutes);
//earlier the routes were here
//but now based on mvc architecture they are shifted to the routes folder
//this is good for categorising routes and making sure that we have public routes 
// and protected routes 
// properly organised and segregated


//port listener
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
