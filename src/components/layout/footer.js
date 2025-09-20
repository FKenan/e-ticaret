"use client";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "lg",
        zIndex: 1000,
      }}
    >
      <Divider />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          "& .MuiBottomNavigationAction-root": {
            color: "black",
          },
          "& .Mui-selected, & .Mui-selected .MuiSvgIcon-root": {
            color: "warning.main",
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={
            <Link href="/">
              <HomeOutlined sx={{ fontSize: 30 }} />
            </Link>
          }
        />
        <BottomNavigationAction
          label="Categories"
          icon={
            <Link href="/categories">
              <CategoryOutlined sx={{ fontSize: 30 }} />
            </Link>
          }
        />
        <BottomNavigationAction
          label="Cart"
          icon={
            <Link href="/cart">
              <ShoppingCartOutlined sx={{ fontSize: 30 }} />
            </Link>
          }
        />
        <BottomNavigationAction
          label="Profile"
          icon={
            <Link href="/profile">
              <PersonOutline sx={{ fontSize: 30 }} />
            </Link>
          }
        />
      </BottomNavigation>
    </Box>
  );
}
