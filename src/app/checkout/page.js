"use client";

import React, { useState, useEffect } from "react";
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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  selectCartItems,
  selectCartSubtotal,
  clearCart,
} from "@/store/slices/cartSlice";
import {
  createOrder,
  selectOrdersLoading,
  selectOrdersError,
} from "@/store/slices/orderSlice";
import { selectUserInfo } from "@/store/slices/userSlice";
import {
  getAddresses,
  selectAddresses,
  selectAddressLoading,
} from "@/store/slices/addressSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector(selectCartItems);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const userInfo = useSelector(selectUserInfo);
  const addresses = useSelector(selectAddresses);
  const orderLoading = useSelector(selectOrdersLoading);
  const orderError = useSelector(selectOrdersError);
  const addressLoading = useSelector(selectAddressLoading);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // --- Fetch Addresses and Cart Items ---
  useEffect(() => {
    if (userInfo && userInfo.id && addresses.length === 0 && !addressLoading) {
      dispatch(getAddresses(userInfo.id));
    }
  }, [userInfo, addresses.length, addressLoading, dispatch]);

  // --- Set Default Address ---
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id); // Set first address as default
    }
  }, [addresses, selectedAddressId]);

  // --- Handle Order Success/Error ---
  useEffect(() => {
    if (orderError) {
      toast.error(orderError.message || "Failed to place order.");
      setIsOrderPlaced(false);
    } else if (isOrderPlaced && !orderLoading) {
      toast.success("Order placed successfully!");
      dispatch(clearCart(userInfo.id));
      router.push("/profile/orders");
    }
  }, [isOrderPlaced, orderLoading, orderError, dispatch, router, userInfo]);

  const handleAddressSelect = (event) => {
    setSelectedAddressId(parseInt(event.target.value));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!userInfo || !userInfo.id) {
      toast.error("User not logged in.");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select a shipping address.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.expiryDate ||
      !paymentDetails.cvv
    ) {
      toast.error("Please fill in all payment details.");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.price,
    }));

    const orderData = {
      userId: userInfo.id,
      addressId: selectedAddressId,
      orderItems: orderItems,
      totalAmount: cartSubtotal,
      orderDate: new Date().toISOString(),
      status: "Pending",
    };

    const resultAction = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(resultAction)) {
      setIsOrderPlaced(true);
    }
  };

  // Placeholder for payment details, not directly used in order creation payload
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  if (!userInfo) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" color="error" align="center">
          Please log in to proceed to checkout.
        </Typography>
      </Container>
    );
  }

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          Your cart is empty. Add some items to proceed to checkout.
        </Typography>
      </Container>
    );
  }

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
            {addressLoading ? (
              <CircularProgress />
            ) : addresses.length > 0 ? (
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Select an Address</FormLabel>
                <RadioGroup
                  name="shippingAddress"
                  value={selectedAddressId ? selectedAddressId.toString() : ""}
                  onChange={handleAddressSelect}
                >
                  {addresses.map((address) => (
                    <FormControlLabel
                      key={address.id}
                      value={address.id.toString()}
                      control={<Radio />}
                      label={`${address.fullAddress}, ${address.city}, ${address.district}`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No addresses found. Please add an address in your profile.
              </Typography>
            )}
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
              onClick={handlePlaceOrder}
              disabled={
                orderLoading || !selectedAddressId || cartItems.length === 0
              }
            >
              {orderLoading ? <CircularProgress size={24} /> : "Place Order"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
