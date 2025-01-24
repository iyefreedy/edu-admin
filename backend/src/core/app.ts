import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "../routes/user-route";
import errorMiddleware from "../middleware/error-middleware";
import assignmentRoute from "../routes/assignment-route";
import gradeRoute from "../routes/grade-route";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(userRoute);
app.use(assignmentRoute);
app.use(gradeRoute);
app.use(errorMiddleware);

export default app;
