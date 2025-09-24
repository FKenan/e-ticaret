"use client";

import { Typography, Button, Container } from "@mui/material";
import Link from "next/link";
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

export default function NotFound() {
  return (
    <StyledContainer maxWidth="md">
      <StyledTypography variant="h1" component="h1" color="warning">
        404
      </StyledTypography>
      <StyledTypography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </StyledTypography>
      <StyledTypography variant="body1">
        Sorry, the page you are looking for does not exist or may have been moved.
      </StyledTypography>
      <StyledButton
        variant="contained"
        color="warning"
        component={Link}
        href="/"
      >
        Go to Homepage
      </StyledButton>
    </StyledContainer>
  );
}
