import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requests from "@/api/apiClient";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await requests.account.register(userData);
      toast.success("Registration successful!");
      return data;
    } catch (error) {
      toast.error(error.response.data.message || "Registration failed");
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
