"use client";

import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Category, ParentMenu, Product } from "../lib/data";

type ParentMenuPageContentProps = {
  parentMenu: ParentMenu;
  label: string;
  categories: Category[];
  products: Product[];
};

export default function ParentMenuPageContent({
  parentMenu,
  label,
  categories,
  products,
}: ParentMenuPageContentProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
        <Typography color="text.primary">{label}</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          {label}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore all {label.toLowerCase()} in one place. Browse categories or
          jump straight to the full collection.
        </Typography>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Shop by category
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.slug}>
              <Card
                sx={{
                  height: "100%",
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <CardActionArea
                  component={Link}
                  href={`/${category.slug}`}
                  sx={{ height: "100%" }}
                >
                  <Box
                    sx={{
                      height: 160,
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Category Image
                    </Typography>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.products.length} products
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          All {label}
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.slug}>
              <Card
                sx={{
                  height: "100%",
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <CardActionArea
                  component={Link}
                  href={`/${product.categorySlug}/${product.slug}`}
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
                      {product.category}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
