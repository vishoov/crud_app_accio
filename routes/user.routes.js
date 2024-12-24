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
  deleteID
} = require("../controllers/user.controllers");



//ever route here would start after /api/users

//post users route
router.post("/signup", postRoute);


//get users route
router.get("/", getRoute);


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "User doesnt exist" });
    }

    //check the password from bcrypt
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    const payload = {
      username: user.username,
      
    };
    const token = await generateToken(payload);
    res.status(200).json({ user: user, token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


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