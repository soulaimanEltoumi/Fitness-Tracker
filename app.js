require("dotenv").config();

require("./db");

const express = require("express");

const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Note: the `secure` option should be set to true only if you're using HTTPS
  })
);

// Your routes and other middleware go here

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

require("./config")(app);
require("./config/passport"); // Ruta correcta al archivo passport.js

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
