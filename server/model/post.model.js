const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create post schema
const postSchema = new Schema({

    userId: { type: ObjectId, required: true, unique: false },
    title: { type: String, required: true, unique: false },
    imagePath: { type: String, required: true, unique: false },
    likes: { type: Number }

}, {
     timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;