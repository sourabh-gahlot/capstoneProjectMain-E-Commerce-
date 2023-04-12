// Importing necessary models
const Product = require("../models/product.model");
const User = require("../models/user.model");
// Handler function to save a new product
exports.saveProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      availableItems: req.body.availableItems,
      imageUrl: req.body.imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(200).json({
      id: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      category: newProduct.category,
      description: newProduct.description,
      manufacturer: newProduct.manufacturer,
      availableItems: newProduct.availableItems,
      createdAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt,
    });
  } catch (err) {
    // Handling error if product creation fails
    res.status(400).json({
      message: "fail",
      err: err,
    });
  }
};

// Handler function to search for products based on query parameters
exports.searchProduct = async (req, res) => {
  try {
    // Creating a query object from the request query parameters
    const queryobj = { ...req.query };
    const excludefields = ["sortBy", "Direction"];
    excludefields.forEach((el) => delete queryobj[el]);
    // Creating a base query using the query object
    let query = Product.find(queryobj);
    // Sorting the results based on sortBy and Direction parameters, if provided
    if (req.query.sortBy) {
      if (req.query.Direction === "ASC") {
        query = query.sort(req.query.sortBy);
      } else if (req.query.Direction === "DESC") {
        query = query.sort("-" + req.query.sortBy);
      }
    }
    // Executing the query and returning the results as a response
    const products = await query;

    res.status(200).json({
      status: "sucess",
      products,
    });
  } catch (err) {
    // Handling error if query fails
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
// Handler function to get a single product by its ID
exports.getProduct = async (req, res) => {
  try {
    // Finding the product by its ID and returning it as a response
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "sucess",
      data: {
        product,
      },
    });
  } catch (err) {
    // Handling error if no product is found with the given ID
    res.status(400).json({
      message: `No Product find by ID -<${req.params.id}>`,
    });
  }
};
// Handler function to update a product by its ID
exports.updateProduct = async (req, res) => {
  try {
    // Updating the product by its ID and returning it as a response
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      status: "sucess",
      data: {
        product,
      },
    });
  } catch (err) {
    // Handling error if no product is found with the given ID
    res.status(400).json({
      message: `No Product find by ID -<${req.params.id}>`,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: `product with id -${id} deleted sucessfully`,
    });
  } catch (err) {
    res.status(400).json({
      message: `No Product find by ID -<${req.params.id}>`,
    });
  }
};
exports.getProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
