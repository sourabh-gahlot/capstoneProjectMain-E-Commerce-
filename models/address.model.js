const mongoose = require("mongoose");
const validator = require("validator");

const addressSchema = new mongoose.Schema({
  acessToken: {
    type: String,
  },
  zipCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  landmark: String,
  city: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const adress = mongoose.model("adress", addressSchema);

module.exports = adress;
