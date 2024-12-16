const express = require("express");
const app = express();

// mongoose is the driver that helps us to interact with the database and makes sure that the data is properly validated and structured
const mongoose = require("mongoose");
const User = require("./model/user.model");

// it enables our server to PARSE the json sent by the client
app.use(express.json());

const PORT = 3000;

const DBurl =
  "mongodb+srv://selmonbhai:ZLVkMulJzttssMcl@cluster0.gec1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DBurl)
.then(() => console.log("Database has been Connected!"))
.catch((err)=> console.log(err));


//home route
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the best CRUD API ever</h1><br> <p>This CRUD Api is built using node.js, express and mongoDB</p>"
  );
});

//post users route
app.post("/api/users", async (req, res)=>{
    try{
        const user = await User.create(req.body);
        console.log(user);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message:err})
    }
});


//get users route
app.get("/api/users", (req, res)=>{
    res.send("Here the users will be displayed")

})



//port listener
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
