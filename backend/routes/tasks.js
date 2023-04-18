const express = require("express");
const Task = require("../database/model/task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
