"use client";
import React, { memo } from "react";
import { Box, Typography } from "@mui/material";

function OrderAddress({ address }) {
  if (!address) {
    return null;
  }
  console.log("Rendering OrderAddress with address:", address);
  return (
    <Box mt={2}>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
        Delivery Address
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {`${address.district}, ${address.city}, ${address.fullAddress}`}
      </Typography>
    </Box>
  );
}

export default memo(OrderAddress);
