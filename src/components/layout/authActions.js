import { Avatar, Badge, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { memo } from "react";

function AuthActions({ userInfo, cartItemsCount }) {
  return (
    <>
      <IconButton
        component={Link}
        href="/cart"
        color="inherit"
        aria-label={`Cart with ${cartItemsCount} items`}
      >
        <Badge badgeContent={cartItemsCount} color="error">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
      <IconButton
        component={Link}
        href="/profile"
        sx={{ p: 0 }}
        aria-label="User profile"
      >
        <Avatar sx={{ bgcolor: "warning.main" }}>
          {userInfo?.firstName?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
    </>
  );
}

export default memo(AuthActions);
