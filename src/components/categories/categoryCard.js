import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import Link from "next/link";
import React, { memo } from "react";

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
            height: "100%",
            display: "flex",
            boxShadow: (theme) => theme.shadows[8],
            flexDirection: "column",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={category.imageUrl}
              alt={category.name}
              loading="lazy"
              sx={{ objectFit: "contain", p: 2 }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                {category.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}
export default memo(CategoryCard);
