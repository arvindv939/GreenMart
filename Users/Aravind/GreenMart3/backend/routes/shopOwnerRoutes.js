// In shopOwnerRoutes.js
const express = require("express");
const {
  registerShopOwner,
  loginShopOwner,
  getShopOwnerInfo,
} = require("../controllers/shopOwnerController.js");
const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

// POST: Register a Shop Owner
router.post("/register", registerShopOwner);

// POST: Login a Shop Owner
router.post("/login", loginShopOwner);

// GET: Fetch current shop owner's info (protected route)
router.get("/me", protect, getShopOwnerInfo); // Make sure it's protected with middleware

module.exports = router;
