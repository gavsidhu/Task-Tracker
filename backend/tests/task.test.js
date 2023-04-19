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
    await Task.deleteMany();
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
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    };
    const res = await request(server).post("/tasks").send(task);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(task.title);
    expect(res.body.description).toBe(task.description);
    expect(res.body.status).toBe(task.status);
    expect(res.body.dueDate).toBe(task.dueDate);
  });

  it("should return a task with the specified id", async () => {
    const task = new Task({
      title: "New Task",
      description: "Task Description",
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    });
    await task.save();
    const res = await request(server).get(`/tasks/${task._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(task.title);
    expect(res.body.description).toBe(task.description);
    expect(res.body.status).toBe(task.status);
    expect(res.body.dueDate).toBe(task.dueDate.toISOString());
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
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    });
    await task.save();
    const updates = {
      title: "Updated Task",
      status: "in progress",
      dueDate: "2023-05-02T00:00:00.000Z",
    };
    const res = await request(server).patch(`/tasks/${task._id}`).send(updates);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updates.title);
    expect(res.body.description).toBe(task.description);
    expect(res.body.status).toBe(updates.status);
    expect(res.body.dueDate).toBe(updates.dueDate);
  });

  it("should return tasks filtered by title", async () => {
    const task1 = new Task({
      title: "Task 1",
      description: "Task 1 description",
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    });
    const task2 = new Task({
      title: "Task 2",
      description: "Task 2 description",
      status: "in progress",
      dueDate: "2023-05-05T00:00:00.000Z",
    });
    const task3 = new Task({
      title: "Task 3",
      description: "Task 3 description",
      status: "completed",
      dueDate: "2023-05-10T00:00:00.000Z",
    });
    await Promise.all([task1.save(), task2.save(), task3.save()]);
    const res = await request(server).get("/tasks?title=Task 1");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Task 1");
  });

  it("should return tasks filtered by status", async () => {
    const task1 = new Task({
      title: "Task 1",
      description: "Task 1 description",
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    });
    const task2 = new Task({
      title: "Task 2",
      description: "Task 2 description",
      status: "in progress",
      dueDate: "2023-05-05T00:00:00.000Z",
    });
    const task3 = new Task({
      title: "Task 3",
      description: "Task 3 description",
      status: "completed",
      dueDate: "2023-05-10T00:00:00.000Z",
    });
    await Promise.all([task1.save(), task2.save(), task3.save()]);
    const res = await request(server).get("/tasks?status=in progress");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Task 2");
  });

  it("should return tasks filtered by due date", async () => {
    const dueDate = new Date("2023-05-05T00:00:00.000Z").toISOString();
    const task1 = new Task({
      title: "Task 1",
      description: "Task 1 description",
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    });
    const task2 = new Task({
      title: "Task 2",
      description: "Task 2 description",
      status: "in progress",
      dueDate: dueDate,
    });
    const task3 = new Task({
      title: "Task 3",
      description: "Task 3 description",
      status: "completed",
      dueDate: "2023-05-10T00:00:00.000Z",
    });
    await Promise.all([task1.save(), task2.save(), task3.save()]);
    const res = await request(server).get(`/tasks?dueDate=${dueDate}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Task 2");
  });

  it("should return tasks filtered by due date before", async () => {
    const dueDate = new Date("2023-05-05T00:00:00.000Z").toISOString();
    const task1 = new Task({
      title: "Task 1",
      description: "Task 1 description",
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    });
    const task2 = new Task({
      title: "Task 2",
      description: "Task 2 description",
      status: "in progress",
      dueDate: dueDate,
    });
    const task3 = new Task({
      title: "Task 3",
      description: "Task 3 description",
      status: "completed",
      dueDate: "2023-05-10T00:00:00.000Z",
    });
    await Promise.all([task1.save(), task2.save(), task3.save()]);
    const res = await request(server).get(`/tasks?dueDateBefore=${dueDate}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].title).toBe("Task 1");
    expect(res.body[1].title).toBe("Task 2");
  });
  it("should update a task with the specified id", async () => {
    const task = new Task({
      title: "New Task",
      description: "Task Description",
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    });
    await task.save();
    const updates = {
      title: "Updated Task",
      status: "in progress",
      dueDate: "2023-05-02T00:00:00.000Z",
    };
    const res = await request(server).patch(`/tasks/${task._id}`).send(updates);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updates.title);
    expect(res.body.description).toBe(task.description);
    expect(res.body.status).toBe(updates.status);
    expect(res.body.dueDate).toBe(updates.dueDate);
  });

  it("should delete a task with the specified id", async () => {
    const task = new Task({
      title: "New Task",
      description: "Task Description",
      status: "not started",
      dueDate: "2023-05-01T00:00:00.000Z",
    });
    await task.save();
    const res = await request(server).delete(`/tasks/${task._id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(task.id);
    const deletedTask = await Task.findById(task.id);
    expect(deletedTask).toBe(null);
  });
});
