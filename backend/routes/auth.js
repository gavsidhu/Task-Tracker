const express = require("express");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../database/model/user");
const checkAuth = require("../middleware/checkAuth")

const router = express.Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = JWT.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: 360000,
  });

  return res.status(200).json({
    token,
    user: {
      email: user.email,
    },
  });
});
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = JWT.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    return res.status(201).json({
      token,
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({ message: "Bad Request" });
  }
});

router.get("/me", checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
  return res.status(200).json({
      user: {
        email: user.email,
      },
  });
  } catch (error) {
    return res.status(400).json({ message: "Bad Request" });
  }
});

module.exports = router;