require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const UserRoutes = require("./routes/User.routes");
app.use("/user", UserRoutes);

const exercisesRoutes = require("./routes/exercises.routes");
app.use("/exercises", exercisesRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
