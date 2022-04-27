const express = require("express");
const router = express.Router();

let User = require("../model/user.model");

const auth = require("./auth/middleware/auth");
const fs = require('fs');
const { convertImageBase64 } = require("../utility/image.utility");

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
        
        let userImages = [];

        let image = "";
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].username !== userInfo.username) {
                let userPath = allUsers[i].imagePath + "profile.jpg";
                
                if (fs.existsSync(userPath)) {
                    let extension = userPath.match(/\.[0-9a-z]+$/i);
                    
                    image = convertImageBase64(userPath, extension[0]);
                    userImages.push(image);
                }
            }
        }
        
        // get all usernames
        let usernames = allUsers.map((item) => item.username);
        // remove user who requested the all user names
        usernames = usernames.filter((user) => user !== userInfo.username);
        
        let result = [];

        for (let i = 0; i < usernames.length; i++) {
            result.push({
                username: usernames[i],
                image: userImages[i]
            })
            if (i === usernames.length-1) {
                res.json(result);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }
});


module.exports = router;