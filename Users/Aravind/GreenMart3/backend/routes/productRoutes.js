// server/routes/productRoutes.js
const express = require("express");
const upload = require("../middleware/upload"); // Import the upload middleware
const {
  addProduct,
  getProducts,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

// POST route to add a product (with image upload or URL input)
router.post("/", upload.single("image"), addProduct);

// GET route to fetch all products
router.get("/", getProducts);

// PUT route to update a product
router.put("/:id", upload.single("image"), updateProduct);

module.exports = router;
