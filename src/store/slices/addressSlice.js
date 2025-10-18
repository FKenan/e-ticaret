import requests from "@/api/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Async Thunks
export const getAddresses = createAsyncThunk(
  "addresses/get",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await requests.addresses.get(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addAddress = createAsyncThunk(
  "addresses/add",
  async (address, { rejectWithValue }) => {
    try {
      const response = await requests.addresses.addItem(address);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/update",
  async ({ id, updatedAddress }, { rejectWithValue }) => {
    try {
      await requests.addresses.update(id, updatedAddress);
      return updatedAddress;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/delete",
  async (id, { rejectWithValue }) => {
    try {
      await requests.addresses.delete(id);
      return id;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
        return rejectWithValue(null);
      }
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Addresses
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          (address) => address.id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;

// Selectors
export const selectAddresses = (state) => state.addresses.addresses;
export const selectAddressLoading = (state) => state.addresses.loading;
export const selectAddressError = (state) => state.addresses.error;
export const selectAddressById = (state, addressId) =>
  state.addresses.addresses.find((address) => address.id === addressId);
