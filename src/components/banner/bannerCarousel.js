import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const items = [
  {
    name: "Yeni Sezon Saatler",
    description: "Şıklığınızı tamamlayacak en yeni saat modelleri.",
    image: "https://placehold.co/600x400.png",
  },
  {
    name: "Rahat ve Şık Ayakkabılar",
    description: "Her adıma konfor katan ayakkabı koleksiyonumuzu keşfedin.",
    image: "https://placehold.co/600x400.png",
  },
  {
    name: "Tarzınızı Yansıtan Çantalar",
    description: "Fonksiyonel ve modern çanta modelleri.",
    image: "https://placehold.co/600x400.png",
  },
];

const overlayStyles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  color: "primary.contrastText",
  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
  paddingBottom: 4,
};

function BannerCarousel() {
  return (
    <Carousel
      showArrows
      infiniteLoop
      autoPlay
      showThumbs={false}
      interval={5000}
    >
      {items.map((item, i) => (
        <Paper
          key={item.name}
          elevation={0}
          sx={{ height: "400px", position: "relative" }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
            priority={i === 0}
          />
          <Box sx={overlayStyles}>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="body1">{item.description}</Typography>
          </Box>
        </Paper>
      ))}
    </Carousel>
  );
}

export default React.memo(BannerCarousel);

