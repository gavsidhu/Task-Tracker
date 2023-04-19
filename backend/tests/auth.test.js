const request = require("supertest");
const server = require("../server");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
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

describe("Auth API", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /auth/register", () => {
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

    it("should return a 400 error for duplicate email", async () => {
      const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      };
      await User.create(user);
      const res = await request(server).post("/auth/register").send(user);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("User with email already exists");
    });
  });

  describe("POST /auth/login", () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = new User({
        name: "John Doe",
        email: "johndoe@example.com",
        password: hashedPassword,
      });
      await user.save();
    });

    it("should return a token for valid credentials", async () => {
      const res = await request(server).post("/auth/login").send({
        email: "johndoe@example.com",
        password: "password123",
      });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();

      const decodedToken = JWT.verify(res.body.token, process.env.JWT_SECRET);
      expect(decodedToken.email).toBe("johndoe@example.com");
    });

    it("should return a 400 error for invalid credentials", async () => {
      const res = await request(server).post("/auth/login").send({
        email: "johndoe@example.com",
        password: "wrongpassword",
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid credentials");
    });
  });
});
