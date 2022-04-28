const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create user schema
const userSchema = new Schema({
     username: { type: String, required: true, unique: false, trim: true, minlength: 3 },
     password: { type: String, required: true, unique: true, trim: true },
     friends: [String],
     requests: [String],
     requestSent: [String],
     imagePath: { type: String },
     description: {type: String, required: false}
}, {
     timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;