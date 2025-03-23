const Customer = require("../models/Customer");

// GET all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE customer
exports.createCustomer = async (req, res) => {
  try {
    const { id, name, totalSpent, purchases } = req.body;
    const newCustomer = await Customer.create({
      id,
      name,
      totalSpent,
      purchases,
    });
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE customer by numeric ID
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params; // numeric
    const { name, totalSpent, purchases } = req.body;
    const updated = await Customer.findOneAndUpdate(
      { id: parseInt(id, 10) },
      { name, totalSpent, purchases },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Customer.findOneAndDelete({ id: parseInt(id, 10) });
    if (!deleted) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
