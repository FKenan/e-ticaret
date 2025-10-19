import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { addAddress, updateAddress } from "@/store/slices/addressSlice";
import { selectUserInfo } from "@/store/slices/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AddAddressModal({ open, handleClose, addressToEdit }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const { loading } = useSelector((state) => state.addresses);

  const [formData, setFormData] = useState({
    city: "",
    district: "",
    fullAddress: "",
  });

  const isEditMode = Boolean(addressToEdit);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        city: addressToEdit.city || "",
        district: addressToEdit.district || "",
        fullAddress: addressToEdit.fullAddress || "",
      });
    } else {
      setFormData({
        city: "",
        district: "",
        fullAddress: "",
      });
    }
  }, [addressToEdit, isEditMode, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addressData = { ...formData, userId: userInfo.id };
    if (isEditMode) {
      dispatch(
        updateAddress({
          id: addressToEdit.id,
          updatedAddress: { id: addressToEdit.id, ...addressData },
        })
      ).then(() => {
        handleClose();
      });
    } else {
      dispatch(addAddress(addressData)).then(() => {
        handleClose();
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="address-modal-title"
      aria-describedby="address-modal-description"
    >
      <Box
        sx={style}
        component="form"
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
      >
        <Typography id="address-modal-title" variant="h6" component="h2">
          {isEditMode ? "Edit Address" : "Add New Address"}
        </Typography>
        <Typography
          id="address-modal-description"
          sx={{ mt: 2 }}
          className="sr-only"
        >
          {isEditMode
            ? "Edit your existing address details below"
            : "Fill in your address details below"}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="city"
              label="City"
              variant="outlined"
              fullWidth
              required
              inputProps={{
                "aria-label": "City",
                "aria-required": "true",
              }}
              value={formData.city}
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
              value={formData.district}
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
              value={formData.fullAddress}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {isEditMode ? "Save Changes" : "Save Address"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
