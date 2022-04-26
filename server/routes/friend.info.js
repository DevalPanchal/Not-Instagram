const express = require("express");
const router = express.Router();

let User = require("../model/user.model");

const auth = require("./auth/middleware/auth");

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

module.exports = router;