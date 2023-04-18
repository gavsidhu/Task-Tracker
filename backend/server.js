const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const server = require("http").createServer(app);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Manager API" });
});

app.use("/tasks", require("./routes/tasks"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = server; // export the server instance
