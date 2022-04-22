const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// database connections
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
     useNewUrlParser: true, useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
     console.log("MongoDB database connection established successfully");
});

// routes
// const users = require("./routes/users");
const register = require("./routes/auth/user");
const userRoute = require("./routes/user.info");
const friendRoute = require("./routes/friend.info");

// app.use("/api/users", users);
app.use("/auth/user", register);
app.use("/user", userRoute);
app.use("/friend", friendRoute);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));