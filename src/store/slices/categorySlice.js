import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import requests from "../../api/apiClient";

const initialState = {
  categories: [],
  loading: true, // Set to true initially to indicate data is being fetched
  error: null,
};

// Tüm kategorileri getiren async thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await requests.categories.all();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;

// Selectors
const selectCategoriesState = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.categories
);

export const selectCategoryLoading = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.loading
);

export const selectCategoryError = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.error
);
