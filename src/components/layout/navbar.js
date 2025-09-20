"use client";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Added for wishlist
import Link from "next/link";

export default function Navbar() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
    marginLeft: 0,
    width: "100%",
    order: 1,
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
      order: 0,
      marginTop: 0,
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                E-Ticaret
              </Typography>
            </Link>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: { xs: 0, sm: 3 },
            }}
          >
            <IconButton
              component={Link}
              href="/profile/wishlist"
              size="large"
              color="inherit"
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              component={Link}
              href="/login"
              size="large"
              color="inherit"
            >
              <Person2OutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
