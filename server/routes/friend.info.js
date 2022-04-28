const express = require("express");
const router = express.Router();

let User = require("../model/user.model");

const auth = require("./auth/middleware/auth");
const fs = require("fs");
const { convertImageBase64 } = require("../utility/image.utility");

// add friend
router.post("/add/:friend", auth, async (req, res) => {
    try {
        // get user id
        let userID = req.user;

        // get friend name
        let friendName = req.params.friend;

        // update original user array with new friend
        await User.updateOne(
             { _id: req.user },
             { $push: {friends: friendName }}
        );
         
        // get user info
        let userInfo = await User.findOne({ _id: userID });

        // get user info
        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});

// delete friend
router.delete("/delete/:friend", auth, async (req, res) => {
    try {
        // get user id
        let userID = req.user;
        // get friend name
        let friendName = req.params.friend;

        // find friend to be deleted in db
        let findFriend = await User.findOne({ _id: userID });

        if (findFriend) {
            let foundFriend = findFriend.friends.includes(friendName);
            if (!foundFriend) {
                return res.status(404).json("This person does not exist in the database");
            }
        }

        // update original user array with removing friend
        await User.updateOne(
            { _id: userID },
            { $pull: { friends: { $in: [friendName] } }}
        );

        // get user info
        let userInfo = await User.findOne({ _id: userID });

        // get user info
        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});

// send friend request
router.post("/request/:friend", auth, async (req, res) => {
    try {
        // get friend request name (to: Deval2)
        let friendRequest = req.params.friend; 

        // get user id
        let userID = req.user;
        
        // get user info
        let userInfo = await User.findOne({ _id: userID });

        // get requests array
        let requests = [...userInfo.requests];

        if (!requests.includes(friendRequest)) {
            // add request to the curr user
            await User.updateOne(
                { _id: userID },
                { $push: { requestSent: friendRequest } }
            );

            // add request to the requested user
            await User.updateOne(
                { username: friendRequest },
                { $push: { requests: userInfo.username } }
            );
        } else {
            return res.json("You already sent this person a friend request");
        }

        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(404).json("Server error");
    }
});

// accept friend request
router.post("/accept/:friend", auth, async (req, res) => {
    try {
        // login as Deval2
        // get friend request name (from: Deval)
        let friendAccept = req.params.friend; // Deval

        // get user id
        let userID = req.user;

        let userInfo = await User.findOne({ _id: userID }); // info for Deval2

        let allFriends = [...userInfo.friends];

        if (!allFriends.includes(friendAccept)) {
            // remove from friend request
            await User.updateOne(
                { _id: userID },
                { $pull: { requests: { $in: [friendAccept] } } },
            );
            
            // remove from friend request
            await User.updateOne(
                { username: friendAccept },
                { $pull: { requestSent: { $in: [userInfo.username] } } },

            );
            

            // add as friend
            await User.updateOne(
                { _id: userID },
                { $push: { friends: friendAccept } }
            );
                          
            await User.updateOne(
                { username: friendAccept },
                { $push: { friends: userInfo.username } }
            );
        } else {
            return res.status(404).json("This person is already your friend");
        }
        
        // // add as friend
        // await User.updateOne(
        //     { _id: userID },
        //     { $push: { friends: friendAccept } }
        // );
        
        // 
        // await User.updateOne(
        //     { username: friendAccept },
        //     { $push: { friends: friendAccept } }
        // );
        

        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(404).json("Server error");
    }
});

// get friend info
router.get("/get/friend", auth, async(req, res) => {
    try {
        // get userID
        let userID = req.user;

        // get user info
        let userInfo = await User.findOne({ _id: userID });

        // get user friends
        let friends = [...userInfo.friends];

        let userImages = [];

        let image = "";
        // get friend info
        for (let i = 0; i < friends.length; i++) {
            // fetch friend info
            let friendInfo = await User.findOne({ username: friends[i] });
            
            let userPath = friendInfo.imagePath + "profile.jpg";

            if (fs.existsSync(userPath)) {
                let extension = userPath.match(/\.[0-9a-z]+$/i);

                image = convertImageBase64(userPath, extension[0]);

                userImages.push(image);
            }
            // console.log(friendInfo.imagePath);
        }

        let result = [];

        for (let i = 0; i < friends.length; i++) {
            result.push({
                username: friends[i],
                image: userImages[i]
            });
            if (i === friends.length - 1) {
                res.json(result);
            }
        }

        // res.json(friends);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});

// get single user info
router.get("/user/info/:username", auth, async(req, res) => {
    try {
        // get user name
        const username = req.params.username;

        // get user info
        let userInfo = await User.findOne({ username: username });
        let userPath = userInfo.imagePath + "profile.jpg";
        let image = "";
        if (fs.existsSync(userPath)) {
            let extension = userPath.match(/\.[0-9a-z]+$/i);
            image = convertImageBase64(userPath, extension[0]);
        }

        let result = {
            id: userInfo._id,
            username: userInfo.username,
            friends: userInfo.friends,
            image: image
        }

        
        res.json(result);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;