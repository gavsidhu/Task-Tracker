const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  dueDate: {
    type: Date,
    required: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
