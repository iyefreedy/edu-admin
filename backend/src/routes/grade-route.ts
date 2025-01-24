import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware";
import roleMiddleware from "../middleware/role-middleware";
import GradeController from "../controllers/grade-controller";

const gradeRoute = Router()
  .use(authMiddleware)
  .post("/api/grades", roleMiddleware(["TEACHER"]), GradeController.create)
  .get(
    "/api/grades/:studentId",
    roleMiddleware(["STUDENT", "TEACHER"]),
    GradeController.gradedStudentAssignments
  );

export default gradeRoute;
