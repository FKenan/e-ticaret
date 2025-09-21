import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (!existingItem) {
        state.items.push(item);
        toast.success("Product added to wishlist!");
      } else {
        toast.info("Product is already in the wishlist!");
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      toast.error("Product removed from wishlist!");
    },
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
