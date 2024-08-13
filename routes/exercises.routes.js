const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises",
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
        params: {
          limit: 12,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});

router.get("/exercise/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises/exercise/" + id,
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});

router.post("/", async (req, res) => {
  const exerciseData = req.body;

  try {
    const newExercise = new Exercise(exerciseData);
    const savedExercise = await newExercise.save();
    res.status(201).json(savedExercise);
  } catch (error) {
    console.log(error);
    console.error("Error adding exercise:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/targets", async (req, res, next) => {
  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises/targetList",
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});

router.get("/target/:targetID", async (req, res, next) => {
  const { targetID } = req.params;
  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises/target/" + targetID,
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});
router.get("/bodypart", async (req, res, next) => {
  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises/bodyPartList",
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});
router.get("/bodypart/:BodypartId", async (req, res, next) => {
  const { BodypartId } = req.params;
  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises/bodyPart/" + BodypartId,
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});
router.get("/name/:name", async (req, res, next) => {
  const { name } = req.params;
  const encodedName = encodeURIComponent(name); // Codifica el nombre

  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises/name/" + encodedName,
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});
//get equipmentlist
router.get("/equipment", async (req, res, next) => {
  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises/equipmentList",
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});

router.get("/equipment/:equipmentId", async (req, res, next) => {
  const { equipmentId } = req.params;
  try {
    const response = await axios.get(
      process.env.EXERCISE_DB_API_URL + "/exercises/equipment/" + equipmentId,
      {
        headers: {
          "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY,
          "x-rapidapi-host": process.env.EXERCISE_DB_API_HOST,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
  }
});

module.exports = router;
