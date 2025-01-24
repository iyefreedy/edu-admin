import { Request, Response, NextFunction } from "express";
import ResponseError from "../error/response-error";

export default function roleMiddleware(roles: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new ResponseError(401, "Unauthorized");
      }

      if (!roles.includes(user.role)) {
        throw new ResponseError(403, "Forbidden");
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
