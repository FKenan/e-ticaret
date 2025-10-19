import { Avatar, Button, IconButton } from "@mui/material";
import Link from "next/link";
import React, { memo } from "react";

function GuestActions() {
  return (
    <>
      <Button
        component={Link}
        href="/login"
        color="inherit"
        variant="outlined"
        sx={{ display: { xs: "none", md: "inline-flex" } }}
      >
        Login
      </Button>
      <Button
        component={Link}
        href="/register"
        color="warning"
        variant="contained"
        sx={{ display: { xs: "none", md: "inline-flex" } }}
      >
        Sign Up
      </Button>
      <IconButton
        component={Link}
        href="/login"
        color="inherit"
        sx={{ display: { xs: "inline-flex", md: "none" } }}
        aria-label="Go to login page"
      >
        <Avatar sx={{ bgcolor: "warning.main" }}></Avatar>
      </IconButton>
    </>
  );
}

export default memo(GuestActions);
