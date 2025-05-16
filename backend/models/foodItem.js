const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  oilType: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("foodItem", dishSchema, "foodItems");
