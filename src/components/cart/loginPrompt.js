import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { LockPerson as LockPersonIcon } from "@mui/icons-material";
import Link from "next/link";

export default function LoginPrompt() {
  return (
    <Box
      textAlign="center"
      sx={{
        py: 8,
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LockPersonIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Please Log In
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Log in to see your cart and start shopping.
      </Typography>
      <Button
        component={Link}
        href="/login"
        variant="contained"
        color="warning"
      >
        Go to Login
      </Button>
    </Box>
  );
}
