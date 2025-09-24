"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartSubtotal } from "@/store/slices/cartSlice";

export default function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const cartSubtotal = useSelector(selectCartSubtotal);

  const [shippingAddress, setShippingAddress] = useState({
    fulladdress: "",
    city: "",
    district: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order placement logic here
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  id="fulladdress"
                  name="fulladdress"
                  label="Full Address"
                  fullWidth
                  autoComplete="shipping fulladdress"
                  value={shippingAddress.fulladdress}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  id="district"
                  name="district"
                  label="District"
                  fullWidth
                  autoComplete="shipping address-level2"
                  value={shippingAddress.district}
                  onChange={handleShippingChange}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  id="cardNumber"
                  name="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  required
                  id="expiryDate"
                  name="expiryDate"
                  label="Expiry date"
                  fullWidth
                  autoComplete="cc-exp"
                  value={paymentDetails.expiryDate}
                  onChange={handlePaymentChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  required
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  autoComplete="cc-csc"
                  value={paymentDetails.cvv}
                  onChange={handlePaymentChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List disablePadding>
              {cartItems.map((item) => (
                <ListItem key={item.productId} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={item.productName}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography variant="body2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ${cartSubtotal.toFixed(2)}
                </Typography>
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              size="large"
              color="warning"
              fullWidth
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
