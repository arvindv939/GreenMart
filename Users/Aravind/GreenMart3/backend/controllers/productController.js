// controllers/productController.js
const Product = require("../models/Product");

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, imageUrl } = req.body;
    let image = req.file ? req.file.path : imageUrl; // Use file path if uploaded or image URL if provided

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      image,
    });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, quantity, imageUrl } = req.body;
    let updatedData = { name, description, price, category, quantity };

    // If new file is uploaded, update the image
    if (req.file) {
      updatedData.image = req.file.path;
    }

    // If new image URL is provided, update the image
    if (imageUrl) {
      updatedData.image = imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

module.exports = { addProduct, getProducts, updateProduct };
