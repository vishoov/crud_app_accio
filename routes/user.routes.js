//import express and set up router for user routes
const { generateToken, jwtAuth } = require("../middleware/auth.js");

const express = require("express");
const User = require("../model/user.model");
//router helps in managing the routes for a particular category
const router = express.Router();
//destructure the controllers from the controllers file
const {
  postRoute,
  getRoute, 
  getID, 
  putID,
  deleteID,
  loginRoute
} = require("../controllers/user.controllers");



//ever route here would start after /api/users

//post users route
router.post("/signup", postRoute);


//get users route
router.get("/", getRoute);


router.post("/login", loginRoute);


//dynamic routing
//querying 
//query parameters are used to filter the data
// API 
//host/api/user/id or any identifier
//we need to search something specific
//login page 
//username and password

router.get("/:id", jwtAuth,getID)

//updating
router.put("/:id", putID)

//delete a user
router.delete("/:id", deleteID)

//sending the routes to be used by the server through index.js
module.exports = router;