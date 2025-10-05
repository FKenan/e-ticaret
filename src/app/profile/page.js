"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {
  logout,
  selectIsAuthenticated,
  selectUserInfo,
  selectUserLoading,
} from "../../store/slices/userSlice";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { deepOrange } from "@mui/material/colors";

const menuItems = [
  {
    text: "My Orders",
    icon: <ShoppingBagIcon />,
    href: "/profile/orders",
  },
  {
    text: "My Wishlist",
    icon: <FavoriteIcon />,
    href: "/profile/wishlist",
  },
  {
    text: "My Addresses",
    icon: <LocationOnIcon />,
    href: "/profile/addresses",
  },
];

export default function ProfilePage() {
  const userInfo = useSelector(selectUserInfo);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectUserLoading);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (loading || !isAuthenticated) {
    return <LoadingSpinner />;
  }

  const getInitials = (firstName = "", lastName = "") => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Grid container spacing={4}>
        {/* User Info Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: 80,
                height: 80,
                fontSize: "2.5rem",
                margin: "0 auto 16px",
              }}
            >
              {getInitials(userInfo?.firstName, userInfo?.lastName)}
            </Avatar>
            <Typography variant="h5" component="h1" gutterBottom>
              {userInfo?.firstName} {userInfo?.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {userInfo?.email}
            </Typography>
            <Button
              variant="contained"
              color="warning"
              onClick={handleLogout}
              fullWidth
            >
              Logout
            </Button>
          </Paper>
        </Grid>

        {/* Navigation Card */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2, px: 2 }}>
              Account Management
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} href={item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}