"use client";
import React, { useState, useEffect } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import SearchBar from "../search/searchBar";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserInfo,
} from "@/store/slices/userSlice";
import { toggleTheme } from "@/store/slices/themeSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { selectCartItems, fetchCart } from "@/store/slices/cartSlice";
import GuestActions from "./guestActions";
import AuthActions from "./authActions";

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

  useEffect(() => {
    if (isClient && isAuthenticated && userInfo?.id && cartItems.length === 0) {
      dispatch(fetchCart(userInfo.id));
    }
  }, [isClient, isAuthenticated, userInfo, cartItems.length, dispatch]);

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "background.paper", color: "text.primary" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" passHref aria-label="Go to homepage">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            E-Commerce
          </Typography>
        </Link>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "center" },
          }}
        >
          <SearchBar />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => dispatch(toggleTheme())}
            color="inherit"
            aria-label="toggle light/dark theme"
          >
            {isClient && mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          {isClient &&
            (isAuthenticated ? (
              <AuthActions
                userInfo={userInfo}
                cartItemsCount={cartItems.length}
              />
            ) : (
              <GuestActions />
            ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
