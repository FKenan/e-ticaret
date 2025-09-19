"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Divider,
  Button,
} from "@mui/material";
import { logout } from "../../store/slices/userSlice";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import Favorite from "@mui/icons-material/Favorite";
import LocationOn from "@mui/icons-material/LocationOn";
import Payment from "@mui/icons-material/Payment";

export default function ProfilePage() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Placeholder data
  const user = userInfo || {
    name: "Kenan",
    email: "kenan@example.com",
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {user.email}
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined" sx={{ p: 2, textAlign: "center" }}>
            <ShoppingBag sx={{ fontSize: 40 }} />
            <Typography variant="h6">My Orders</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined" sx={{ p: 2, textAlign: "center" }}>
            <Favorite sx={{ fontSize: 40 }} />
            <Typography variant="h6">Wishlist</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined" sx={{ p: 2, textAlign: "center" }}>
            <LocationOn sx={{ fontSize: 40 }} />
            <Typography variant="h6">Addresses</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined" sx={{ p: 2, textAlign: "center" }}>
            <Payment sx={{ fontSize: 40 }} />
            <Typography variant="h6">Payment Methods</Typography>
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
