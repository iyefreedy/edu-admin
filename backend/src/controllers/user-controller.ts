import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.createUser(req.body);

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
