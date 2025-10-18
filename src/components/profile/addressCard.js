import React, { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../../store/slices/addressSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AddressCard({ address, onEdit }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAddress(address.id));
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {address.city} - {address.district}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {address.fullAddress}
          </Typography>
        </CardContent>
        <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconButton aria-label="edit" onClick={() => onEdit(address)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
}

export default memo(AddressCard);
