import React, { memo } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../../store/slices/addressSlice";

function AddressCard({ address }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAddress(address.id));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {address.city} - {address.district}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {address.fullAddress}
        </Typography>
        <Box sx={{ mt: 2, display: "flex", gap: 1 }} justifyContent="flex-end">
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button size="small" variant="outlined">
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default memo(AddressCard);
