import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";
import { addAddress } from "@/store/slices/addressSlice";
import { selectUserInfo } from "@/store/slices/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddAddressModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [formData, setFormData] = useState({
    city: "",
    district: "",
    fullAddress: "",
    userId: userInfo?.id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress(formData));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-address-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="add-address-modal-title" variant="h6" component="h2">
          Add New Address
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="city"
              label="City"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="district"
              label="District"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="fullAddress"
              label="Full Address"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={3}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" color="warning" variant="contained">
            Save Address
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
