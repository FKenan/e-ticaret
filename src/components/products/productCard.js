"use client";
import {
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Grid size={{ sm: 12, md: 6, lg: 4 }}>
      <Link
        href={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            loading="lazy"
            sx={{
              width: 150,
              height: 150,
              objectFit: "contain",
            }}
            image={product.image}
            alt={product.name}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              textAlign: "left",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              fontWeight="bold"
            >
              {product.name}
            </Typography>
            <Box>
              <Typography
                variant="h5"
                color="text.secondary"
                gutterBottom
                fontWeight="bold"
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="warning"
                sx={{ whiteSpace: "nowrap" }}
                onClick={(e) => {
                  // Link tıklamasıyla buton tıklamasını ayır
                  e.preventDefault();
                }}
              >
                Add to cart
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Link>
    </Grid>
  );
}
