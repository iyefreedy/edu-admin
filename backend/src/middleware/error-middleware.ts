import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ResponseError from "../error/response-error";

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.errors.flatMap((error) => error.message),
    });
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: err.message,
  });
}
