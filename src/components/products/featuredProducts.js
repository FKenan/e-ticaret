import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./productCard";

export default function FeaturedProducts() {
  const Products = [
    {
      id: 1,
      name: "Example Product 1",
      price: 29.99,
      image: "https://placehold.co/200x200",
    },
    {
      id: 2,
      name: "Example Product 2",
      price: 49.99,
      image: "https://placehold.co/200x200",
    },
    {
      id: 3,
      name: "Product 1",
      price: 29.99,
      image: "https://placehold.co/200x200",
    },
    {
      id: 4,
      name: "Example Product 2",
      price: 49.99,
      image: "https://placehold.co/200x200",
    },
    {
      id: 5,
      name: "Example Product 1",
      price: 29.99,
      image: "https://placehold.co/200x200",
    },
    {
      id: 6,
      name: "Example Product 2",
      price: 49.99,
      image: "https://placehold.co/200x200",
    },
  ];
  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        Featured Products
      </Typography>
      <Grid container spacing={6}>
        {Products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
