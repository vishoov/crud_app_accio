const User = require("../model/user.model");




const postRoute = async (req, res)=>{
    
        try{
            const user = await User.create(req.body);
            console.log(user);
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json({message:err})
        }
    }


const getRoute = async (req, res)=>{
    
    try{
      const users = await User.find({});
      res.status(200).json(users);
    }
    catch(err){
      res.status(500).json({message:err.message});
    }
  }


  const getID= async (req, res)=>{
    try{
      // req.body
      const { id }= req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    }
    catch(err){
      res.status(500).json({message:err.message});
    }
  };


  const putID= async(req, res)=>{
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
  };


  const deleteID= async (req, res)=>{
    try{
      const user = await User.findByIdAndDelete(req.params.id);
  
  
      //error handing
      if(!user){
        return res.status(404).json({message:"User not found"});
      }
  
      //making sure that the user is deleted by checking the user info
      // res.status(200).json(user);
      // it says user has been deleted
      res.status(200).json({message:"User deleted successfully"});
    }
    catch(err){
      res.status(500).json({message:err.message});
    }
  };


module.exports = {
    postRoute,
    getRoute,
    getID, 
    putID,
    deleteID
};