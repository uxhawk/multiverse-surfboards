"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Breadcrumbs,
} from "@mui/material";
import { Category } from "../lib/data";

type CategoryPageContentProps = {
  category: Category;
};

export default function CategoryPageContent({
  category,
}: CategoryPageContentProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
        <Typography color="text.primary">{category.name}</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          {category.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore our complete {category.name.toLowerCase()} collection.
          {category.products.length} products available.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {category.products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.slug}>
            <Card
              sx={{
                height: "100%",
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              <CardActionArea
                component={Link}
                href={`/${category.slug}/${product.slug}`}
                sx={{ height: "100%" }}
              >
                <Box
                  sx={{
                    height: 200,
                    bgcolor: "grey.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Product Image
                  </Typography>
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
