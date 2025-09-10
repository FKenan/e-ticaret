import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function CategoryCard({ category }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Box
        sx={{
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Link
          href={`/categories/${category.id}`}
          passHref
          style={{ textDecoration: "none" }}
        >
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={category.imageUrl}
                alt={category.name}
                loading="lazy"
                sx={{ objectFit: "contain" }}
              />
              <CardContent sx={{ backgroundColor: "#f5f5f5" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {category.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Box>
    </Grid>
  );
}
