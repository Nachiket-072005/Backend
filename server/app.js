import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
