const express = require("express");
const router = express.Router();

let User = require("../../model/user.model");


const auth = require("../auth/middleware/auth");

router.get("/get-user", auth, async (req, res) => {
    try {
         // this stores the userID
         let userID = req.user;

         console.log(req.user);

         // get user info from db
         let userInfo = await User.findOne({ userID });

         res.json(userInfo);
    } catch (error) {
         console.error(error);
         res.status(500).json("server error");
    }
});

module.exports = router;