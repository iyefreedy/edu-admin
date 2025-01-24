import { Router } from "express";
import { UserController } from "../controllers/user-controller";

const userRoute = Router().post("/api/users", UserController.create);

export default userRoute;
