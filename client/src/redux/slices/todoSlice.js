import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodos = createAsyncThunk("getTodos", async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/v1/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const createTodo = createAsyncThunk(
  "createTodo",
  async ({ data, todos, navigate }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/new", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const newTodos = [res.data.todo, ...todos];
      return {
        newTodos,
        navigate,
      };
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "deleteTodo",
  async ({ id, todos }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/todo/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const newTodos = todos.filter((todo) => {
        return todo._id !== id;
      });
      return {
        newTodos,
      };
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const updateTodo = createAsyncThunk(
  "updateTodo",
  async ({ id, data, todos, navigate }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/todo/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const newTodos = todos.map((todo) => {
        if (todo._id == res.data.todo._id) {
          todo = { ...res.data.todo };
          return todo;
        }
        return todo;
      });
      return {
        newTodos,
        navigate,
      };
    } catch (error) {
      return error.response.data.message;
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTodos: (state, action) => {
      state.todos = null;
    },
  },
  extraReducers: (builder) => {
    // get todos
    builder.addCase(getTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      if (action.payload.todos) {
        state.todos = action.payload.todos;
        state.loading = false;
        state.error = null;
      } else {
        state.todos = null;
        state.loading = false;
        state.error = action.payload;
      }
    });

    // update todos
    builder.addCase(updateTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      if (action.payload.newTodos) {
        state.todos = action.payload.newTodos;
        state.loading = false;
        state.error = null;
        action.payload.navigate("/");
      } else {
        state.loading = false;
        state.error = action.payload;
      }
    });

    // delete todos
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      if (action.payload.newTodos) {
        state.loading = false;
        state.error = null;
        state.todos = action.payload.newTodos;
      } else {
        state.loading = false;
        state.error = action.payload;
      }
    });

    // create todo
    builder.addCase(createTodo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      if (action.payload.newTodos) {
        state.loading = false;
        state.error = null;
        state.todos = action.payload.newTodos;
        action.payload.navigate("/");
      } else {
        state.loading = false;
        state.error = action.payload;
      }
    });
  },
});

export const { clearTodos } = todoSlice.actions;

export default todoSlice.reducer;
