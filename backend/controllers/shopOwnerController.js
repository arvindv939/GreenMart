const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ShopOwner = require("../models/ShopOwner.js");

// Shop Owner Registration
exports.registerShopOwner = async (req, res) => {
  try {
    const { name, email, password, shopName, phone } = req.body;

    // Check if shop owner already exists
    let shopOwner = await ShopOwner.findOne({ email });
    if (shopOwner) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new shop owner
    const newShopOwner = new ShopOwner({
      name,
      email,
      password: hashedPassword,
      shopName,
      phone,
    });

    // Save the new shop owner to the database
    await newShopOwner.save();

    // Generate JWT token
    const token = jwt.sign({ id: newShopOwner.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, shopOwner: newShopOwner });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Shop Owner Login
exports.loginShopOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if shop owner exists
    let shopOwner = await ShopOwner.findOne({ email });
    if (!shopOwner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, shopOwner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: shopOwner.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, shopOwner });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get Shop Owner Info (protected route)
exports.getShopOwnerInfo = async (req, res) => {
  try {
    if (!req.shopOwner || !req.shopOwner.id) {
      return res.status(400).json({ message: "No shop owner data available or invalid token" });
    }

    const shopOwnerId = req.shopOwner.id; // Get shop owner ID from the token
    const shopOwner = await ShopOwner.findById(shopOwnerId); // Fetch shop owner from DB
    if (!shopOwner) {
      return res.status(404).json({ message: "Shop owner not found" });
    }

    res.json(shopOwner); // Return shop owner data
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
