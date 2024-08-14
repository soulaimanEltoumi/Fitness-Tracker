const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    exercises: [
      {
        bodyPart: { type: String, required: true },
        equipment: { type: String, required: true },
        id: { type: String, required: true },
        name: { type: String, required: true },
        target: { type: String, required: true },
        secondaryMuscles: [String],
        instructions: [String],
      },
    ],
    duration: { type: Number, default: 0 },
    notes: { type: String },
    isPublic: { type: Boolean, default: false }, // Campo para visibilidad
  },
  {
    timestamps: true,
  }
);

const Workout = model("Workout", workoutSchema);
module.exports = Workout;
