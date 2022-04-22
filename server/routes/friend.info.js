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

module.exports = router;