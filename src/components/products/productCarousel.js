import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

export default function ProductCarousel({ items }) {
  return (
    <Carousel>
      {items.map((item, i) => (
        <Paper key={i} elevation={0} sx={{ backgroundColor: "transparent" }}>
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Paper>
      ))}
    </Carousel>
  );
}
