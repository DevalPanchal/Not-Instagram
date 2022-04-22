const express = require("express");
const router = express.Router();

let User = require("../model/user.model");

const auth = require("./auth/middleware/auth");


/**
 * let friend = req.params.friend;

          let userID = req.user;

          console.log(req.user);
          let userInfo = await User.findOne({ userID });
          console.log(userInfo);

          // add friend to users db
          await User.updateOne({
               id: userID,
               $push: { friends: friend }
          });


          console.log("Friend added!");
          res.json(userInfo);
 */

module.exports = router;