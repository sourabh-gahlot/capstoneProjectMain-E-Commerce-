// Import required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../models/user.model");

// Middleware to check if the user is an admin
exports.checkAdmin = (req, res, next) => {
  let token = req.headers["x-auth-token"];
  if (!token) {
    // If there is no token, return 401 Unauthorized error
    return res.status(401).json({
      message: "Please login first to access this endpoint!",
    });
  }
  // Verify the token with the secret key
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      // If there is an error while verifying the token, return 401 Unauthorized error
      return res.status(401).send({
        message: "unauthorized",
      });
    }
  });
  // Decode the token to get the user ID
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;

  // Find the user with the given user ID
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        // If the user is not found, throw an error
        throw new Error("User not found");
      }
      // Get the user's user type
      const userReqType = user.userType;
      if (userReqType !== "admin") {
        // If the user is not an admin, return 401 Unauthorized error
        return res.status(401).json({
          message: "you are not authorised to access this endpoint",
        });
      } else {
        // If the user is an admin, continue to the next middleware
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      // If there is an error while processing the request, return 500 Internal Server Error
      res.status(500).json({
        message: "An error occurred while processing your request",
      });
    });
};

exports.checkUser = (req, res, next) => {
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({
      message: "Please login first to access this endpoint!",
    });
  }
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      return res.status(401).send({
        message: "unauthorized",
      });
    }
  });
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;
  // console.log(userId)

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      // console.log(user);
      const userReqType = user.userType;
      // console.log(userReqType);
      if (userReqType !== "user") {
        return res.status(401).json({
          message: "you are not authorised to access this endpoint",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while processing your request",
      });
    });
};
