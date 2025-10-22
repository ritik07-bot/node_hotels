const mongoose = require("mongoose");

// Define the Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  taste: { type: String, enum: ["spicy", "sweet", "sour"], required: true },
  is_drink: { type: Boolean, default: false },
  ingredients: { type: [String], required: true },
  num_sales: { type: Number, default: 0 }
});

// Create and export the Mongoose Model
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
