"use client";
import { memo } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  CardActions,
  Rating,
  Grid,
} from "@mui/material";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../store/slices/cartSlice";
import { selectUserInfo } from "../../store/slices/userSlice";
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from "../../store/slices/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const user = useSelector(selectUserInfo);
  const isInWishlist = wishlistItems.some(
    (item) => item.productId === product.id
  );

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add items to your wishlist.");
      return;
    }
    if (isInWishlist) {
      const wishlistItem = wishlistItems.find(
        (item) => item.productId === product.id
      );
      if (wishlistItem) {
        dispatch(removeFromWishlist(wishlistItem.id));
      }
    } else {
      dispatch(addToWishlist({ UserId: user.id, ProductId: product.id }));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add items to cart.");
      return;
    }
    dispatch(
      addToCart({ userId: user.id, productId: product.id, quantity: 1 })
    );
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          boxShadow: (theme) => theme.shadows[8],
          flexDirection: "column",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Link href={`/products/${product.id}`} passHref>
            <CardMedia
              component="img"
              loading="lazy"
              image={product.image}
              alt={product.name}
              sx={{
                height: 200,
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </Link>
          <IconButton
            aria-label="add to wishlist"
            onClick={handleAddToWishlist}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            color={isInWishlist ? "error" : "default"}
          >
            {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Link
            href={`/products/${product.id}`}
            passHref
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
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
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating name="read-only" value={product.rating || 4.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviewCount || 0})
            </Typography>
          </Box>
          <Typography variant="h5" component="p" fontWeight="bold">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <Button
            variant="contained"
            color="warning"
            onClick={handleAddToCart}
            fullWidth
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default memo(ProductCard);
