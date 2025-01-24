import dotenv from "dotenv";
import app from "./core/app";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
