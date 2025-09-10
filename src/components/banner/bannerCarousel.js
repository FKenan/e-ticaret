import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

export default function BannerCarousel() {
  const items = [
    {
      name: "Yeni Sezon Saatler",
      description: "Şıklığınızı tamamlayacak en yeni saat modelleri.",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Rahat ve Şık Ayakkabılar",
      description: "Her adıma konfor katan ayakkabı koleksiyonumuzu keşfedin.",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Tarzınızı Yansıtan Çantalar",
      description: "Fonksiyonel ve modern çanta modelleri.",
      image: "https://placehold.co/600x400",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Paper key={i} elevation={0} sx={{ height: "400px", p: 3 }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "white",
              textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
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
