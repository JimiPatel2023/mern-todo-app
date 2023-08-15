const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter title of the todo"],
      maxLength: [200, "Please Enter shorter title"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Description of todo"],
      maxLength: [1000, "Please Enter shorter description"],
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
