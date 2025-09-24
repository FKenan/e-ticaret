"use client";

import { useEffect } from "react";
import { Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  textAlign: "center",
  padding: "20px",
});

const StyledTypography = styled(Typography)({
  marginBottom: "20px",
});

const StyledButton = styled(Button)({
  marginTop: "20px",
});

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <StyledContainer maxWidth="md">
      <StyledTypography variant="h1" component="h1" color="error">
        Error!
      </StyledTypography>
      <StyledTypography variant="h4" component="h2" gutterBottom>
        Something went wrong!
      </StyledTypography>
      <StyledTypography variant="body1">
        An unexpected error occurred in the application. Please try again later.
      </StyledTypography>
      <StyledButton variant="contained" color="warning" onClick={() => reset()}>
        Try Again
      </StyledButton>
    </StyledContainer>
  );
}
