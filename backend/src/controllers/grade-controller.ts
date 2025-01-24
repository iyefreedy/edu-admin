import { NextFunction, Request, Response } from "express";
import GradeService from "../services/grade-service";

export default class GradeController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await GradeService.createGrade(req.body, req.user!.id);

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async gradedStudentAssignments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { studentId } = req.params;
      const result = await GradeService.getGradedStudentAssignment(studentId);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
