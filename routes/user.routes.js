const express = require("express");
const User = require("../model/user.model");

const router = express.Router();
//destructure the controllers from the controllers file
const {
  postRoute,
  getRoute, 
  getID, 
  putID,
  deleteID
} = require("../controllers/user.controllers");




//post users route
router.post("/", postRoute);


//get users route
router.get("/", getRoute);


//dynamic routing
//querying 
//query parameters are used to filter the data
// API 
//host/api/user/id or any identifier
//we need to search something specific
//login page 
//username and password

router.get("/:id", getID)

//updating
router.put("/:id", putID)

//delete a user
router.delete("/:id", deleteID)


module.exports = router;