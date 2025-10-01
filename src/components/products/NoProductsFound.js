
import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NoProductsFound = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 2,
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        minHeight: '300px',
      }}
    >
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" component="p" gutterBottom>
        No Products Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {message || 'No products were found matching your criteria.'}
      </Typography>
    </Box>
  );
};

export default memo(NoProductsFound);
