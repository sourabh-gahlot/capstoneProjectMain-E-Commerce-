const User = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Function for user signup
exports.signup = async (req, res) => {
  try {
    const { email, contactNumber } = req.body;
    const phoneNumberRegex = /^\d{10}$/;
    // Validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email-id format!",
      });
    }
    // Validating contact number format
    if (!phoneNumberRegex.test(contactNumber)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid contact number!",
      });
    }

    // Checking if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "Fail",
        meassge: "Try any other email, this email is already registered",
      });
    }

    // Creating new user
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      userType: req.body.userType,
    });

    // Sending success response with created user's details
    res.status(200),
      res.json({
        status: "sucess",
        user: {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
  } catch (err) {
    console.log(err);
    // Sending error response with the error message
    res.status(400),
      res.json({
        status: "failed",
        message: err,
      });
  }
};

// Function for user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "please provide the email or password",
    });
  }

  // Finding the user with the given email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "This email has not been registered",
    });
  }

  // Comparing the given password with the hashed password stored in the database
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Credentials!",
    });
  }

  // Generating JWT token for the authenticated user
  var token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 5000,
  });

  // Setting the JWT token in the response header and sending the success response with user's details
  res.header("x-auth-token", token).status(200).json({
    email: user.email,
    name: user.firstName,
    isAuthenticated: true,
  });
};
