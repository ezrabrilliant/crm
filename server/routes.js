// server/routes.js
const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require("./controllers/customerController");

const {
  getAllPromos,
  createPromo,
  approvePromo
  // dsb
} = require("./controllers/promoController");

const {
  getAllOrders,
  createOrder
} = require("./controllers/orderController");

const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require("./controllers/productController");

// Customer routes
router.get("/customers", getAllCustomers);
router.post("/customers", createCustomer);
router.patch("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);


// Promo routes
router.get("/promos", getAllPromos);
router.post("/promos", createPromo);
router.patch("/promos/:id/approve", approvePromo);

// Order routes
router.get("/orders", getAllOrders);
router.post("/orders", createOrder);

// Product routes
router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);


module.exports = router;
