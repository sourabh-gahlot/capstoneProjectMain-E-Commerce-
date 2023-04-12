const express = require("express");
const addcontroller = require("./../controllers/address.controller");
const authorizationCheck = require("./../middleware/authorization.check");

const authenticationCheck = require("./../middleware/authentication.check");
const router = express.Router();

router.post(
  "/addresses",
  authenticationCheck.verifyToken,
  authorizationCheck.checkUser,
  addcontroller.addAdress
);
module.exports = router;
