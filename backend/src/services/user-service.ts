import database from "../database";
import bcrypt from "bcrypt";
import { CreateUserRequest } from "../models/user-request";
import { CREATE } from "../schema/user-schema";
import { validate } from "../validation";

export class UserService {
  static async createUser(request: CreateUserRequest) {
    const user = validate(CREATE, request);

    const existingUser = await database.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return database.user.create({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      },
    });
  }
}
