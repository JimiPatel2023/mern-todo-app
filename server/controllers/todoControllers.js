const Todo = require("../models/todo");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomErrorHandler = require("../utils/customErrorHandler");

const createTodo = asyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const { title, description, user } = req.body;
  const todo = await Todo.create({ title, description, user });
  res.status(201).json({
    success: true,
    todo,
  });
});

const getTodos = asyncErrorHandler(async (req, res, next) => {
  const todos = await Todo.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    todos,
  });
});

const updateTodo = asyncErrorHandler(async (req, res, next) => {
  const { title, description, status } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title, description, status },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!todo) {
    return next(new CustomErrorHandler("Todo with this id doesn't exist", 400));
  }
  res.status(200).json({
    success: true,
    todo,
  });
});

const deleteTodo = asyncErrorHandler(async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) {
    return next(new CustomErrorHandler("Todo with this id doesn't exist", 400));
  }
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.status(200).json({
    success: true,
    message: "todo deleted",
  });
});

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
