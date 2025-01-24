import { Request, Response, NextFunction } from "express";
import { AssignmentService } from "../services/assignment-service";

export default class AssignmentController {
  static async createAssignment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const assignment = await AssignmentService.createAssignment(req.body);
      return res.status(201).json(assignment);
    } catch (error) {
      return next(error);
    }
  }
}
