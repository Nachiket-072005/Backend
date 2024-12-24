import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Redis } from "ioredis";
import axios from "axios";

const app = express();

const redisClient = new Redis();
dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/posts", async (req, res) => {
  try {
    const cacheData = await redisClient.get("posts");
    if (cacheData !== null) {
      console.log("Cached Data");
      return res.json(JSON.parse(cacheData));
    } else {
      console.log("Not Cached Data");
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      await redisClient.setex("posts", 3600, JSON.stringify(data));
      return res.json(data);
    }
  } catch (error) {
    console.error(error);
  }
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
