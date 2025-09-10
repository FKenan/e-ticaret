import CategoryCard from "@/components/categories/categoryCard";
import { Box, Grid, Typography } from "@mui/material";

const categories = [
  { id: 1, name: "Elektronik", imageUrl: "https://placehold.co/600x400" },
  { id: 2, name: "Giyim", imageUrl: "https://placehold.co/600x400" },
  { id: 3, name: "Ev & Yaşam", imageUrl: "https://placehold.co/600x400" },
  { id: 4, name: "Kozmetik", imageUrl: "https://placehold.co/600x400" },
  { id: 5, name: "Kitap", imageUrl: "https://placehold.co/600x400" },
  { id: 6, name: "Spor", imageUrl: "https://placehold.co/600x400" },
];

export default function Page() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Categories
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Grid>
    </Box>
  );
}
