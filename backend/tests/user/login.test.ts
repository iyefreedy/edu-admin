import supertest from "supertest";
import app from "../../src/core/app";
import { UserTest } from "../test-util";

describe("POST /api/users/login", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should return 200 with valid input", async () => {
    const input = {
      email: "student@example.com",
      password: "password",
    };

    await supertest(app).post("/api/users/login").send(input);
  });
});
