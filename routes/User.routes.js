const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

// POST /user/create - Creates a new user in the database
router.post("/signin", (req, res, next) => {
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
      const hashedPassword = bcrypt.hashSync(password, 10);

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
    .catch((err) => console.log(err));
  // next(err)); // In this case, we send error handling to the error handling middleware.
});
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty strings
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  // Find the user in the database by their email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      // Check if the provided password matches the hashed password in the database
      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      // If the password matches, create a JWT token containing the user's data
      // We use `json
      // Web Tokens` (JWT) for this purpose
      const payload = { _id: user._id, email: user.email, name: user.name };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the JWT token as a response
      res.json({ token });
    })
    .catch(
      (
        err //console.log(err));
      ) => next(err)
    ); // In this case, we send error handling to the error handling middleware.
});

module.exports = router;
