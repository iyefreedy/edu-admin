import database from "../src/core/database";

export class UserTest {
  static async delete() {
    await database.user.deleteMany();
  }
}
