"use client";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import LoadingSpinner from "../common/LoadingSpinner";
import ProductCarousel from "./productCarousel";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  selectProductLoading,
  selectSelectedProduct,
} from "@/store/slices/productSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { selectUserInfo } from "@/store/slices/userSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import NoProductsFound from "./NoProductsFound";
import { toast } from "react-toastify";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from "@/store/slices/wishlistSlice";

export default function ProductDetail({ id }) {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);
  const loading = useSelector(selectProductLoading);
  const userInfo = useSelector(selectUserInfo);
  const [quantity, setQuantity] = useState(1);
  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = selectedProduct
    ? wishlistItems.some((item) => item.productId === selectedProduct.id)
    : false;

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (!userInfo || !userInfo.id) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    dispatch(
      addToCart({
        userId: userInfo.id,
        productId: selectedProduct.id,
        quantity,
      })
    );
  };

  const handleAddToWishlist = () => {
    if (!userInfo || !userInfo.id) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }
    if (isInWishlist) {
      const wishlistItem = wishlistItems.find(
        (item) => item.productId === selectedProduct.id
      );
      if (wishlistItem) {
        dispatch(removeFromWishlist(wishlistItem.id));
      }
    } else {
      dispatch(
        addToWishlist({ userId: userInfo.id, productId: selectedProduct.id })
      );
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : !selectedProduct ? (
    <NoProductsFound />
  ) : (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ProductCarousel items={selectedProduct.productImages} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {selectedProduct.name}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          ${selectedProduct.price}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
          Available Stock: {selectedProduct.stock}
        </Typography>
        <Typography variant="body1">{selectedProduct.description}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Qty
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => handleQuantityChange(-1)}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginX: 2 }}>
              {quantity}
            </Typography>
            <IconButton onClick={() => handleQuantityChange(1)}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            aria-label="add to wishlist"
            size="large"
            onClick={handleAddToWishlist}
            color={isInWishlist ? "error" : "default"}
          >
            {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
          <Button
            variant="contained"
            color="warning"
            size="large"
            sx={{ width: { xs: "100%", sm: "auto" }, py: 1.5 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
