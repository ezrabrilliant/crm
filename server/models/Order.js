// server/models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: ""
  },
  quantity: {
    type: Number,
    default: 1
  },
  productId: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
