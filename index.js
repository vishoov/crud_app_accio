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
app.get("/api/users", async (req, res)=>{
    
  try{
    const users = await User.find({});
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
})


//dynamic routing
//querying 
//query parameters are used to filter the data
// API 
//host/api/user/id or any identifier
//we need to search something specific
//login page 
//username and password

app.get("/api/users/:id", async (req, res)=>{
  try{
    // req.body
    const { id }= req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
})

//updating
app.put("/api/users/:id", async(req, res)=>{
  try{
    //the server first finds the user based on id
    //updates the necessary information after extracting it from the body
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    //we made the changes here

    //if the user is not found
    //we can handle this error
    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    //this is to confirm if the changes have been implemented or not
    const updatedUser= await User.findById(req.params.id);
    //confirm the changes here
    res.status(200).json(updatedUser);

  }
  catch(error){
    res.status(500).json({message:err.message});
  }
})



//port listener
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
