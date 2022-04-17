const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create user schema
const userSchema = new Schema({
     username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
     password: { type: String, required: true, unique: true, trim: true }
}, {
     timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;