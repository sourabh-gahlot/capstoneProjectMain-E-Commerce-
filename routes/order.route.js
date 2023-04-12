const express = require("express");
const ordercontroller = require("./../controllers/order.controller");
const authenticationCheck = require("./../middleware/authentication.check");
const router = express.Router();

router
  .route("/")
  .post(authenticationCheck.verifyToken, ordercontroller.createOrder);

module.exports = router;
