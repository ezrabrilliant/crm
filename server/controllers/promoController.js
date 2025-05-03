// server/controllers/promoController.js
const Promo = require("../models/Promo");

// GET all promos
const getAllPromos = async (req, res) => {
  try {
    const promos = await Promo.find({});
    res.json(promos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE promo
const createPromo = async (req, res) => {
  try {
    const { id, customer, promoCode, status, used, discount, date } = req.body;
    const newPromo = await Promo.create({
      id,
      customer,
      promoCode,
      status,
      used,
      discount,
      date,
    });
    res.status(201).json(newPromo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// APPROVE promo
const approvePromo = async (req, res) => {
  try {
    const { id } = req.params; // ID numerik di URL
    const { newCode } = req.body;

    // Cari promo berdasarkan field "id" numerik
    const updated = await Promo.findOneAndUpdate(
      { id: parseInt(id, 10) },
      {
        status: "Accepted",
        used: false,
        ...(newCode && { promoCode: newCode }),
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Promo not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// REJECT promo
const rejectPromo = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Promo.findOneAndUpdate(
      { id: parseInt(id, 10) },
      { status: "Rejected", used: false },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Promo not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// MARK promo as used
const markAsUsed = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Promo.findOneAndUpdate(
      { id: parseInt(id, 10) },
      { used: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Promo not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



module.exports = {
  getAllPromos,
  createPromo,
  rejectPromo,
  approvePromo,
  markAsUsed
};