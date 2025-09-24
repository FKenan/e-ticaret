"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import AddressCard from "@/components/profile/addressCard";
import {
  getAddresses,
  selectAddresses,
  selectAddressLoading,
} from "@/store/slices/addressSlice";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AddAddressModal from "@/components/profile/AddAddressModal";
import { selectUserInfo } from "@/store/slices/userSlice";
import NoProductsFound from "@/components/products/NoProductsFound";

export default function AddressesPage() {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const loading = useSelector(selectAddressLoading);
  const userInfo = useSelector(selectUserInfo);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(getAddresses(userInfo.id));
    }
  }, [dispatch, userInfo.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          My Addresses
        </Typography>
        <Button
          variant="contained"
          color="warning"
          size="large"
          onClick={handleOpen}
        >
          Add New Address
        </Button>
      </Box>
      {addresses && addresses.length > 0 ? (
        <Grid container spacing={3}>
          {addresses.map((address) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={address.id}>
              <AddressCard address={address} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoProductsFound message="Kayıtlı adresiniz bulunmamaktadır." />
      )}
      <AddAddressModal open={open} handleClose={handleClose} />
    </Container>
  );
}
