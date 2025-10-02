"use client";

import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotalItems,
} from "@/store/slices/cartSlice";
import { selectUserInfo } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const totalItems = useSelector(selectCartTotalItems);
  const userInfo = useSelector(selectUserInfo);
  const userId = userInfo?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  if (!userInfo) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          My Cart
        </Typography>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6">Please log in to view your cart.</Typography>
        </Paper>
      </Container>
    );
  }

  const handleRemoveItem = (productId, quantity) => {
    if (userId) {
      dispatch(removeFromCart({ userId, productId, amount: quantity }));
    }
  };

  const handleQuantityChange = (productId, amount) => {
    if (!userId) return;

    if (amount === 1) {
      dispatch(addToCart({ userId, productId, quantity: 1 }));
    } else if (amount === -1) {
      dispatch(removeFromCart({ userId, productId, amount: 1 }));
    }
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        My Cart
      </Typography>
      {totalItems === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">Your cart is empty.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <List>
              {cartItems?.map((item) => (
                <Paper key={item.productId} sx={{ mb: 2, p: 1 }}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          handleRemoveItem(item.productId, item.quantity)
                        }
                      >
                        <DeleteIcon color="warning" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={item.productName} />
                    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.productId, -1)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.productId, 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                </Paper>
              ))}
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" fontWeight="bold">
                  ${cartSubtotal.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                color="warning"
                fullWidth
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
