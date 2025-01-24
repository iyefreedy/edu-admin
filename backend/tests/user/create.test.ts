import supertest from "supertest";
import app from "../../src/core/app";
import { UserTest } from "../test-util";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should return 201 with valid input", async () => {
    const input = {
      name: "Student 1",
      email: "student@example.com",
      password: "password",
      role: "STUDENT",
    };

    const response = await supertest(app).post("/api/users").send(input);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email,
      role: input.role,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should return 400 with existing email", async () => {
    const input = {
      name: "Student 1",
      email: "student@example.com",
      password: "password",
      role: "STUDENT",
    };

    await supertest(app).post("/api/users").send(input);

    const response = await supertest(app).post("/api/users").send(input);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return 400 with invalid input", async () => {
    const input = {
      name: "Student 1",
      email: "student@example.com",
      password: "password",
      role: "INVALID",
    };

    const response = await supertest(app).post("/api/users").send(input);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
