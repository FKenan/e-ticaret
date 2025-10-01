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
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [value, setValue] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setValue(0);
    } else if (pathname.startsWith("/categories")) {
      setValue(1);
    } else if (pathname.startsWith("/cart")) {
      setValue(2);
    } else if (pathname.startsWith("/profile")) {
      setValue(3);
    }
  }, [pathname]);

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
            color: "text.secondary",
          },
          "& .Mui-selected, & .Mui-selected .MuiSvgIcon-root": {
            color: "warning.main",
          },
        }}
      >
        <BottomNavigationAction
          component={Link}
          href="/"
          label="Home"
          icon={<HomeOutlined sx={{ fontSize: 30 }} />}
        />
        <BottomNavigationAction
          component={Link}
          href="/categories"
          label="Categories"
          icon={<CategoryOutlined sx={{ fontSize: 30 }} />}
        />
        <BottomNavigationAction
          component={Link}
          href="/cart"
          label="Cart"
          icon={<ShoppingCartOutlined sx={{ fontSize: 30 }} />}
        />
        <BottomNavigationAction
          component={Link}
          href="/profile"
          label="Profile"
          icon={<PersonOutline sx={{ fontSize: 30 }} />}
        />
      </BottomNavigation>
    </Box>
  );
}
