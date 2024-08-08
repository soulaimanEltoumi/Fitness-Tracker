const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  createdAt: { type: Date, default: Date.now },
  workouts: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
});

const User = model("User", userSchema);
module.exports = User;
