// server/controllers/orderController.js
const Order = require("../models/Order");

// GET all orders
const getAllOrders = async (req, res) => {
  try {
    // Karena "customer" dan "productId" adalah field Number/String,
    // kita tidak bisa .populate(...). Cukup find() semua
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE order
const createOrder = async (req, res) => {
  try {
    // misalnya user kirim: { id, customer, date, quantity, productId }
    const { id, customer, date, quantity, productId } = req.body;

    const newOrder = new Order({
      id,
      customer,
      date,
      quantity,
      productId,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
};