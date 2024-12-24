const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const jwtAuth= async (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Access Denied"});
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).json({message:"Invalid Token"});
    }
}
const TOKEN_SECRET="this is a secret bhai"

const generateToken = async (payload)=>{
    return jwt.sign(payload, TOKEN_SECRET, {expiresIn:"1h"});
}

module.exports = { jwtAuth, generateToken };