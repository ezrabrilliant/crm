// server/models/Customer.js
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  purchases: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Customer", CustomerSchema);
