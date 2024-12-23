import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
