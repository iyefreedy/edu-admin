import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import ResponseError from "../error/response-error";
import database from "../core/database";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies["accessToken"];

    if (!accessToken) {
      throw new ResponseError(401, "Unauthorized");
    }
    const payload = await verifyAccessToken(accessToken);
    const currentUser = await database.user.findFirst({
      where: {
        id: payload.sub,
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

    if (!currentUser) {
      throw new ResponseError(401, "Unauthorized");
    }

    req.user = currentUser;
    return next();
  } catch (error) {
    return next(error);
  }
}
