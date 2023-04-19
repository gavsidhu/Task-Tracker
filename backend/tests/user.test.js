const request = require("supertest");
const server = require("../server");
const mongoose = require("mongoose");
const User = require("../database/model/user");

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/testdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Users API", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /users", () => {
    it("should return an empty array of users", async () => {
      const res = await request(server).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("POST /register", () => {
    it("should create a new user", async () => {
      const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      };
      const res = await request(server).post("/auth/register").send(user);
      expect(res.status).toBe(201);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toBeDefined();
    });

    it("should return a 400 error for invalid input", async () => {
      const user = {
        name: "John Doe",
        email: "invalid_email",
        password: "password123",
      };
      const res = await request(server).post("/auth/register").send(user);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Bad Request");
    });
  });

  describe("GET /users/:id", () => {
    let userId;
    beforeEach(async () => {
      const user = new User({
        name: "Jane Smith",
        email: "janesmith@example.com",
        password: "password456",
      });
      await user.save();
      userId = user._id.toString();
    });

    it("should return a user with the specified id", async () => {
      const res = await request(server).get(`/users/${userId}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        _id: userId,
        name: "Jane Smith",
        email: "janesmith@example.com",
      });
    });

    it("should return a 404 error for non-existent user id", async () => {
      const invalidId = "613a9a5d5a5f5d3a7c5f5d3a"; // a valid but non-existent ObjectId string
      const res = await request(server).get(`/users/${invalidId}`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });
  });

  describe("PATCH /users/:id", () => {
    let userId;
    beforeEach(async () => {
      const user = new User({
        name: "John Smith",
        email: "johnsmith@example.com",
        password: "password789",
      });
      await user.save();
      userId = user._id.toString();
    });

    it("should update a user with the specified id", async () => {
      const updates = { name: "John Doe" };
      const res = await request(server).patch(`/users/${userId}`).send(updates);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        _id: userId,
        name: "John Doe",
        email: "johnsmith@example.com",
      });
    });
  });

  describe("DELETE /users/:id", () => {
    let userId;
    beforeEach(async () => {
      const user = new User({
        name: "John Smith",
        email: "johnsmith@example.com",
        password: "password789",
      });
      await user.save();
      userId = user._id.toString();
    });

    it("should delete a user with the specified id", async () => {
      const res = await request(server).delete(`/users/${userId}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        _id: userId,
        name: "John Smith",
        email: "johnsmith@example.com",
      });

      const deletedUser = await User.findById(userId);
      expect(deletedUser).toBeNull();
    });
  });
});
