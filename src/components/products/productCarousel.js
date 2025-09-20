import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Paper } from "@mui/material";

export default function ProductCarousel({ items }) {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
    >
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
