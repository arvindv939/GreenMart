const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.shopOwner = decoded; // Attach decoded info to the req object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
