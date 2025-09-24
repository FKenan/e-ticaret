"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import WishlistItemCard from "../../../components/wishlist/wishlistItemCard";
import {
  fetchWishlistByUserId,
  selectWishlistItems,
  selectWishlistStatus,
} from "../../../store/slices/wishlistSlice";
import NoProductsFound from "../../../components/products/NoProductsFound";
import { selectUserInfo } from "@/store/slices/userSlice";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const status = useSelector(selectWishlistStatus);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo.id) {
      dispatch(fetchWishlistByUserId(userInfo.id));
    }
  }, [dispatch, userInfo.id]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Wishlist
      </Typography>
      {wishlistItems.length === 0 ? (
        <NoProductsFound message="There are no products in your wishlist yet." />
      ) : (
        <Grid container spacing={2}>
          {wishlistItems.map((item) => (
            <WishlistItemCard key={item.id} item={item} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
