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
  Rating,
  Tooltip,
  alpha,
} from "@mui/material";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: (theme) => theme.shadows[12],
        },
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", pt: "100%" }}>
        <Link href={`/products/${product.id}`} passHref>
          <CardMedia
            component="img"
            loading="lazy"
            image={product.image || "https://placehold.co/600x400.png"}
            alt={product.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </Link>
        <Tooltip
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <IconButton
            aria-label="add to wishlist"
            onClick={handleAddToWishlist}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: (theme) =>
                alpha(theme.palette.background.paper, 0.7),
              "&:hover": {
                backgroundColor: (theme) => theme.palette.background.paper,
              },
            }}
            color={isInWishlist ? "error" : "default"}
          >
            {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Link
          href={`/products/${product.id}`}
          passHref
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h2"
            fontWeight="600"
            sx={{
              height: "3em",
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
        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
          <Rating
            name="read-only"
            value={product.rating || 4.5}
            readOnly
            precision={0.5}
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount || 0})
          </Typography>
        </Box>
        <Typography
          variant="h5"
          component="p"
          fontWeight="bold"
          color="warning.main"
        >
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="warning"
          onClick={handleAddToCart}
          fullWidth
          startIcon={<AddShoppingCartIcon />}
          sx={{
            py: 1.5,
            fontWeight: "bold",
            borderRadius: 1.5,
            textTransform: "none",
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}

export default memo(ProductCard);
