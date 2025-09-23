"use client";
import {
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
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

export default function ProductCard({ product }) {
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
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                fontWeight="bold"
                sx={{ flexGrow: 1 }}
              >
                {product.name}
              </Typography>
              <IconButton
                aria-label="add to wishlist"
                size="small"
                onClick={handleAddToWishlist}
                color={isInWishlist ? "error" : "default"}
              >
                {isInWishlist ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
            </Box>
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
                onClick={handleAddToCart}
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
