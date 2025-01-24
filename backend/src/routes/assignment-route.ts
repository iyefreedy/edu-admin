import { Router } from "express";
import AssignmentController from "../controllers/assignment-controller";
import roleMiddleware from "../middleware/role-middleware";
import authMiddleware from "../middleware/auth-middleware";

const assignmentRoute = Router()
  .use(authMiddleware)
  .get("/assignments", roleMiddleware(["TEACHER"]))
  .post(
    "/assignments",
    roleMiddleware(["STUDENT"]),
    AssignmentController.createAssignment
  );

export default assignmentRoute;
