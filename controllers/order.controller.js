// Importing required models and libraries
const Product = require("../models/product.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");
const Address = require("./../models/address.model");
const jwt = require("jsonwebtoken");

// Function to create a new order
exports.createOrder = async (req, res) => {
  try {
    // Extracting productId and addressId from the request body
    const { productId, addressId } = req.body;

    // Extracting userId from the JWT token in the headers
    const token = req.headers["x-auth-token"];
    const decodedToken = jwt.decode(token, { complete: true });
    const userId = decodedToken.payload.id;

    // Fetching the user with the given userId
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetching the product with the given productId
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      // console.log(productId)
      return res
        .status(404)
        .json({ message: `No Product found for Id ${productId}` });
    }

    // Checking if the product is available in stock
    if (product.availableItems <= 0) {
      return res.status(400).json({
        message: `Product with ID - ${productId} is currently out of stock!`,
      });
    }

    // Fetching the address with the given addressId
    const address = await Address.findOne({ _id: addressId });
    // console.log(addressId)
    if (!address) {
      return res
        .status(404)
        .json({ message: `No address found for Id ${addressId}` });
    }

    // Creating a new order with the given product, user, and address details
    const newOrder = await Order.create({
      addressId: address._id,
      productId: product._id,
      quantity: req.body.quantity,
    });

    // Returning the order details as a response
    res.status(200).json({
      id: newOrder._id,
      user: { user },
      product: { product },
      shippingAddress: { address:{user:{user}} },
      amount: product.price,
      orderDate: new Date(Date.now()),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
