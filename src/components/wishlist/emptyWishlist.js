import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const EmptyWishlist = () => (
  <Box
    textAlign="center"
    sx={{
      py: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
    }}
  >
    <BookmarkBorderIcon sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
    <Typography variant="h5" component="h2" gutterBottom>
      Your Wishlist is Empty
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      {"Looks like you haven't added anything to your wishlist yet."}
    </Typography>
    <Button component={Link} href="/" variant="contained" color="warning">
      Continue Shopping
    </Button>
  </Box>
);

export default EmptyWishlist;
