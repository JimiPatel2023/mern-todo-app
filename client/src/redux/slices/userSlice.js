import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearTodos } from "./todoSlice";

export const loginUser = createAsyncThunk("loginUser", async (data) => {
  try {
    const res = await axios.post("http://localhost:5000/api/v1/login", data, {
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

export const logoutUser = createAsyncThunk("logout", async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/v1/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(clearTodos());
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
});

export const registerUser = createAsyncThunk("registerUser", async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/register",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const verifyUser = createAsyncThunk("verifyUser", async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/v1/verify", {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return {
      verification: false,
    };
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    validUser: false,
    error: null,
  },
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      }
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = true;
      state.error = null;
    });

    // Verify User
    builder.addCase(verifyUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.validUser = true;
        state.user = { ...action.payload.user };
      }
      state.loading = false;
    });

    // register user
    builder.addCase(registerUser.pending, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      }
    });

    // logout user
    builder.addCase(logoutUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.user = null;
      } else {
        state.error = "Logout failed!";
      }
      state.loading = false;
    });
  },
});

export const { clearError, setLoading } = userSlice.actions;

export default userSlice.reducer;
