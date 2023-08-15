const express = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/new").post(isAuthenticatedUser, createTodo);
router.route("/todos").get(isAuthenticatedUser, getTodos);
router
  .route("/todo/:id")
  .put(isAuthenticatedUser, updateTodo)
  .delete(isAuthenticatedUser, deleteTodo);

module.exports = router;
