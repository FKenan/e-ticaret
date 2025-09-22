import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import requests from "../../api/apiClient";

const initialState = {
  products: [],
  productsByCategory: [],
  selectedProduct: null,
  loading: true, 
};

// Tüm ürünleri getiren async thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await requests.products.all();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ID'ye göre tek bir ürün getiren async thunk
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      return await requests.products.byId(productId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ID'ye göre tek bir ürün getiren async thunk
export const fetchProductByCategory = createAsyncThunk(
  "products/fetchProductByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      return await requests.products.byCategory(categoryId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchProductByCategory
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productsByCategory = action.payload;
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

// Selectors
const selectProductsState = (state) => state.products;

export const selectProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.products
);

export const selectSelectedProduct = createSelector(
  [selectProductsState],
  (productsState) => productsState.selectedProduct
);

export const selectProductLoading = createSelector(
  [selectProductsState],
  (productsState) => productsState.loading
);

export const selectProductsByCategory = createSelector(
  [selectProductsState],
  (productsState) => productsState.productsByCategory
);

export const selectProductError = createSelector(
  [selectProductsState],
  (productsState) => productsState.error
);
