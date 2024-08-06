const { Schema } = require("mongoose");

const setSchema = new Schema({
  exerciseId: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
  setNumber: { type: Number, required: true },
  repetitions: { type: Number, required: true },
  weight: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Set = model("Set", setSchema);
module.exports = Set;
