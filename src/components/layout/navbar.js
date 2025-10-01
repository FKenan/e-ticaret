"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Avatar,
  Badge,
} from "@mui/material";
import SearchBar from "../search/searchBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectIsAuthenticated,
  selectUserInfo,
} from "@/store/slices/userSlice";
import { toggleTheme } from "@/store/slices/themeSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { selectCartItems } from "@/store/slices/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItems = useSelector(selectCartItems);
  const { mode } = useSelector((state) => state.theme);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "background.paper", color: "text.primary" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" passHref>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            E-Commerce
          </Typography>
        </Link>

        {/* Search */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <SearchBar />
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
            {isClient && mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          {isClient && isAuthenticated && (
            <IconButton component={Link} href="/cart" color="inherit">
              <Badge
                badgeContent={isClient ? cartItems.length : 0}
                color="error"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          )}

          {isClient && isAuthenticated ? (
            <IconButton component={Link} href="/profile" sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {userInfo?.firstName?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          ) : (
            <>
              <Button
                component={Link}
                href="/login"
                color="inherit"
                variant="outlined"
                sx={{ display: { xs: "none", md: "inline-flex" } }}
              >
                Login
              </Button>
              <Button
                component={Link}
                href="/register"
                color="warning"
                variant="contained"
                sx={{ display: { xs: "none", md: "inline-flex" } }}
              >
                Sign Up
              </Button>
              <IconButton
                component={Link}
                href="/login"
                color="inherit"
                sx={{ display: { xs: "inline-flex", md: "none" } }}
              >
                <Avatar />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
