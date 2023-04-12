const express = require("express");
const productcontroller = require("./../controllers/product.controller");
const authenticationCheck = require("./../middleware/authentication.check");
const authorizationCheck = require("./../middleware/authorization.check");

const router = express.Router();

router
  .route("/")
  .post(
    authenticationCheck.verifyToken,
    authorizationCheck.checkAdmin,
    productcontroller.saveProduct
  )
  .get(productcontroller.searchProduct);
router.route("/categories").get(productcontroller.getProductCategories);
router
  .route("/:id")
  .get(productcontroller.getProduct)
  .put(
    authenticationCheck.verifyToken,
    authorizationCheck.checkAdmin,
    productcontroller.updateProduct
  )
  .delete(
    authenticationCheck.verifyToken,
    authorizationCheck.checkAdmin,
    productcontroller.deleteProduct
  );
module.exports = router;
