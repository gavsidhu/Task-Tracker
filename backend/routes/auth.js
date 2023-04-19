const express = require("express");
const JWT = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const User = require("../database/model/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  isMatch = brcrpt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).message({ message: "Invalid credentialss" });
  }

  const token = JWT.sign({ email: newUser.email }, process.env.JWT_SECRET, {
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

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User with email already exitst" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    name
  });

  const token = JWT.sign({ email: newUser.email }, process.env.JWT_SECRET, {
    expiresIn: 360000,
  });

  return res.status(200).json({
    token,
    user: {
      email: newUser.email
    },
  });
});

module.exports = router;
