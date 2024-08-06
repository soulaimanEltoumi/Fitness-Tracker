const { Schema } = require("mongoose");

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  dailyWorkoutId: {
    type: Schema.Types.ObjectId,
    ref: "DailyWorkout",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Exercise = model("Exercise", exerciseSchema);
module.exports = Exercise;
