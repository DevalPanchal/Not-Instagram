const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create comment schema
const commentSchema = new Schema({

    userId: { type: ObjectId, required: true, unique: true },
    postId: { type: ObjectId, required: true, unique: true },
    text: { type: String, required: true, unique: false },
    likes: { type: Number }

}, {
     timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;