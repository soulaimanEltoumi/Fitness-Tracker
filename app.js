require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const { isAuthenticated } = require("./middleware/jwt.middleware");

const UserRoutes = require("./routes/User.routes");
app.use("/user", UserRoutes);

const exercisesRoutes = require("./routes/exercises.routes");
app.use("/exercise", exercisesRoutes);

const userExercisesRoutes = require("./routes/userExercises.routes");
app.use("/userExercises", userExercisesRoutes);

const workoutRoutes = require("./routes/workout.routes");
app.use("/workout", workoutRoutes);

const createWorkoutRoute = require("./routes/createWorkouts.routes");
app.use("/createWorkout", createWorkoutRoute);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
