import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import authMiddleware from "../middleware/auth-middleware";
import roleMiddleware from "../middleware/role-middleware";

const userRoute = Router()
  .post("/api/users", UserController.create)
  .post("/api/users/login", UserController.login)
  .get("/api/users/me", authMiddleware, UserController.me)
  .get(
    "/api/users/me/assignments",
    authMiddleware,
    roleMiddleware(["STUDENT"]),
    UserController.assignments
  )
  .delete("/api/users/logout", authMiddleware, UserController.logout);

export default userRoute;
