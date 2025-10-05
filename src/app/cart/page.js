"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Grid, Paper } from "@mui/material";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  selectCartItems,
  selectCartSubtotal,
  selectCartStatus,
} from "@/store/slices/cartSlice";
import { selectUserInfo } from "@/store/slices/userSlice";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CartItem from "@/components/cart/cartItem";
import EmptyCart from "@/components/cart/emptyCart";
import OrderSummary from "@/components/cart/orderSummary";
import LoginPrompt from "@/components/cart/loginPrompt";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const status = useSelector(selectCartStatus);
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user]);

  const handleUpdateQuantity = (productId, quantity) => {
    if (user?.id) {
      dispatch(addToCart({ userId: user.id, productId, quantity }));
    }
  };

  const handleRemoveItem = (productId, quantity) => {
    if (user?.id) {
      dispatch(
        removeFromCart({ userId: user.id, productId, amount: quantity })
      );
    }
  };

  if (!user) {
    return <LoginPrompt />;
  }

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            variant="outlined"
            sx={{ p: 2, bgcolor: "background.default" }}
          >
            {[...cartItems]
              .sort((a, b) => a.productId - b.productId)
              .map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  handleRemoveItem={handleRemoveItem}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
              ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <OrderSummary subtotal={subtotal} />
      </Grid>
    </Container>
  );
}
