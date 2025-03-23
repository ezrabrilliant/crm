// server/controllers/productController.js
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // menyesuaikan schema: { id, name, dimensions }
    const { id, name, dimensions } = req.body;
    const newProduct = new Product({
      id,
      name,
      dimensions,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // Parameter :id => numerik
    const { id } = req.params;
    // Body yang boleh di-update misalnya name, dimensions
    const { name, dimensions } = req.body;

    // Karena schema pakai "id" numerik, kita pakai findOneAndUpdate
    // alih-alih findByIdAndUpdate (karena _id di DB berbeda)
    const updatedProduct = await Product.findOneAndUpdate(
      { id: parseInt(id, 10) },
      { name, dimensions },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Karena schema pakai "id" numerik
    const deleted = await Product.findOneAndDelete({ id: parseInt(id, 10) });
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
