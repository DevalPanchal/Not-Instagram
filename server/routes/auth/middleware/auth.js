const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = async (req, res, next) => {
     // get token from header
     const jwtToken = req.header("token");

     if (!jwtToken) return res.status(403).json("Not Authorized");

     try {
          const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

          req.user = payload.user;

          next();
     } catch (error) {
          console.error(error.message);
          return res.status(403).json("Not Authorized");
     }
}

module.exports = authorization;