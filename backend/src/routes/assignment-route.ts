import { Router } from "express";
import AssignmentController from "../controllers/assignment-controller";
import roleMiddleware from "../middleware/role-middleware";
import authMiddleware from "../middleware/auth-middleware";

const assignmentRoute = Router()
  .use(authMiddleware)
  .get(
    "/api/assignments",
    roleMiddleware(["TEACHER"]),
    AssignmentController.getAssignments
  )
  .post(
    "/api/assignments",
    roleMiddleware(["STUDENT"]),
    AssignmentController.createAssignment
  );

export default assignmentRoute;
