import ProductCard from "@/components/products/productCard";
import { Container, Grid, Typography } from "@mui/material";

const Products = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: 1299.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 1199.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "MacBook Air M2",
    price: 1099.0,
    image: "https://via.placeholder.com/150",
  },
];

export default function Page() {
  return (
    // Tüm ürünler listelenecek

    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        All Products
      </Typography>
      <Grid container spacing={6}>
        {Products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
