const express = require("express");
const router = express.Router();

let Comment = require("../model/comment.model");

const auth = require("./auth/middleware/auth");

// get comment by id

// get comment by user id

// get comment by post id

// get all comments
router.get("/all-comments", auth, async(req, res) => {
    try {
        // query db
        let allComments = await Comment.find();
        console.log(allPosts);

        // get all comments
        let comments = allComments.map((item) => item.text);

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }
});

// get comment by user and post id

// add comment

// delete comment

module.exports = router;