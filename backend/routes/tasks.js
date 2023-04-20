const express = require("express");
const Task = require("../database/model/task");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
  const { title, status, dueDate, dueDateBefore } = req.query;
  const user = req.user
  const filters = {
    ...(title && { title: { $regex: title, $options: "i" } }),
    ...(status && { status }),
    ...(dueDate && { dueDate: dueDate }),
    ...(dueDateBefore && { dueDate: { $lte: dueDateBefore } }),
    ...(user && { user }),
  };

  try {
    const tasks = await Task.find(filters);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad Request" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
