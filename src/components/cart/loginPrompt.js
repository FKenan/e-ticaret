import React, { memo } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const LoginPrompt = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 8,
        px: 2,
        minHeight: "400px",
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: 80, color: "warning.main", mb: 3 }} />
      <Typography variant="h4" component="h2" gutterBottom>
        Your Cart is Waiting!
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: "450px" }}
      >
        Log in or create an account to see your items and check out.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          component={Link}
          href="/login"
          variant="contained"
          size="large"
          color="warning"
        >
          Login
        </Button>
        <Button
          component={Link}
          href="/register"
          variant="outlined"
          size="large"
          color="warning"
        >
          Create Account
        </Button>
      </Stack>
    </Box>
  );
};

export default memo(LoginPrompt);
