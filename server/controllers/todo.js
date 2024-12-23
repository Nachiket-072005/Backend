import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and description",
      });
    }

    const todo = new Todo({ title, description });
    await todo.save();
    res.status(201).json({ success: true, message: "Todo created", todo });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res
      .status(200)
      .json({ success: true, todos: todos.length === 0 ? [] : todos });
  } catch (error) {
    console.log(error);
  }
};

export const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: `No todo with id: ${id}` });
    }
    res.status(200).json({ success: true, todo });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and description",
      });
    }

    const updatedTodo = { title, description, _id: id };
    const todo = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: `No todo with id: ${id}` });
    }
    await todo.save();
    res
      .status(200)
      .json({ success: true, message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: `No todo with id: ${id}` });
    }
    await todo.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (error) {
    console.log(error);
  }
};
