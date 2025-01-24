import { Request, Response, NextFunction } from "express";
import { AssignmentService } from "../services/assignment-service";

export default class AssignmentController {
  static async createAssignment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const assignment = await AssignmentService.createAssignment(
        req.body,
        req.user!.id
      );
      return res.status(201).json(assignment);
    } catch (error) {
      return next(error);
    }
  }

  static async getAssignments(req: Request, res: Response, next: NextFunction) {
    try {
      const { subject } = req.query;
      const assignments = await AssignmentService.allAssignments(
        subject as string
      );
      return res.status(201).json(assignments);
    } catch (error) {
      return next(error);
    }
  }
}
