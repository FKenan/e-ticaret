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
