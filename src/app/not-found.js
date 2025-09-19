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
      <StyledTypography variant="h1" component="h1" color="primary">
        404
      </StyledTypography>
      <StyledTypography variant="h4" component="h2" gutterBottom>
        Sayfa Bulunamadı
      </StyledTypography>
      <StyledTypography variant="body1">
        Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </StyledTypography>
      <StyledButton
        variant="contained"
        color="primary"
        component={Link}
        href="/"
      >
        Ana Sayfaya Dön
      </StyledButton>
    </StyledContainer>
  );
}
