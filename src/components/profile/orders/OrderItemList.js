"use client";
import React, { memo } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function OrderItemList({ items }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Products
      </Typography>
      <List disablePadding>
        {items.map((item, index) => (
          <ListItem key={`${item.productId}-${index}`} disableGutters>
            <ListItemText
              primary={item.productName}
              secondary={`Quantity: ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default memo(OrderItemList);
