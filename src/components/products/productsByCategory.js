"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoProductsFound from "./NoProductsFound";
import {
  fetchProductByCategory,
  selectProductLoading,
  selectProductsByCategory,
} from "@/store/slices/productSlice";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "./productCard";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProductsByCategory({ id }) {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsByCategory);
  const loading = useSelector(selectProductLoading);

  useEffect(() => {
    dispatch(fetchProductByCategory(id));
  }, [dispatch, id]);

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        Products in Category
      </Typography>
      {loading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <NoProductsFound />
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Grid>
      )}
    </Box>
  );
}
