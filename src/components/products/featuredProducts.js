"use client";
import { Container, Grid, Typography, Box } from "@mui/material";
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
    // Fetch products only if the list is empty.
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const featured = products.slice(0, 8);

  return (
    <Box sx={{ bgcolor: "background.paper", py: 8 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 6 }}
        >
          Featured Products
        </Typography>
        {loading ? (
          <LoadingSpinner />
        ) : featured.length === 0 ? (
          <NoProductsFound />
        ) : (
          <Grid container spacing={4}>
            {featured.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
