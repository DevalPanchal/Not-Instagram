const express = require("express");

const router = express.Router();
let User = require("../model/user.model");


// add user
router.post("/add", async (req, res) => {
     try {
          const username = req.body.username;
          const password = req.body.password;

          // new user object
          const newUser = await new User({ username, password });
          
          // save user to db
          await newUser.save();
          
          res.json("User added!");
     } catch (error) {
          console.error(error);
          res.status(400).json("Error: " + error);
     }
})

// get users
router.get("/", async (req, res) => {
     try {
          let users = await User.find();

          res.json(users);
     } catch (error) {
          console.error(error);
          res.status(400).json("Error: " + error);
     }
})

// delete user




module.exports = router;