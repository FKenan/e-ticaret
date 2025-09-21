"use client";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./productCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "@/store/slices/productSlice";
import { useEffect } from "react";

export default function FeaturedProducts() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        Featured Products
      </Typography>
      <Grid container spacing={6}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
