"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Category, Product } from "../lib/data";

type ProductPageContentProps = {
  category: Category;
  product: Product;
};

export default function ProductPageContent({
  category,
  product,
}: ProductPageContentProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
        <Link
          href={`/${category.slug}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {category.name}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Button
        component={Link}
        href={`/${category.slug}`}
        startIcon={<ArrowBack />}
        sx={{ mb: 3 }}
      >
        Back to {category.name}
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: 400,
              bgcolor: "grey.100",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Product Image
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Chip
              label={category.name}
              size="small"
              sx={{ mb: 2 }}
              component={Link}
              href={`/${category.slug}`}
              clickable
            />

            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              {product.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              The {product.name} is part of our acclaimed {category.name}{" "}
              collection. Designed for surfers who demand the best performance
              and quality in their {product.parentMenu}.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                $XXX.XX
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Free shipping on orders over $100
              </Typography>
            </Box>

            <Button variant="contained" size="large" fullWidth sx={{ mb: 2 }}>
              Add to Cart
            </Button>

            <Button variant="outlined" size="large" fullWidth>
              Add to Wishlist
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Product Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Box>
    </Container>
  );
}
