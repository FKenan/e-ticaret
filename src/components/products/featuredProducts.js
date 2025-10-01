"use client";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./productCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProductLoading,
  selectProducts,
} from "@/store/slices/productSlice";
import { useEffect } from "react";
import NoProductsFound from "./NoProductsFound";
import LoadingSpinner from "../common/LoadingSpinner";

export default function FeaturedProducts() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // displays all products for now
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        Featured Products
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
    </Container>
  );
}
