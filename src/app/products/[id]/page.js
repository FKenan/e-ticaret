"use client";
import React, { useState } from "react";
import { Grid, Typography, Button, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductCarousel from "@/components/products/productCarousel";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Örnek Ürün",
    price: "199.99 TL",
    description:
      "Bu ürün, en kaliteli malzemelerden üretilmiştir ve uzun ömürlü kullanım sağlar. Modern tasarımı ve işlevselliği ile hayatınızı kolaylaştırır.",
    images: [
      {
        image: "https://placehold.co/600x400",
        alt: "Ürün Resmi 1",
      },
      {
        image: "https://placehold.co/600x400",
        alt: "Ürün Resmi 2",
      },
      {
        image: "https://placehold.co/600x400",
        alt: "Ürün Resmi 3",
      },
    ],
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <Box sx={{ flexGrow: 1, px: 2, py: 8 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductCarousel items={product.images} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            {product.price}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Qty
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => handleQuantityChange(-1)}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6" sx={{ marginX: 2 }}>
                {quantity}
              </Typography>
              <IconButton onClick={() => handleQuantityChange(1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="warning"
              size="large"
              sx={{ width: { xs: "100%", sm: "auto" }, py: 1.5 }}
            >
              Sepete Ekle
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
