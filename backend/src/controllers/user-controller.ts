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

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.login(req.body);

      return res
        .status(200)
        .cookie("accessToken", result.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })
        .json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json(req.user);
    } catch (error) {
      return next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .clearCookie("accessToken")
        .status(200)
        .json({ message: "Logout success" });
    } catch (error) {
      return next(error);
    }
  }

  static async assignments(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.assignments(req.user!.id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
