import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Paper, CardMedia } from "@mui/material";

export default function ProductCarousel({ items }) {
  if (!items || items.length === 0) {
    return (
      <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
        <CardMedia
          component="img"
          image="https://placehold.co/200x200"
          alt="No images available"
          loading="lazy"
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Paper>
    );
  }

  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      autoPlay={true}
      showThumbs={false}
      interval={5000}
    >
      {items.map((item, i) => (
        <Paper key={i} elevation={0} sx={{ backgroundColor: "transparent" }}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.alt}
            loading="lazy"
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Paper>
      ))}
    </Carousel>
  );
}
