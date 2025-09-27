"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  getOrders,
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
} from "@/store/slices/orderSlice";
import { selectUserInfo } from "@/store/slices/userSlice";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import OrderCard from "@/components/profile/orders/orderCard";

const OrdersPage = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(getOrders(userInfo.id));
    }
  }, [dispatch, userInfo]);

  if (!userInfo) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography>Siparişlerinizi görmek için lütfen giriş yapın.</Typography>
      </Box>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Siparişler yüklenirken bir hata oluştu.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Siparişlerim
      </Typography>
      {orders.length === 0 ? (
        <Typography>Henüz hiç siparişiniz bulunmuyor.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order, index) => (
            <OrderCard key={`${order.id}-${index}`} order={order} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default OrdersPage;
