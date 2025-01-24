import database from "../core/database";
import { CreateAssignmentRequest } from "../models/assignment-request";
import ResponseError from "../models/response-error";
import AssignmentSchema from "../schema/assignment-schema";
import { validate } from "../utils/validation";

export class AssignmentService {
  static async createAssignment(request: CreateAssignmentRequest) {
    const assignment = validate(AssignmentSchema.CREATE, request);
    const studentId = request.studentId;

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

  static async updateAssignment(request: UpdateAssignmentRequest) {
    const assignment = validate(AssignmentSchema.UPDATE, request);

    const existingAssignment = await database.assignment.findFirst({
      where: {
        id: request.id,
      },
    });

    if (!existingAssignment) {
      throw new ResponseError(400, "Assignment not found");
    }

    return database.assignment.update({
      where: {
        id: request.id,
      },
      data: {
        name: assignment.name,
        description: assignment.description,
        dueDate: assignment.dueDate,
        courseId: assignment.courseId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        dueDate: true,
        courseId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async deleteAssignment(request: DeleteAssignmentRequest) {
    const existingAssignment = await database.assignment.findFirst({
      where: {
        id: request.id,
      },
    });

    if (!existingAssignment) {
      throw new ResponseError(400, "Assignment not found");
    }

    return database.assignment.delete({
      where: {
        id: request.id,
      },
    });
  }

  static async getAssignment(request: GetAssignmentRequest) {
    return database.assignment.findFirst({
      where: {
        id: request.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        dueDate: true,
        courseId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async getAssignments(request: GetAssignmentsRequest);
}
