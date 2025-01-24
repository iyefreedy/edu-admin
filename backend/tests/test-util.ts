import database from "../src/core/database";

export class UserTest {
  static async delete() {
    await database.user.deleteMany();
  }

  static async create(input: { email: string; password: string }) {
    return await database.user.create({
      data: {
        email: input.email,
        password: input.password,
        role: "STUDENT",
        name: "John Doe",
      },
    });
  }
}
