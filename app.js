require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const UserRoutes = require("./routes/index.routes");
app.use("/user", UserRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
