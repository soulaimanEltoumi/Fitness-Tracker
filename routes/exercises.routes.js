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
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("err", error);
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
//do the same but with name
// name example = band fixed back underhand pulldown  band%20fixed%20back%20underhand%20pulldown
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

module.exports = router;
