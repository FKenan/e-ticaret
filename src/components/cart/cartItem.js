import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";

export default function CartItem({
  item,
  handleUpdateQuantity,
  handleRemoveItem,
}) {
  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 2 }}>
          <CardMedia
            sx={{
              height: 80,
              width: 80,
              backgroundSize: "contain",
              borderRadius: 1,
            }}
          >
            <Image
              src={item.image || "https://placehold.co/600x400.png"}
              alt={item.productName}
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </CardMedia>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {item.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price.toFixed(2)}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Box display="flex" alignItems="center">
            <IconButton
              size="small"
              onClick={() => handleRemoveItem(item.productId, 1)}
            >
              <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
            <IconButton
              size="small"
              onClick={() => handleUpdateQuantity(item.productId, 1)}
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }} textAlign="right">
          <Typography variant="h6" component="p">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleRemoveItem(item.productId, item.quantity)}
            title="Remove item"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
}
