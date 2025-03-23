// server/controllers/promoController.js
const Promo = require("../models/Promo");

// GET all promos
exports.getAllPromos = async (req, res) => {
  try {
    const promos = await Promo.find({});
    res.json(promos); // promos = array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE promo
exports.createPromo = async (req, res) => {
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
exports.approvePromo = async (req, res) => {
  try {
    const { id } = req.params; // ID numerik di URL
    const { newCode } = req.body;

    // Cari promo berdasarkan field "id" numerik
    const updated = await Promo.findOneAndUpdate(
      { id: parseInt(id, 10) },
      {
        status: "Accepted",
        used: false,
        // newCode opsional
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
