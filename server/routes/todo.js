import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTodo).get(getAllTodos);
router
  .route("/:id")
  .get(isAuthenticated, getTodo)
  .put(isAuthenticated, updateTodo)
  .delete(isAuthenticated, deleteTodo);

export default router;
