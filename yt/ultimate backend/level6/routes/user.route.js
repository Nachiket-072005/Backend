import express from "express";

import {
  createUser,
  deleteUser,
  getUserByUsername,
  getUsers,
  home,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", home);

router.post("/create", createUser);

router.get("/users", getUsers);

router.get("/users/:username", getUserByUsername);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;
