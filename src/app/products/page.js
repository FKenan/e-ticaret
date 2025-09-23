"use client";
import ProductCard from "@/components/products/productCard";
import NoProductFound from "@/components/products/NoProductsFound";
import {
  fetchProducts,
  selectProducts,
  selectProductLoading,
} from "@/store/slices/productSlice";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);

  useEffect(() => {
    if (!loading && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, loading, products.length]);

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        All Products
      </Typography>
      {loading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <NoProductFound />
      ) : (
        <Grid container spacing={6}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
