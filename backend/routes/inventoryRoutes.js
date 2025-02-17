const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload"); // Ensure upload middleware is imported

// Add product (with image upload support)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      shopOwner,
    } = req.body;

    // Check if image was uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Create the new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      image, // Save image path to database
      shopOwner, // Assumes shopOwner is passed in request body
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error adding product:", err.message || err);
    res.status(500).json({ message: "Server error. Unable to add product." });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ message: "Server error. Unable to fetch products." });
  }
});

// Update product (with image update support)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { price, quantity, measurement } = req.body;

    // If a new image is uploaded, update the image field
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { price, quantity, measurement, ...(image && { image }) }, // Only update image if a new one is uploaded
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res
      .status(500)
      .json({ message: "Server error. Unable to update product." });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting product:", err);
    res
      .status(500)
      .json({ message: "Server error. Unable to delete product." });
  }
});

module.exports = router;
