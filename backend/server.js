import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import taskRouter from "./routes/tasks.route.js";
import userRouter from "./routes/users.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server iniciado en http://localhost:${PORT}`);
});
