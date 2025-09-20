"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Box } from "@mui/material";
import WishlistItemCard from "../../../components/wishlist/wishlistItemCard";
import { setWishlist } from "../../../store/slices/wishlistSlice";
import { wishlist as wishlistApi } from "../../../api/apiClient";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // const fetchWishlist = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await wishlistApi.get();
    //     dispatch(setWishlist(response));
    //   } catch (error) {
    //     console.error("Failed to fetch wishlist:", error);
    //     // Optionally, show a toast notification for error
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchWishlist();
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          İstek Listem
        </Typography>
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        İstek Listem
      </Typography>
      {wishlistItems.length === 0 ? (
        <Typography>İstek listenizde henüz ürün bulunmamaktadır.</Typography>
      ) : (
        <Grid container spacing={2}>
          {wishlistItems.map((product) => (
            <WishlistItemCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
