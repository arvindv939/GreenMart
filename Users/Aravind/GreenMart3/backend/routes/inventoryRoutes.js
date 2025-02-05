// routes/inventoryRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Assuming Product is your model

// Add product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, quantity, unit } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      unit,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const { price, quantity, unit } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { price, quantity, unit },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
