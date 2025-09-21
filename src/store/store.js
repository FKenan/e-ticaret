import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import wishlistReducer from "./slices/wishlistSlice";
import categoryReducer from "./slices/categorySlice";

// Configure the Redux store with the defined slices

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    categories: categoryReducer,
  },
});
