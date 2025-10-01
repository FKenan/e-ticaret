"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Divider,
  Button,
  CardActionArea,
} from "@mui/material";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { logout } from "../../store/slices/userSlice";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import Favorite from "@mui/icons-material/Favorite";
import LocationOn from "@mui/icons-material/LocationOn";
import Payment from "@mui/icons-material/Payment";
import Link from "next/link";

export default function ProfilePage() {
  const { userInfo, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading || !isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {userInfo?.firstName} {userInfo?.lastName}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {userInfo?.email}
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardActionArea
              component={Link}
              href="/profile/orders"
              sx={{ p: 2, textAlign: "center" }}
            >
              <ShoppingBag sx={{ fontSize: 40 }} />
              <Typography variant="h6">Orders</Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardActionArea
              component={Link}
              href="/profile/wishlist"
              sx={{ p: 2, textAlign: "center" }}
            >
              <Favorite sx={{ fontSize: 40 }} />
              <Typography variant="h6">Wishlist</Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardActionArea
              component={Link}
              href="/profile/addresses"
              sx={{ p: 2, textAlign: "center" }}
            >
              <LocationOn sx={{ fontSize: 40 }} />
              <Typography variant="h6">Addresses</Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ textAlign: "end", mt: 4, mb: 10 }}>
        <Button
          variant="text"
          color="warning"
          onClick={handleLogout}
          sx={{ fontSize: 24, fontWeight: "bold" }}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
}
