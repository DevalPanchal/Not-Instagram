const express = require("express");
const router = express.Router();

let User = require("../model/user.model");

const auth = require("./auth/middleware/auth");

// get user by id
router.get("/get-user", auth, async (req, res)=>{
     try {
        // Store userID
        let userID = req.user;
  
        // get user info from db
        let userInfo = await User.findOne({ _id: userID });
 
        res.json(userInfo);
     } catch (error) {
         console.error(error);
         res.status(500).json("server error");
     }
});

// get all users
router.get("/all-users", auth, async(req, res) => {
    try {
        // query db
        let allUsers = await User.find();

        let userID = req.user;

        let userInfo = await User.findOne({ _id: userID });

        // get all usernames
        let usernames = allUsers.map((item) => item.username);

        // remove user who requested the all user names
        usernames = usernames.filter((user) => user !== userInfo.username);

        res.json(usernames);
    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }
});

module.exports = router;