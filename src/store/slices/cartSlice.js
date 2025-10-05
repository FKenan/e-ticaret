import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import requests from "../../api/apiClient";
import { toast } from "react-toastify";

// Sepeti getiren thunk
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await requests.cart.get(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Sepete ürün ekleyen thunk
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { userId, productId, quantity = 1 },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await requests.cart.addItem(userId, productId, quantity);
      const response = await dispatch(fetchCart(userId));
      toast.success("Product added to cart!");
      return response.payload;
    } catch (error) {
      toast.error("Failed to add product to cart.");
      return rejectWithValue(error.response.data);
    }
  }
);

// Sepetten ürün silen thunk
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId, amount = 1 }, { dispatch, rejectWithValue }) => {
    try {
      await requests.cart.decreaseItem(userId, productId, amount);
      const response = await dispatch(fetchCart(userId));
      toast.success("Product removed from cart.");
      return response.payload;
    } catch (error) {
      toast.error("Failed to remove product from cart.");
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      await requests.cart.clear(userId);
      toast.success("Cart cleared successfully.");
      return userId;
    } catch (error) {
      toast.error("Failed to clear cart.");
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // clearCart
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

// SELECTORS
const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

export const selectCartStatus = createSelector(
  [selectCartState],
  (cart) => cart.status
);

export const selectCartError = createSelector(
  [selectCartState],
  (cart) => cart.error
);

// Extra selectors
export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  (items || []).reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  )
);

export const selectCartTotalItems = createSelector([selectCartItems], (items) =>
  (items || []).reduce((total, item) => total + item.quantity, 0)
);
