import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Link from "next/link";

export default function CartPage() {
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
      <ShoppingCart sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Your Cart is Empty
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {"Looks like you haven't added anything to your cart yet."}
      </Typography>
      <Button component={Link} href="/" variant="contained" color="warning">
        Continue Shopping
      </Button>
    </Box>
  );
}
