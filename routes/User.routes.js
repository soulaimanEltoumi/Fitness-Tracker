const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// POST /user/create - Creates a new user in the database
router.post("/create", (req, res, next) => {
  const { email, password, name, age, weight, height } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // Check if the email is already registered
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }

      // Hash the password before saving it in the database
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({
        email,
        password: hashedPassword,
        name,
        age,
        weight,
        height,
      });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, name, _id } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, name, _id };

      // Send the newly created user object as a response
      res.status(201).json(user);
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

module.exports = router;
