// routes/trainingRoutes.js
const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout.model");
const User = require("../models/User.model");

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
    console.log("idddddd", workoutId, workout);
    if (!workout) {
      res.status(404).json({ message: "Workout not found" });
    } else {
      console.log(req.params.id);
      console.log(workout);
      res.json(workout);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error finding workout" });
  }
});

//export
module.exports = router;
