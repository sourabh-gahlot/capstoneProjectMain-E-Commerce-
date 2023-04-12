// Import required modules
const Adress = require("./../models/address.model");
const User = require("./../models/user.model");
const jwt = require("jsonwebtoken");

// Controller function to add an address
exports.addAdress = async (req, res) => {
  try {
    // Get the JWT token from the headers of the request
    var token = req.headers["x-auth-token"];
    // Get the zip code and phone number from the request body
    const zipCode = req.body.zipCode;
    const phoneNo = req.body.phoneNo;
    // Regular expression to check if phone number is valid
    const phoneNumberRegex = /^\d{10}$/;
    // If token is not present, return an error
    if (!token) {
      console.log("this is from the adresscontroller");
      return res
        .status(401)
        .json({ message: "Please login first to access this endpoint!" });
    }
    // If zip code is not valid, return an error
    if (!/^\d{6}$/.test(zipCode)) {
      return res.status(400).json({ message: "Invalid zip code!" });
    }
    // If phone number is not valid, return an error
    if (!phoneNumberRegex.test(phoneNo)) {
      return res.status(400).json({
        message: "Invalid contact number!",
      });
    }
    // Decode the JWT token to get the user id
    const decodedToken = jwt.decode(token, { complete: true });
    const userId = decodedToken.payload.id;
    // Create an empty object to store the user object
    const obj = {};

    // Find the user object based on the user id
    User.findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          throw new Error("User not found");
        }
        // Store the user object in the 'obj' variable
        obj.user = user;
      })
      .catch((err) => {
        console.error(err);
      });

    // Create a new address object
    const newAdress = await Adress.create({
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      street: req.body.street,
      landmark: req.body.landmark,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Return the new address object along with the user object
    res.status(200).json({
      _id: newAdress._id,
      name: newAdress.name,
      phoneNo: newAdress.phoneNo,
      street: newAdress.street,
      landmark: newAdress.landmark,
      city: newAdress.city,
      state: newAdress.state,
      zipCode: newAdress.zipCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: obj.user,
    });
  } catch (err) {
    // If there is an error, return an error message
    res.status(400).json({
      message: "fail",
      err: err,
    });
  }
};
