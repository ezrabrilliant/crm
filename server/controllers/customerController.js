const Customer = require("../models/Customer");
const mongoose = require("mongoose");

// GET all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE customer
const createCustomer = async (req, res) => {
  try {
    const { name, totalSpent, purchases } = req.body;
    const newCustomer = await Customer.create({ name, totalSpent, purchases });
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE customer by MongoDB _id
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    // validate ObjectId
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }
    const { name, totalSpent, purchases } = req.body;
    const updated = await Customer.findByIdAndUpdate(
      id,
      { name, totalSpent, purchases },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE customer by MongoDB _id
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }
    const deleted = await Customer.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
