// Importing required packages and modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../models/user.model");

// Middleware function to verify token
exports.verifyToken = (req, res, next) => {
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
    // req._id = decoded.id;

    next();
  });
};

// Middleware function to check if user is admin
exports.checkAdmin = (req, res, next) => {
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

  // Decoding token and retrieving user ID
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;

  // Retrieving user information from database
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      // Retrieving user type
      const userReqType = user.userType;

      // Checking if user is an admin
      if (userReqType !== "admin") {
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
