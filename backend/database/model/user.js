const mongoose = require("mongoose");

// TODO: modify if necessary
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password should have at least 6 characters"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
