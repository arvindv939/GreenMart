const jwt = require("jsonwebtoken");
const ShopOwner = require("../models/ShopOwner");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const shopOwner = await ShopOwner.findById(decoded.id);

    if (!shopOwner) {
      return res.status(404).json({ message: "Shop Owner not found" });
    }

    req.shopOwner = shopOwner; // Add shopOwner to request object for further use in routes
    next(); // Move to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { authenticate };
