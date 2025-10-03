"use client";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  alpha,
} from "@mui/material";
import Link from "next/link";
import { memo } from "react";

function CategoryCard({ category }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Link
        href={`/categories/${category.id}`}
        passHref
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            position: "relative",
            height: 250,
            borderRadius: 2,
            overflow: "hidden",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: (theme) => theme.shadows[10],
            },
          }}
        >
          <CardActionArea sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              image={category.imageUrl || "https://placehold.co/600x400.png"}
              alt={category.name}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: (theme) => alpha(theme.palette.common.black, 0.6),
                color: "common.white",
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" component="div" fontWeight="bold">
                {category.name}
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}

export default memo(CategoryCard);
