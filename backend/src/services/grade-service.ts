import database from "../core/database";
import ResponseError from "../error/response-error";
import { CreateGradeRequest } from "../models/grade-model";
import GradeSchema from "../schema/grade-schema";
import { validate } from "../utils/validation";

export default class GradeService {
  static async createGrade(
    createGradeRequest: CreateGradeRequest,
    teacherId: string
  ) {
    const grade = validate(GradeSchema.CREATE, createGradeRequest);

    const existingGradeAssignment = await database.grade.findMany({
      where: {
        assignmentId: grade.assignmentId,
      },
    });

    if (existingGradeAssignment.length > 0) {
      throw new ResponseError(400, "Assignment already graded.");
    }

    return database.grade.create({
      data: {
        assignmentId: grade.assignmentId,
        feedback: grade.feedback,
        score: grade.score,
        teacherId: teacherId,
      },
    });
  }

  static async getGradedStudentAssignment(studentId: string) {
    return database.grade.findMany({
      where: {
        assignment: {
          studentId: studentId,
        },
      },
      select: {
        assignment: true,
        feedback: true,
        score: true,
        teacher: true,
      },
    });
  }
}
