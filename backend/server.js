const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const tasksRoutes = require("./routes/tasks");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
