// routes/shopowners.js
const express = require("express");
const router = express.Router();
const {
  registerShopOwner,
  loginShopOwner,
  getShopOwnerInfo,
} = require("../controllers/shopOwnerController");

// Define the routes
router.post("/register", registerShopOwner); // Route to register a new shop owner
router.post("/login", loginShopOwner); // Route to login a shop owner
router.get("/me", getShopOwnerInfo); // Route to get shop owner's info

module.exports = router;
