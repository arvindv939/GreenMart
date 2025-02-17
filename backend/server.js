// // server.js
// const express = require("express");
// const connectDB = require("./config/db.js");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const session = require("express-session");
// const fs = require("fs");

// dotenv.config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Set up express-session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "defaultsecret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 60000 },
//   })
// );

// // Serve uploaded images statically
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }
// app.use("/uploads", express.static(uploadDir)); // ✅ Serving image files

// // Routes
// app.use("/api/shopowners", require("./routes/shopOwnerRoutes.js"));
// app.use("/api/products", require("./routes/productRoutes.js")); // ✅ FIXED ROUTE

// app.get("/", (req, res) => {
//   res.send("Green Mart API is running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// server.js
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const fs = require("fs");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ 
  origin: "http://localhost:5173", 
  credentials: true, // Ensure credentials are sent along with requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  })
);

// Serve uploaded images statically
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir)); // ✅ Serving image files

// Routes
app.use("/api/shopowners", require("./routes/shopOwnerRoutes.js"));
app.use("/api/products", require("./routes/productRoutes.js")); // ✅ FIXED ROUTE

app.get("/", (req, res) => {
  res.send("Green Mart API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
