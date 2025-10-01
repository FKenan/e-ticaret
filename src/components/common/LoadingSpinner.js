import { memo } from 'react';
import { Box, CircularProgress } from "@mui/material";

function LoadingSpinner() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <CircularProgress color="warning" size={40} thickness={5} />
    </Box>
  );
}

export default memo(LoadingSpinner);