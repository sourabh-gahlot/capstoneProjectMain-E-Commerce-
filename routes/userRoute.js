const express = require("express");
const authcontroller = require("./../controllers/authcontroller");
const addcontroller = require("./../controllers/address.controller");
const authenticationCheck = require("./../middleware/authentication.check");
const router = express.Router();

router.post("/signup", authcontroller.signup);
router.post("/login", authcontroller.login);
router.post(
  "/adresses",
  authenticationCheck.verifyToken,
  addcontroller.addAdress
);

module.exports = router;
