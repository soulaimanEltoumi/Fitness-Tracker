const { Schema, model } = require("mongoose");

const UserExercisesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bodyPart: { type: String },
    equipment: { type: String },
    gifUrl: { type: String },
    name: { type: String, required: true },
    target: { type: String },
    secondaryMuscles: [String],
    instructions: [String],
    isPublic: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserExercises = model("UserExercises", UserExercisesSchema);
module.exports = UserExercises;
