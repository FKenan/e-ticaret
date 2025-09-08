"use client";
import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import BannerCarousel from "./BannerCarousel";

const Banner = () => {
  return (
    <Grid container sx={{ height: "400px", backgroundColor: "white" }}>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ color: "black" }}
        >
          E-Ticaret Sitemize Hoş Geldiniz!
        </Typography>
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{ color: "black" }}
        >
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
