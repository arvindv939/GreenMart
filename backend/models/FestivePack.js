const mongoose = require("mongoose");

const FestivePackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  discount: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
});

module.exports = mongoose.model("FestivePack", FestivePackSchema);
