// models/Exercise.js
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  category: String,
  equipment: String,
  force: String,
  id: { type: String, unique: true },
  images: [String],
  instructions: [String],
  level: String,
  mechanic: String,
  name: String,
  primaryMuscles: [String],
  secondaryMuscles: [String],
});

module.exports = mongoose.model("Exercise", exerciseSchema);
