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
import { addToWishlist } from "../../store/slices/wishlistSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToWishlist = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event propagation to parent Link
    if (!isInWishlist) {
      dispatch(addToWishlist(product));
      // Optionally, show a toast notification
    }
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
