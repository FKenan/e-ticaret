"use client";
import {
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../store/slices/wishlistSlice";

export default function WishlistItemCard({ product }) {
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    dispatch(removeFromWishlist(product.id));
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Link
        href={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
            height: "100%",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            },
          }}
        >
          <CardMedia
            component="img"
            loading="lazy"
            sx={{
              width: 100,
              height: 100,
              objectFit: "contain",
              marginRight: 2,
            }}
            image={product.image}
            alt={product.name}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              textAlign: "left",
              width: "100%",
              height: "100%",
              padding: "8px 0",
              "&:last-child": {
                paddingBottom: "8px",
              },
            }}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              fontWeight="bold"
            >
              {product.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: 1,
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight="bold"
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ whiteSpace: "nowrap" }}
                onClick={handleRemoveFromWishlist}
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Link>
    </Grid>
  );
}
