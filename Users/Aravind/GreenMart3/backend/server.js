// server.js
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const session = require("express-session");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Change this to 5173
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up express-session for session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  })
);

// Serve uploaded images statically
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir));

// Routes
app.use("/api/shopowners", require("./routes/shopOwnerRoutes.js"));
app.use("/api/products", require("./routes/inventoryRoutes.js"));

// Register route
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  // Add registration logic (hash password and store in DB)
  res.status(200).send("User registered");
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // Check if credentials match (you can compare password after hashing)
  if (email === "test@example.com" && password === "password") {
    req.session.user = { email };
    res.status(200).send("User logged in");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Dashboard route - check if user is logged in
app.get("/api/dashboard", (req, res) => {
  if (req.session.user) {
    res.status(200).send(`Welcome ${req.session.user.email}`);
  } else {
    res.status(401).send("You must be logged in to access the dashboard");
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Green Mart API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
