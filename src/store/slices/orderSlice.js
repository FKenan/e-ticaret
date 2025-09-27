import requests from "@/api/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await requests.orders.getOrders(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await requests.orders.getOrder(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await requests.orders.createOrder(formData);
      console.log("Order created:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;

export const selectOrders = (state) => state.orders.orders;
export const selectOrder = (state) => state.orders.order;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
