const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Not started", "In progress", "Completed"],
    default: "Not started",
  },
  dueDate: {
    type: Date,
    required: false,
  },
  user: {
    type: String,
    required: true
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
