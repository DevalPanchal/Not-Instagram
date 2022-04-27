const express = require("express");
const router = express.Router();
const fs = require('fs');

const User = require("../model/user.model");
const { convertToBase64, convertImageBase64 } = require("../utility/image.utility");
const auth = require("./auth/middleware/auth");

// upload profile image
router.post("/upload-profile-image", auth, async(req, res) => {
    try {
        let imageUri = req.body.imageUri;
        let extension = req.body.extension[0];

        let uri = "";

        uri = convertToBase64(extension, imageUri);

        let userID = req.user;

        let userInfo = await User.findOne({ _id: userID });

        let userPath = `${userInfo.imagePath}profile${extension}`;

        fs.stat(userPath, (err) => {
            if (err) {
                fs.writeFile(userPath, uri, 'base64', (err) => {
                    if (err) {
                        console.error("Error:", err);
                    } else {
                        console.log("Image successfully stored!");
                    }
                })
            }
        });

        res.json("Profile Image successfully stored!");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});

// get profile image
router.get("/profile-image", auth, async (req, res) => {
    try {
        let userID = req.user;

        let userInfo = await User.findOne({ _id: userID });


        let userPath = userInfo.imagePath + "profile.jpg";

        let extension = userPath.match(/\.[0-9a-z]+$/i);

        let image = "";
        
        image = convertImageBase64(userPath, extension[0]);

        res.json({ image });
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
})

router.post("/upload", auth, async(req, res) => {
    try {
        // get image from user
        let imageUri = req.body.imageUri;
        let extension = req.body.extension[0];
        
        let uri = "";
        // decode base64 image
        uri = convertToBase64(extension, imageUri);
        // if (extension === ".jpg") {
        //     uri = await imageUri.replace(/^data:image\/jpeg;base64,/, "");
        // } else if (extension === ".png") {
        //     uri = await imageUri.replace(/^data:image\/png;base64,/, "");
        // }

        // get user id
        let userID = req.user;

        // get user Info
        let userInfo = await User.findOne({ _id: userID });

        // save image to users image path TODO create valid extensions
        let userPath = `${userInfo.imagePath}image${extension}`;

        // store image
        fs.stat(userPath, (err) => {
            if (err) {
                // file does not exist
                fs.writeFile(userPath, uri, 'base64', (err) => {
                    if (err) {
                        console.error("Error:", err);
                    } else {
                        console.log("Image successfully stored!");
                    }
                })
            } else {
                console.error("Error storing image");
            }
        })
        
        res.json("Image successfully stored!");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});


module.exports = router;