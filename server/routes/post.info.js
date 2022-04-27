const express = require("express");
const router = express.Router();

let Post = require("../model/post.model");

const auth = require("./auth/middleware/auth");

// get post by id
router.get("/get-post", auth, async (req, res)=>{
    try {
        // Store postID
        let postID = req.post;

        console.log(req.post);

        // get post info from db
        let postInfo = await Post.findOne({ _id: postID });

        res.json(postInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }
});

// get post by user id
// TODO: idk if this works, check the req stuff
router.get("/get-post-by-user-id", auth, async (req, res)=>{
    try {
        // Store postID
        let userID = req.userId;

        console.log(req.userId);

        // get post info from db
        let postInfo = await Post.findOne({ userId: userID });

        res.json(postInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }
});



/*
// TODO: add post
router.post("/add/:post", auth, async (req, res) => {
    try {
        // get user id
        let userID = req.user;

        // get friend name
        let postName = req.params.post;

        // update original post array with new post
        await User.updateOne(
             { _id: req.user },
             { $push: { posts: postName }}
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

// TODO: delete post
router.delete("/delete/:post", auth, async (req, res) => {
    try {
        // get user id
        let userID = req.user;

        // get post name
        let postName = req.params.post;

        // find post to be deleted in db
        let findPost = await User.findOne({ _id: userID });

        if (findPost) {
            let foundPost = findPost.posts.includes(postName); // FIXME: don't think this is gonna work lol
            if (!foundPost) {
                return res.status(404).json("This post does not exist in the database");
            }
        }

        // update original user array with removing post
        await User.updateOne(
            { _id: userID },
            { $pull: { posts: { $in: [postName] } }}
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

// TODO: add comment
router.post("/add/:comment", auth, async (req, res) => {
    try {
        // get user id
        let userID = req.user;

        // get comment name
        let commentName = req.params.post;

        // update original comment array with new comment
        await User.updateOne(
             { _id: req.user },
             { $push: { comments: commentName }}
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

// TODO: delete comment
router.delete("/delete/:comment", auth, async (req, res) => {
    try {
        // get user id
        let userID = req.user;

        // get post name
        let commentName = req.params.comment;

        // find post to be deleted in db
        let findComment = await User.findOne({ _id: userID });

        if (findComment) {
            let foundComment = findComment.posts.includes(commentName); // FIXME: don't think this is gonna work lol
            if (!foundComment) {
                return res.status(404).json("This comment does not exist in the database");
            }
        }

        // update original user array with removing comment
        await User.updateOne(
            { _id: userID },
            { $pull: { friends: { $in: [postName] } }}
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

*/