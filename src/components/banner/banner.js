"use client";
import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import BannerCarousel from "./bannerCarousel";

const Banner = () => {
  return (
    <Grid container sx={{ height: "400px" }}>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          textAlign: "left",
          p: 4,
        }}
      >
        <Typography variant="h2" component="h1">
          E-Ticaret Sitemize Hoş Geldiniz!
        </Typography>
        <Typography variant="h5" component="p" mb={4}>
          En iyi ürünleri en uygun fiyatlarla bulun.
        </Typography>
        <Button variant="contained" size="large" color="warning">
          Alışverişe Başla
        </Button>
      </Grid>
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <BannerCarousel />
      </Grid>
    </Grid>
  );
};

export default Banner;
