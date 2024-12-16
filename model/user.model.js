const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    username: {
        // type of input that a user can enter
        type: String,
        // if it is mandatory or not
        required:true,
        // if it is unique or not
        unique:true,
        // if it is case sensitive or not
        caseSensitive:false,
        trim:true,
        minLength:5,
        maxLength:15,
    
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        // string validation
        // match:/.+\@.+\..+/,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }
}, {

    timestamps:true
});

// this is to save this scheme as name "User" on the server
const User = mongoose.model("User", userSchema);

// this is to export the user model
module.exports=User;

