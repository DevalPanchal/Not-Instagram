const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create comment schema
const commentSchema = new Schema({
    userId: { type: String, required: true, unique: false },
    postId: { type: String, required: true, unique: false },
    text: { type: String, required: true, unique: false },
    likes: { type: Number }

}, {
     timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;