// server/models/Promo.js
const mongoose = require("mongoose");

const PromoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  customer: {
    type: String,   // meniru "customer": "Customer A" (bukan ref ObjectId)
    required: true
  },
  promoCode: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  },
  used: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Promo", PromoSchema);
