"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../store/slices/wishlistSlice";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WishlistItemCard({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    dispatch(removeFromWishlist(item.id));
  };

  const { product } = item;

  if (!product) {
    return null;
  }

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: "8px",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Link
          href={`/products/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            component="img"
            loading="lazy"
            sx={{
              height: 200,
              objectFit: "contain",
            }}
            image={product.image}
            alt={product.name}
          />
        </Link>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Box>
            <Link
              href={`/products/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                fontWeight="bold"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.name}
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="h6" color="text.primary" fontWeight="bold">
              ${product.price.toFixed(2)}
            </Typography>
            <IconButton
              aria-label="remove from wishlist"
              onClick={handleRemoveFromWishlist}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
