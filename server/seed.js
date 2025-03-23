// server/seed.js
require('dotenv').config();
const mongoose = require("mongoose");
const Customer = require("./models/Customer");
const Product = require("./models/Product");
const Promo = require("./models/Promo");
const Order = require("./models/Order");

// Data JSON
const data = require("../src/data/data.json");
console.log("MONGO_URI:", process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB error:", err));

async function seedDB() {
  try {
    // Insert data sesuai file JSON
    await Customer.insertMany(data.customers);
    await Product.insertMany(data.products);
    await Promo.insertMany(data.promos);
    await Order.insertMany(data.orders);

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
