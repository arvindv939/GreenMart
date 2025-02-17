const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000"; // Define API base URL

// Add a new product
const addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      stockStatus,
      imageURL,
      shopOwner,
    } = req.body;

    let image = req.file
      ? `${BASE_URL}/uploads/${req.file.filename}`
      : imageURL;

    if (!shopOwner) {
      return res.status(400).json({ message: "Shop owner is required" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      stockStatus: stockStatus || "in stock", // Default to 'in stock' if not provided
      imageURL: image,
      shopOwner,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      stockStatus,
      imageURL,
      shopOwner,
    } = req.body;

    let updatedData = {
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      stockStatus: stockStatus || "in stock", // Default to 'in stock' if not provided
      shopOwner,
    };

    if (req.file) {
      updatedData.imageURL = `${BASE_URL}/uploads/${req.file.filename}`;
    }

    if (imageURL) {
      updatedData.imageURL = imageURL;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

module.exports = { addProduct, getProducts, updateProduct };
