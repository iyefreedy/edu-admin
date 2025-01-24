import express from "express";
import userRoute from "../routes/user-route";
import errorMiddleware from "../middleware/error-middleware";

const app = express();

app.use(express.json());

app.use(userRoute);
app.use(errorMiddleware);

export default app;
