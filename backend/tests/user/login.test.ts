import supertest from "supertest";
import app from "../../src/core/app";
import { UserTest } from "../test-util";

describe("POST /api/users/login", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should return 200 with valid input", async () => {
    const input = {
      name: "Student 2",
      email: "student2@example.com",
      password: "password",
      role: "STUDENT",
    };

    await supertest(app).post("/api/users").send(input);

    const response = await supertest(app)
      .post("/api/users/login")
      .send({ email: input.email, password: input.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
  });
});
