// backend/controllers/authController.js (or similar route)
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  // Assuming you find the shop owner by their email and password
  const shopOwner = await ShopOwner.findOne({ email: req.body.email });

  if (!shopOwner || shopOwner.password !== req.body.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = jwt.sign(
    { id: shopOwner._id, name: shopOwner.name, shopName: shopOwner.shopName }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "1h" } // Token expiration time
  );

  res.json({ token }); // Send token to frontend
};

module.exports = login;
