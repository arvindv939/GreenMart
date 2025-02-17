const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantitySold: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sales", SalesSchema);
