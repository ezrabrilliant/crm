// server/models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dimensions: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
