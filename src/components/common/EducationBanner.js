"use client";
import React from "react";
import { Paper, Typography } from "@mui/material";

const EducationBanner = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px",
        zIndex: 1000,
        maxWidth: "250px",
        backgroundColor: "transparent",
      }}
    >
      <Typography variant="body2" align="center">
        This website is for educational purposes only.
      </Typography>
    </Paper>
  );
};

export default EducationBanner;
