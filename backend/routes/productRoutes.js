const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// POST route to create a product, including image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const {
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      shopOwner,
    } = req.body;

    if (
      !name ||
      !price ||
      !category ||
      !quantity ||
      !shopOwner ||
      !measurement
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "green_mart_products",
      });
      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      image: imageUrl,
      shopOwner,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
});

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Update product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      shopOwner,
      imageUrl,
    } = req.body;

    let updatedImageUrl = imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "green_mart_products",
      });
      updatedImageUrl = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        quantity,
        measurement,
        image: updatedImageUrl,
        shopOwner,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

module.exports = router;
