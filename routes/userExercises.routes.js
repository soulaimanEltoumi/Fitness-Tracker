const express = require("express");
const router = express.Router();
const UserExercise = require("../models/UserExercises.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /userexercises/add - Adds a new exercise for a user
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { userId, name } = req.body;
    if (!userId || !name) {
      return res
        .status(400)
        .json({ error: "User ID and exercise name are required" });
    }
    const existingUserExercise = await UserExercise.findOne({ userId, name });
    if (existingUserExercise) {
      return res
        .status(400)
        .json({ error: "Exercise already exists for this user" });
    }

    const userExercise = new UserExercise({ ...req.body });
    userExercise.save();

    res.json(userExercise);
  } catch (error) {
    console.error("Error adding user exercise:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const userExercises = await UserExercise.find();
    res.json(userExercises);
  } catch (error) {
    console.error("Error getting user exercises:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const userExercise = await UserExercise.findOne({ name });
    if (!userExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json(userExercise);
  } catch (error) {
    console.error("Error getting user exercise:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const updatedUserExercise = await UserExercise.findOneAndUpdate(
      { name },
      { ...req.body },
      { new: true }
    );
    if (!updatedUserExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json(updatedUserExercise);
  } catch (error) {
    console.error("Error updating user exercise:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
