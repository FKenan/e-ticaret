import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const dummyAddresses = [
  {
    id: 1,
    city: "Istanbul",
    district: "Kadıköy",
    fullAddress:
      "Caferağa Mah. General Asım Gündüz Cad. No: 1, Daire: 5, Kadıköy/Istanbul",
  },
  {
    id: 2,
    city: "Ankara",
    district: "Çankaya",
    fullAddress: "Kavaklıdere Mah. Tunalı Hilmi Cad. No: 100, Çankaya/Ankara",
  },
  {
    id: 3,
    city: "Izmir",
    district: "Bornova",
    fullAddress: "Kazımdirik Mah. Üniversite Cad. No: 20, Bornova/Izmir",
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
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {address.city} - {address.district}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {address.fullAddress}
                </Typography>
                <Box
                  sx={{ mt: 2, display: "flex", gap: 1 }}
                  justifyContent="flex-end"
                >
                  <Button size="small" variant="outlined" color="error">
                    Delete
                  </Button>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
