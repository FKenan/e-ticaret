import React, { memo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "@/store/slices/wishlistSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function WishlistItemCard({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(item.id));
  };

  const { product } = item;

  if (!product) {
    return null;
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "12px",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Link href={`/products/${product.id}`} passHref>
        <CardMedia
          component="img"
          loading="lazy"
          image={product.image || "https://placehold.co/600x400.png"}
          alt={product.name}
          sx={{
            aspectRatio: "1 / 1",
            objectFit: "contain",
            padding: "1rem",
          }}
        />
      </Link>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          pt: 0,
        }}
      >
        <Box>
          <Link
            href={`/products/${product.id}`}
            passHref
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              fontWeight="600"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                minHeight: "2.5em",
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
            {typeof product.price === "number"
              ? `$${product.price.toFixed(2)}`
              : "$--.--"}
          </Typography>
          <IconButton
            aria-label="remove from wishlist"
            onClick={handleRemoveFromWishlist}
            color="error"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.1)",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default memo(WishlistItemCard);
