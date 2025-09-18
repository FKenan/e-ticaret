import { createSlice } from "@reduxjs/toolkit";
// import apiClient from '@/api/apiClient'; // API istemcinizi buraya import edin

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Örnek bir async thunk. API'den ürünleri çekmek için kullanılabilir.
// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await apiClient.get('/products');
//   return response.data;
// });

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchProducts.pending, (state) => {
  //         state.status = 'loading';
  //       })
  //       .addCase(fetchProducts.succeeded, (state, action) => {
  //         state.status = 'succeeded';
  //         state.items = action.payload;
  //       })
  //       .addCase(fetchProducts.failed, (state, action) => {
  //         state.status = 'failed';
  //         state.error = action.error.message;
  //       });
  //   },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
