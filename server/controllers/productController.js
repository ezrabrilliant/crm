const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ name: 1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, dimensions } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }
    
    if (price === undefined || price === null) {
      return res.status(400).json({ message: "Product price is required" });
    }
    
    // Create new product
    const newProduct = new Product({
      name: name.trim(),
      price: Number(price),
      stock: Number(stock || 0),
      dimensions: dimensions || ""
    });
    
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Invalid product data", 
        error: error.message,
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, stock, dimensions } = req.body;
    const productId = req.params.id;
    
    // Find product first to ensure it exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Update fields if provided
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (price !== undefined) updateData.price = Number(price);
    if (stock !== undefined) updateData.stock = Number(stock);
    if (dimensions !== undefined) updateData.dimensions = dimensions;
    
    // Apply updates with validation
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(`Error updating product with ID ${req.params.id}:`, error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Invalid product data", 
        error: error.message,
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json({ 
      message: "Product deleted successfully", 
      deletedProduct 
    });
  } catch (error) {
    console.error(`Error deleting product with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q || '';
    const regex = new RegExp(searchTerm, 'i');
    
    const products = await Product.find({ name: regex }).sort({ name: 1 });
    res.status(200).json(products);
  } catch (error) {
    console.error(`Error searching products:`, error);
    res.status(500).json({ message: "Failed to search products", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
};