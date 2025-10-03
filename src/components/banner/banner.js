"use client";
import { memo } from "react";
import { Typography, Button, Grid } from "@mui/material";
import BannerCarousel from "./bannerCarousel";

const Banner = () => {
  return (
    <Grid container spacing={2} sx={{ my: 4, alignItems: "center", px: 2 }}>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          textAlign: "left",
        }}
      >
        <Typography variant="h2" component="h1">
          Welcome to Our E-Commerce Site!
        </Typography>
        <Typography variant="h5" component="p" mb={4}>
          Find the best products at the best prices.
        </Typography>
        <Button variant="contained" size="large" color="warning">
          Start Shopping
        </Button>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <BannerCarousel />
      </Grid>
    </Grid>
  );
};

export default memo(Banner);
