"use client";
import CategoryCard from "@/components/categories/categoryCard";
import NoProductFound from "@/components/products/NoProductsFound";
import {
  fetchCategories,
  selectCategories,
  selectCategoryLoading,
} from "@/store/slices/categorySlice";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoryLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Categories
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : categories.length === 0 ? (
        <NoProductFound />
      ) : (
        <Grid container spacing={4}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Grid>
      )}
    </Box>
  );
}
