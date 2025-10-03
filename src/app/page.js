import Banner from "@/components/banner/banner";
import FeaturedProducts from "@/components/products/featuredProducts";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box component="main">
      <Banner />
      <FeaturedProducts />
    </Box>
  );
}