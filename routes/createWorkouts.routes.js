//create workouts routes

const express = require("express");
const router = express.Router();

const Workout = require("../models/Workout.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/", isAuthenticated, async (req, res) => {
  const { userId, title, date, exercises } = req.body;
  try {
    const newWorkout = new Workout({
      userId,
      title,
      date,
      exercises,
    });
    const savedWorkout = await newWorkout.save();
    res.json(savedWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
