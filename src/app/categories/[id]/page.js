import ProductsByCategory from "@/components/products/productsByCategory";
import { Container } from "@mui/material";

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <ProductsByCategory id={id} />
    </Container>
  );
}
