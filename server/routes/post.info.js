const { ObjectId } = require("bson");
const console = require("console");
const express = require("express");
const router = express.Router();

let Post = require("../model/post.model");

const auth = require("./auth/middleware/auth");

// get all posts
router.get("/all-posts", auth, async(req, res) => {
    try {
        // query db
        let allPosts = await Post.find();
        // console.log(allPosts);
        // get all posts
        let posts = allPosts.map(
            (item) => item.title,
            (item) => item.likes
        );

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }
});

// add post
router.post("/add-post", auth, async(req, res) => {
    try {
        let postTitle = req.body.title;
        let userID = req.user;
        const newPost = await new Post({ userId: userID, title: postTitle, imagePath: "test", likes: 0 });
        await newPost.save();
        console.log(newPost)
    } catch (error) {
        console.log(error);
        res.status(500).json("server error");
    }

    /*
    try {
        
        let id = req.body.id;
        // TODO
        let postImagePath = "./storage/images/post_" + id + "/";

        // make user folder
        fs.mkdir(userImagePath, (err) => {
            if (err) {
                 // check err
                 console.log(err);
            } else {
                 // successful
                 console.log("User directory made!");
            }
       });
       

       let userId = req.body.userId;
       let title = req.body.title;
       let imagePath = "lol";
       let likes = 0;

       const newPost = await new Post({ userId, title, imagePath, likes });
       let postID = newPost._id;
       await newPost.save();
       
       // generate token on payload of user id
       const token = jwtGenerator(postID);

       // res.json token
       res.json({ token });
    
    } catch (error) {
        console.log(error);
        res.status(500).json("server error");
    }
    */
});


/*
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

// get all posts
router.get("/all-posts", auth, async(req, res) => {

    try {
        // query db
        let allPosts = await Post.find();

        // let postID = req.post;

        // let postInfo = await Post.findOne({ _id: postID });

        // get all usernames
        let usernames = allPosts.map((item) => item.title);

        // remove user who requested the all user names
        // usernames = usernames.filter((user) => user !== postInfo.username);

        res.json(usernames);
        // res.json(allPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json("server error");
    }

});

// add post
router.post("/add/:post", auth, async (req, res) => {
    try {
        // get post id
        let postID = req.post;

        // get post name
        let postName = req.params.post;

        // update original post array with new post
        await Post.updateOne(
             { _id: req.post },
             { $push: { posts: postName }}
        );
         
        // get post info
        let postInfo = await Post.findOne({ _id: postID });

        // get post info
        res.json(postInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});

/*
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

module.exports = router;