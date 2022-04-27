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
router.post("/add-comment", auth, async(req, res) => {
    try {
        
        let userID = req.user;
        let postID = req.body.postId;
        let commentText = req.body.text;

        const newComment = await new Post({ userId: userID, postId: postID, text: commentText, likes: 0 });
        await newComment.save();
        console.log(newComment);

        // get comment id
        let commentID = newComment._id;

        // generate token on payload of post id
        const token = jwtGenerator(commentID);

        // res.json token
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }
});

// delete comment

module.exports = router;