const { Schema } = require("mongoose");

const dailyWorkoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const DailyWorkout = model("DailyWorkout", dailyWorkoutSchema);
module.exports = DailyWorkout;
