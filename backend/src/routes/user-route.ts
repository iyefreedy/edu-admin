import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import authMiddleware from "../middleware/auth-middleware";

const userRoute = Router()
  .post("/api/users", UserController.create)
  .post("/api/users/login", UserController.login)
  .get("/api/users/me", authMiddleware, UserController.me);

export default userRoute;
