import React from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import AddressCard from "@/components/profile/addressCard";

const dummyAddresses = [
  {
    id: 1,
    city: "Istanbul",
    district: "Kadıköy",
    fullAddress:
      "Caferağa Mah. General Asım Gündüz Cad. No: 1, Daire: 5, Kadıköy/Istanbul",
  },
];

export default function AddressesPage() {
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
        <Button variant="contained" color="warning" size="large">
          Add New Address
        </Button>
      </Box>
      <Grid container spacing={3}>
        {dummyAddresses.map((address) => (
          <Grid size={{ xs: 12, sm: 12, md: 6 }} key={address.id}>
            <AddressCard address={address} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
