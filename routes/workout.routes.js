// routes/trainingRoutes.js
const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout.model");
const User = require("../models/User.model");

// //new workout
router.post("/", async (req, res) => {
  const { title, date, exercises, duration, notes, userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  if (!exercises || exercises.length === 0) {
    return res.status(400).json({ error: "Exercises are required" });
  }
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  //comprueba que el workout no este duplicado :
  const existingWorkout = await Workout.findOne({
    userId,
    title,
  });
  if (existingWorkout) {
    return res
      .status(400)
      .json({ error: "Workout already exists for this user" });
  }
  // Crea y guarda un nuevo entrenamiento :
  try {
    const createdWorkout = await Workout({
      userId,
      title,
      date,
      exercises,
      duration,
      notes,
    });
    await createdWorkout.save();
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { workouts: createdWorkout._id },
      },
      { new: true }
    );
    res.status(201).json(createdWorkout);
  } catch (error) {
    console.error("Error creating training:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().populate("exercises");
    res.json(workouts);
  } catch (error) {
    console.error("Error getting workouts:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all workouts for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const workouts = await Workout.find({ userId }).populate("exercises");
    res.json(workouts);
  } catch (error) {
    console.error("Error getting workouts for user:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
