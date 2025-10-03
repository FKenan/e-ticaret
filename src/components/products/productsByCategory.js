"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByCategory,
  selectProductLoading,
  selectProductsByCategory,
} from "@/store/slices/productSlice";
import {
  selectCategories,
  fetchCategories,
} from "@/store/slices/categorySlice";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import ProductCard from "./productCard";
import NoProductsFound from "./NoProductsFound";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProductsByCategory({ id }) {
  const dispatch = useDispatch();

  const products = useSelector(selectProductsByCategory);
  const loading = useSelector(selectProductLoading);
  const categories = useSelector(selectCategories);

  const category = categories.find((cat) => cat.id === parseInt(id));

  useEffect(() => {
    dispatch(fetchProductByCategory(id));

    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, id, categories.length]);

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (products.length === 0) {
      return <NoProductsFound />;
    }

    return (
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <ProductCard product={product} key={product.id} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 5 }}
      >
        {category && category.name}
      </Typography>
      {renderContent()}
    </Container>
  );
}
