import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import requests from "../../api/apiClient";

// Sepeti getiren thunk
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requests.cart.get();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Sepete ürün ekleyen thunk
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await requests.cart.addItem(productId, quantity);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Sepetten ürün silen thunk
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await requests.cart.deleteItem(productId, quantity);
      return response.data;
    } catch (error) {
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
  items.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
);

export const selectCartTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);
