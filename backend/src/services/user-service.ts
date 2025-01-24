import bcrypt from "bcrypt";

import database from "../core/database";
import { CreateUserRequest, LoginRequest } from "../models/user-request";
import UserSchema from "../schema/user-schema";
import { validate } from "../utils/validation";
import ResponseError from "../models/response-error";
import { createAccessToken } from "../utils/jwt";

export class UserService {
  static async createUser(request: CreateUserRequest) {
    const user = validate(UserSchema.CREATE, request);

    const existingUser = await database.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new ResponseError(400, "User already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return database.user.create({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async login(request: LoginRequest) {
    const user = await database.user.findFirst({
      where: {
        email: request.email,
      },
    });

    if (!user) {
      throw new ResponseError(400, "Invalid email or password");
    }

    const isPasswordMatches = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isPasswordMatches) {
      throw new ResponseError(400, "Invalid email or password");
    }

    const token = await createAccessToken(user);

    return {
      token,
    };
  }
}
