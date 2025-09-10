"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const initialCartItems = [
  {
    id: 1,
    name: "Sample Product 1",
    price: 199.99,
    quantity: 1,
    image: "https://source.unsplash.com/random/150x150?product=a",
  },
  {
    id: 2,
    name: "Sample Product 2",
    price: 89.5,
    quantity: 2,
    image: "https://source.unsplash.com/random/150x150?product=b",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        My Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">Your cart is empty.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <List>
              {cartItems.map((item) => (
                <Paper key={item.id} sx={{ mb: 2 }}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <DeleteIcon color="warning" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={item.image}
                        sx={{ width: 80, height: 80, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 1)}
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
                  ${calculateTotal()}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                color="warning"
                fullWidth
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
