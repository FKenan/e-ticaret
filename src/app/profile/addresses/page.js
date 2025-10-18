"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddressCard from "@/components/profile/addressCard";
import {
  getAddresses,
  selectAddresses,
  selectAddressLoading,
} from "@/store/slices/addressSlice";
import AddAddressModal from "@/components/profile/AddAddressModal";
import { selectUserInfo } from "@/store/slices/userSlice";

export default function AddressesPage() {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const loading = useSelector(selectAddressLoading);
  const userInfo = useSelector(selectUserInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(getAddresses(userInfo.id));
    }
  }, [dispatch, userInfo?.id]);

  const handleOpenModal = (address = null) => {
    setAddressToEdit(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAddressToEdit(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!addresses || addresses.length === 0) {
      return (
        <Typography variant="h6" align="center" sx={{ my: 5 }}>
          You have no saved addresses.
        </Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={() => handleOpenModal(address)}
          />
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          My Addresses
        </Typography>
        <Button
          variant="contained"
          color="warning"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Add New Address
        </Button>
      </Box>

      {renderContent()}

      <AddAddressModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        addressToEdit={addressToEdit}
      />
    </Container>
  );
}
