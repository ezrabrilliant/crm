const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"]
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"]
    },
    dimensions: {
      type: String,
      trim: true,
      maxlength: [50, "Dimensions cannot exceed 50 characters"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Virtual for formatted price
productSchema.virtual("formattedPrice").get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Add text index for better search performance
productSchema.index({ name: "text" });

// Method to check if product is in stock
productSchema.methods.isInStock = function() {
  return this.stock > 0;
};

// Static method to find products low in stock
productSchema.statics.findLowStock = function(threshold = 5) {
  return this.find({ stock: { $lte: threshold }, isActive: true });
};

module.exports = mongoose.model("Product", productSchema);