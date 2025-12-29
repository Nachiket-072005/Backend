import express, { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.js";

const authRouter = express(Router());

authRouter.post("/signup", upload.single("profileImage"), signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
export default authRouter;
