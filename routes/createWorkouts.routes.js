const router = require("express").Router();
const axios = require("axios");
const Workout = require("../models/Workout.model");

router.post("/", async (req, res) => {
  try {
    const { userId, title, date, exercises, duration, notes, isPublic } =
      req.body;

    // Validar los campos requeridos
    if (
      !userId ||
      !title ||
      !date ||
      !exercises ||
      typeof isPublic !== "boolean" ||
      exercises.length === 0
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const API_URL = process.env.EXERCISE_DB_API_URL;
    const API_KEY = process.env.EXERCISE_DB_API_KEY;
    const API_HOST = process.env.EXERCISE_DB_API_HOST;

    // Procesa cada ejercicio buscando su información completa en la API
    const processedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        try {
          const response = await axios.get(
            `${API_URL}/exercises/name/${encodeURIComponent(
              exercise.name
            )}?offset=0&limit=1`,
            {
              headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST,
              },
            }
          );

          // Verifica si hay resultados
          const exerciseData =
            response.data && response.data.length > 0 ? response.data[0] : null;

          if (exerciseData) {
            console.log(exerciseData);
            return {
              bodyPart: exerciseData.bodyPart || "Unknown",
              equipment: exerciseData.equipment || "Unknown",
              gifUrl: exerciseData.gifUrl,
              id: exerciseData.id || exercise.name, // Utiliza el nombre si el id no está disponible
              name: exerciseData.name,
              target: exerciseData.target || "Unknown",
              secondaryMuscles: exerciseData.secondaryMuscles || [],
              instructions: exerciseData.instructions || [],
            };
          } else {
            throw new Error(`Exercise ${exercise.name} not found`);
          }
        } catch (error) {
          console.error(
            `Error fetching exercise ${exercise.name}:`,
            error.message
          );
          throw new Error(`Failed to fetch exercise: ${exercise.name}`);
        }
      })
    );

    // Crea un nuevo entrenamiento con los ejercicios procesados
    const newWorkout = new Workout({
      userId,
      title,
      date,
      exercises: processedExercises,
      duration,
      notes,
      isPublic: isPublic || false,
      // Asigna false por defecto si no se proporciona
    });

    // Guarda el entrenamiento en la base de datos
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Error creating workout:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
