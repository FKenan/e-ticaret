import React from "react";
import { Box } from "@mui/material";
import ProductDetail from "@/components/products/productDetail";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <ProductDetail id={id} />
    </Box>
  );
}
