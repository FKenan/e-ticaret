"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoProductsFound from "./NoProductsFound";
import {
  fetchProductByCategory,
  selectProductsByCategory,
} from "@/store/slices/productSlice";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "./productCard";

export default function ProductsByCategory({ id }) {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsByCategory);

  useEffect(() => {
    dispatch(fetchProductByCategory(id));
  }, [dispatch, id]);

  if (products.length === 0) {
    return <NoProductsFound />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        kategoriye ait ürünler {id}
      </Typography>
      <Grid container spacing={6}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
}
