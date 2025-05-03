const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
require('dotenv').config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

// Use API routes
app.use("/api", routes);

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
