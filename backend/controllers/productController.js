const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// Helper function to upload image to Cloudinary
const uploadImage = async (file) => {
  try {
    if (!file) return null;
    const result = await cloudinary.uploader.upload(file.path, {
      upload_preset: "GreenMart_product_images",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array());
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const {
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      stockStatus,
      imageUrl,
    } = req.body;

    if (!name || !price || !category || !quantity) {
      console.error("Missing required fields");
      return res.status(400).json({
        message: "Missing required fields",
        required: ["name", "price", "category", "quantity"],
      });
    }

    let imageURL;
    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      try {
        const uploadResult = await uploadImage(req.file);
        if (!uploadResult) {
          console.error("Image upload failed");
          return res.status(400).json({
            message: "Image upload failed",
          });
        }
        imageURL = uploadResult;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(500).json({
          message: "Error uploading image",
          error: uploadError.message,
        });
      }
    } else if (imageUrl && imageUrl.startsWith("http")) {
      imageURL = imageUrl;
    } else {
      console.error("Invalid image URL");
      return res.status(400).json({
        message: "Please provide a valid image URL or upload a file",
      });
    }

    const newProduct = new Product({
      name: name?.trim(),
      description: description?.trim(),
      price: parseFloat(price),
      category: category?.trim(),
      quantity: parseInt(quantity),
      measurement: measurement?.trim() || "kg",
      stockStatus: stockStatus?.trim() || "in stock",
      imageURL,
    });

    console.log("Saving new product:", newProduct);
    try {
      const savedProduct = await newProduct.save();
      console.log("Product saved successfully:", savedProduct);
      res.status(201).json(savedProduct);
    } catch (saveError) {
      console.error("Error saving product to database:", saveError);
      if (saveError.name === "ValidationError") {
        const validationErrors = Object.values(saveError.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          message: "Validation failed",
          errors: validationErrors,
        });
      }
      res.status(500).json({
        message: "Error saving product to database",
        error: saveError.message,
      });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    console.log("Fetching products...");
    const products = await Product.find();
    console.log("Products fetched:", products.length);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array());
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    const { id } = req.params;
    console.log("Updating product ID:", id);
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const {
      name,
      description,
      price,
      category,
      quantity,
      measurement,
      stockStatus,
      imageUrl,
    } = req.body;

    let updatedData = {
      name,
      description,
      price: parseFloat(price),
      category,
      quantity: parseInt(quantity),
      measurement: measurement || "kg",
      stockStatus: stockStatus || "in stock",
    };

    if (req.file) {
      console.log("Uploading new image to Cloudinary...");
      try {
        const uploadResult = await uploadImage(req.file);
        if (!uploadResult) {
          console.error("Image upload failed");
          return res.status(400).json({
            message: "Image upload failed",
          });
        }
        updatedData.imageURL = uploadResult;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(500).json({
          message: "Error uploading image",
          error: uploadError.message,
        });
      }
    } else if (imageUrl) {
      updatedData.imageURL = imageUrl;
    }

    console.log("Updating product with data:", updatedData);
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedProduct) {
        console.error("Product not found");
        return res.status(404).json({
          message: "Product not found",
        });
      }

      console.log("Product updated successfully:", updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (updateError) {
      console.error("Error updating product in database:", updateError);
      if (updateError.name === "ValidationError") {
        const validationErrors = Object.values(updateError.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          message: "Validation failed",
          errors: validationErrors,
        });
      }
      res.status(500).json({
        message: "Error updating product in database",
        error: updateError.message,
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

module.exports = { addProduct, getProducts, updateProduct };
