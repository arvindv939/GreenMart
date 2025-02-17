const mongoose = require("mongoose");

const ShopOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopName: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("ShopOwner", ShopOwnerSchema);
