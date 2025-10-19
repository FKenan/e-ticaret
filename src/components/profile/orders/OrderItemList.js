"use client";
import React, { memo } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function OrderItemList({ items }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Products
      </Typography>
      <List disablePadding role="list" aria-label="Order items">
        {items.map((item, index) => (
          <li key={`${item.productId}-${index}`}>
            <ListItem disableGutters>
              <ListItemText
                primary={item.productName}
                secondary={`Quantity: ${item.quantity}`}
              />
            </ListItem>
          </li>
        ))}
      </List>
    </>
  );
}

export default memo(OrderItemList);
