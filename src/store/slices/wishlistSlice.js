import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import requests from "../../api/apiClient";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchWishlistByUserId = createAsyncThunk(
  "wishlist/fetchByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await requests.wishlist.get(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (item, { rejectWithValue }) => {
    try {
      const response = await requests.wishlist.addItem(item);
      toast.success("Product added to wishlist!");
      return response;
    } catch (error) {
      toast.error("Failed to add product to wishlist.");
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (id, { rejectWithValue }) => {
    try {
      await requests.wishlist.removeItem(id);
      toast.success("Product removed from wishlist!");
      return id;
    } catch (error) {
      toast.error("Failed to remove product from wishlist.");
      return rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlistByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlistByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistStatus = (state) => state.wishlist.status;
export const selectWishlistError = (state) => state.wishlist.error;
