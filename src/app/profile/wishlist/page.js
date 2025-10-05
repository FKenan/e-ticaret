"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import WishlistItemCard from "@/components/wishlist/wishlistItemCard";
import EmptyWishlist from "@/components/wishlist/emptyWishlist";
import {
  fetchWishlistByUserId,
  selectWishlistItems,
  selectWishlistStatus,
} from "@/store/slices/wishlistSlice";
import { selectUserInfo } from "@/store/slices/userSlice";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const LoginPrompt = () => (
  <Box
    textAlign="center"
    sx={{
      py: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
    }}
  >
    <Typography variant="h5" component="h2" gutterBottom>
      Please Log In
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      You need to be logged in to view your wishlist.
    </Typography>
    <Button component={Link} href="/login" variant="contained" color="warning">
      Go to Login
    </Button>
  </Box>
);

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const status = useSelector(selectWishlistStatus);
  const userInfo = useSelector(selectUserInfo);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && userInfo && userInfo.id) {
      dispatch(fetchWishlistByUserId(userInfo.id));
    }
  }, [dispatch, userInfo, isClient]);

  if (!isClient || status === "loading") {
    return <LoadingSpinner />;
  }

  if (!userInfo || !userInfo.id) {
    return <LoginPrompt />;
  }

  return (
    <Container sx={{ py: 4 }}>
      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              My Wishlist
            </Typography>
            <Typography color="text.secondary">
              {wishlistItems.length} item(s) saved for later.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {wishlistItems.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                <WishlistItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default WishlistPage;
