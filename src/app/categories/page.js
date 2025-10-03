"use client";
import CategoryCard from "@/components/categories/categoryCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {
  fetchCategories,
  selectCategories,
  selectCategoryLoading,
} from "@/store/slices/categorySlice";
import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoryLoading);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 5 }}
      >
        All Categories
      </Typography>
      {loading && categories.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {categories.length > 0
            ? categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            : !loading && (
                <Typography variant="h6" sx={{ mt: 5, textAlign: "center" }}>
                  No categories found.
                </Typography>
              )}
        </Grid>
      )}
    </Container>
  );
}
