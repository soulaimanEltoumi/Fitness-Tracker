// routes/trainingRoutes.js
const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Get all workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find({ isPublic: true }).populate(
      "exercises"
    );
    res.json(workouts);
  } catch (error) {
    console.error("Error getting workouts:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all workouts for a user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const workouts = await Workout.find({ userId }).populate("exercises");
    res.json(workouts);
  } catch (error) {
    console.error("Error getting workouts for user:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/:workoutId", async (req, res) => {
  const { workoutId } = req.params;

  try {
    const workout = await Workout.findById({ _id: workoutId });
    console.log(workoutId, workout);
    if (!workout) {
      res.status(404).json({ message: "Workout not found" });
    } else {
      res.json(workout);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error finding workout" });
  }
});
// Ruta para eliminar un workout
router.delete("/:workoutId", isAuthenticated, async (req, res) => {
  const workoutId = req.params.workoutId;
  const userId = req.payload._id; // El ID del usuario autenticado desde el token

  try {
    // Encuentra el workout por ID
    const workout = await Workout.findById(workoutId);

    // Verifica si el workout existe
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    // Verifica si el usuario que hace la solicitud es el creador del workout
    if (workout.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this workout" });
    }

    // Elimina el workout
    await workout.deleteOne();
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//export
module.exports = router;
