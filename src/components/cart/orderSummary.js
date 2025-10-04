import React from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";

export default function CartPage({ subtotal }) {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper variant="outlined" sx={{ p: 3, bgcolor: "background.default" }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography fontWeight="medium">${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography color="text.secondary">Shipping</Typography>
          <Typography fontWeight="medium">Free</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" fontWeight="bold">
            ${subtotal.toFixed(2)}
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/checkout"
          variant="contained"
          color="warning"
          size="large"
          fullWidth
        >
          Proceed to Checkout
        </Button>
      </Paper>
    </Grid>
  );
}
