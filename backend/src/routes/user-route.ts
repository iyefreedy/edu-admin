import { Router } from "express";
import { UserController } from "../controllers/user-controller";

const userRoute = Router()
  .post("/api/users", UserController.create)
  .post("/api/users/login", UserController.login);

export default userRoute;
