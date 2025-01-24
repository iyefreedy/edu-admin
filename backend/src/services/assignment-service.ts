import database from "../core/database";
import { CreateAssignmentRequest } from "../models/assignment-model";
import ResponseError from "../error/response-error";
import AssignmentSchema from "../schema/assignment-schema";
import { validate } from "../utils/validation";
import { Subject } from "@prisma/client";
import logger from "../core/logger";

export class AssignmentService {
  static async allAssignments(subject: string) {
    logger.info(subject);
    return database.assignment.findMany({
      where: {
        subject: subject as Subject,
      },
      select: {
        id: true,
        title: true,
        content: true,
        subject: true,
        student: true,
        createdAt: true,
        updatedAt: true,
        grade: true,
      },
    });
  }

  static async createAssignment(
    createAssignmentRequest: CreateAssignmentRequest,
    studentId: string
  ) {
    const assignment = validate(
      AssignmentSchema.CREATE,
      createAssignmentRequest
    );

    const existingAssignment = await database.assignment.findFirst({
      where: {
        title: assignment.title,
      },
    });

    if (existingAssignment) {
      throw new ResponseError(400, "Assignment already exists");
    }

    return database.assignment.create({
      data: {
        title: assignment.title,
        content: assignment.content,
        subject: assignment.subject,
        studentId: studentId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        subject: true,
        studentId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
