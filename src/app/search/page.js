"use client";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { Container, Typography, Grid, Box } from "@mui/material";
import ProductCard from "../../components/products/productCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import NoProductsFound from "../../components/products/NoProductsFound";

const SearchResultsPage = () => {
  const { results, loading, error } = useSelector((state) => state.search);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results for "{query}"
      </Typography>
      {loading && <LoadingSpinner />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Box>
          {results.length > 0 ? (
            <Grid container spacing={4}>
              {results.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoProductsFound />
          )}
        </Box>
      )}
    </Container>
  );
};

export default SearchResultsPage;
