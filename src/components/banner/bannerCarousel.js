import { Box, Paper, Typography } from "@mui/material";
import React from "react";
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

function BannerCarousel() {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      autoPlay={true}
      showThumbs={false}
      interval={5000}
    >
      {items.map((item, i) => (
        <Paper key={i} elevation={0} sx={{ height: "400px", position: 'relative' }}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
            priority={i === 0}
          />
          <Box
            sx={{
              position: 'absolute',
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "white",
              textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
              paddingBottom: 4
            }}
          >
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="body1">{item.description}</Typography>
          </Box>
        </Paper>
      ))}
    </Carousel>
  );
}

export default React.memo(BannerCarousel);