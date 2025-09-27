"use client";
import React, { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import OrderItemList from "./OrderItemList";
import OrderAddress from "./OrderAddress";

function OrderCard({ order }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            Order Date:{" "}
            {new Date(order.orderDate).toLocaleDateString("en-US")}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Status: {order.status}
          </Typography>
          <Typography variant="h6" color="primary">
            Total: ${order.totalAmount.toFixed(2)}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <OrderItemList items={order.orderItems} />
        <OrderAddress address={order.address} />
      </CardContent>
    </Card>
  );
}

export default memo(OrderCard);
