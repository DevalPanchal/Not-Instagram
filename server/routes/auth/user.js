const express = require("express");
const router = express.Router();
const jwtToken = require("../../utility/jwtToken");

const bcrypt = require("bcrypt");

let User = require("../../model/user.model");
const jwtGenerator = require("../../utility/jwtToken");
const auth = require("./middleware/auth");

const fs = require('fs');


// verify jwt token
router.get("/verify", auth, async(req, res) => {
     try {
          console.log(true);
          let userID = req.user;

          let userInfo = await User.findOne({ _id: userID });

          res.json({ verify: true, name: userInfo.username });
     } catch (error) {
          console.error(error);
          res.status(500).json("Server error");
     }
});

// register route (add user)
router.post("/register", async(req, res) => {
     try {
          // get username and password
          const username = req.body.username;
          const password = req.body.password;

          // check if user exists in db
          let user = await User.findOne({ username });
          
          // if user exists then return
          if (user) {
               return res.status(401).json("User already exists");
          } 

          // salt rounds for hash
          const saltRounds = 12;

          // generate salts
          const genSalt = await bcrypt.genSalt(saltRounds);

          // hash password
          const hashedPassword = await bcrypt.hash(password, genSalt);
          
          // set user image path -> ./storage/images/user_x
          let userImagePath = "./storage/images/user_" + username + "/";

          // make user folder
          fs.mkdir(userImagePath, (err) => {
               if (err) {
                    // check err
                    console.log(err);
               } else {
                    // successful
                    console.log("User directory made!");
               }
          });

          // make new user
          const newUser = await new User({ username, password: hashedPassword, imagePath: userImagePath });
          
          // get user id
          let userID = newUser._id;

          // save user to db
          await newUser.save();

          // generate token on payload of user id
          const token = jwtGenerator(userID);

          // res.json token
          res.json({ token });
     } catch (error) {
          console.error(error);
          res.status(500).json("Server error");
     }
});

// login route
router.post("/login", async(req, res) => {
     try {
          const username = req.body.username;
          const password = req.body.password;

          const user = await User.findOne({ username });

          // if user doesn't exist in db then return unauthenticated
          if (user === null) {
               return res.status(401).json("Password and username mismatch");
          }

          const validPassword = await bcrypt.compare(password, user.password);

          if (!validPassword) {
               return res.status(401).json("Password or username is incorrect try again.");
          }

          const token = jwtGenerator(user._id);

          res.json({ token, username });
     } catch (error) {
          console.error(error);
     }
});


// get users
router.get("/users", auth, async(req, res) => {
     try {
          let users = await User.find();

          res.json(users);
     } catch (error) {
          console.error(error);
          res.status(500).json("Server error");
     }
});

// get single user
router.get("/:username", auth, async (req, res) => {
     try {
          // get username from query parameter
          let username = req.params.username;

          // get user info from db
          let userInfo = await User.findOne({ username });

          res.json(userInfo);
     } catch (error) {
          console.error(error);
          res.status(500).json("Server error");
     }
});

// delete user
router.delete("/delete/:username", auth, async (req, res) => {
     try {
          // get username from query parameter
          let username = req.params.username;

          let userFolderPath = "./storage/images/user_" + username;

          let files = "";

          files = fs.readdirSync(userFolderPath);

          for (const file of files) {
               fs.unlinkSync(path.join(userFolderPath, file), (err) => {
                    if (err) {
                         console.error(err);
                    }
               })
          }

          // delete user file
          fs.rmdirSync(userFolderPath, (err) => {
               if (err) {
                    console.log(err);
               } else {
                    console.log("User directory successfully removed!");
               }
          });

          // delete user -> can also be written await User.deleteOne({ username: username })
          await User.deleteOne({ username });

          res.json(`${username} has been deleted from DB`);
     } catch (error) {
          console.error(error);
          res.status(500).json("Server error");
     }
});



module.exports = router;