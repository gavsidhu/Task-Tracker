const mongoose = require("mongoose");
const request = require("supertest");
const server = require("../server");
const Task = require("../database/model/task");

describe("Tasks API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Task.deleteMany();
  });

  it("should return an empty array of tasks", async () => {
    const res = await request(server).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should create a new task", async () => {
    const task = {
      title: "New Task",
      description: "Task Description",
    };
    const res = await request(server).post("/tasks").send(task);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(task.title);
    expect(res.body.description).toBe(task.description);
    expect(res.body.completed).toBe(false);
  });

  it("should return a task with the specified id", async () => {
    const task = new Task({
      title: "New Task",
      description: "Task Description",
    });
    await task.save();
    const res = await request(server).get(`/tasks/${task._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(task.title);
    expect(res.body.description).toBe(task.description);
    expect(res.body.completed).toBe(false);
  });

  it("should return a 404 error for non-existent task id", async () => {
    const invalidId = "613a9a5d5a5f5d3a7c5f5d3a"; // a valid but non-existent ObjectId string
    const res = await request(server).get(`/tasks/${invalidId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Task not found");
  });

  it("should update a task with the specified id", async () => {
    const task = new Task({
      title: "New Task",
      description: "Task Description",
    });
    await task.save();
    const updates = {
      title: "Updated Task",
      completed: true,
    };
    const res = await request(server).patch(`/tasks/${task._id}`).send(updates);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updates.title);
    expect(res.body.description).toBe(task.description);
    expect(res.body.completed).toBe(true);
  });

  it("should delete a task with the specified id", async () => {
    const task = new Task({
      title: "New Task",
      description: "Task Description",
    });
    await task.save();
    const res = await request(server).delete(`/tasks/${task._id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(task.id);
    const deletedTask = await Task.findById(task.id);
    expect(deletedTask).toBe(null);
  });
});
