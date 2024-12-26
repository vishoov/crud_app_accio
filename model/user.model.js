const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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
    password:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }
}, {

    timestamps:true
});



// this is to hash the password before saving it to the database
 userSchema.pre("save", async function(next){
    //exrtacting the user information 
    const user = this;

    //check if the password is changed
    if(!(user.isModified("password"))){
        return next();
    }

     try{
        //it generates a salt for the password
        const salt = await bcrypt.genSalt(10);

        //hash the password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        //assign the hashed password to the user password
        user.password = hashedPassword;


        next();
    }
     catch(err){
            console.log(err);
     }
 })

userSchema.methods.comparePassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
        //bcrypt takes the inputted password
        //it encrypts it
        //it compares it with the password in the database


    }
    catch(err){
        console.log(err);
    }
}

 // this is to save this scheme as name "User" on the server
const User = mongoose.model("User", userSchema);



// this is to export the user model
module.exports=User;

