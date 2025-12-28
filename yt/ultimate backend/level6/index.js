import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
