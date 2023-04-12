const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,

  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
 
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  userType: {
    type: String,
    required: true,
    default: "User",
    lowercase:true
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
