import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import requests from "@/api/apiClient";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await requests.account.login(credentials);
      const { token, user } = response;

      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userInfo", JSON.stringify(user));
      }
      toast.success("Login successful!");
      return user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await requests.account.getUser();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await requests.account.register(userData);
      toast.success("Registration successful!");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Check for existing token in localStorage on app load
const loadAuthState = () => {
  if (typeof window === 'undefined') {
    return {
      userInfo: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }

  const token = localStorage.getItem("authToken");
  const userInfoString = localStorage.getItem("userInfo");
  let userInfo = null;

  if (userInfoString) {
    try {
      userInfo = JSON.parse(userInfoString);
    } catch (e) {
      console.error("Failed to parse user info from localStorage", e);
      localStorage.removeItem("userInfo"); 
    }
  }

  if (token && userInfo) {
    return {
      userInfo: userInfo,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }
  return {
    userInfo: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState = loadAuthState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userInfo");
      }
      toast.info("Logged out successfully.");
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
      })
      // Login User cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Get User cases
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
const selectUserState = (state) => state.user;

export const selectIsAuthenticated = createSelector(
  [selectUserState],
  (user) => user.isAuthenticated
);

export const selectUserInfo = createSelector(
  [selectUserState],
  (user) => user.userInfo
);

export const selectUserLoading = createSelector(
  [selectUserState],
  (user) => user.loading
);

export const selectUserError = createSelector(
  [selectUserState],
  (user) => user.error
);