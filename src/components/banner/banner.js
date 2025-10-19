"use client";
import { memo } from "react";
import { Typography, Button, Grid } from "@mui/material";
import BannerCarousel from "./bannerCarousel";

const Banner = () => {
  return (
    <Grid
      container
      spacing={4}
      sx={{ my: 4, alignItems: "center", px: 2 }}
      role="banner"
      aria-label="Welcome section"
    >
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          textAlign: "left",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          role="heading"
          aria-level="1"
        >
          Welcome to Our E-Commerce Site!
        </Typography>
        <Typography
          variant="h5"
          component="p"
          mb={4}
          role="contentinfo"
        >
          Find the best products at the best prices.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="warning"
          aria-label="Start shopping in our store"
        >
          Start Shopping
        </Button>
      </Grid>
      <Grid
        size={{ xs: 12, md: 7 }}
        role="complementary"
        aria-label="Product showcase carousel"
      >
        <BannerCarousel />
      </Grid>
    </Grid>
  );
};

export default memo(Banner);
