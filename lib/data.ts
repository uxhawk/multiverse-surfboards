// Shared product data and helper functions

export interface Product {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  parentMenu: "surfboards" | "hardware";
}

export interface Category {
  name: string;
  slug: string;
  parentMenu: "surfboards" | "hardware";
  products: Product[];
}

// Helper to convert names to URL-friendly slugs
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Raw menu data structure
export const menuData = {
  surfboards: {
    label: "Surfboards",
    categories: {
      "Charger Series": [
        "Event Horizon",
        "Quasar",
        "Gamma Ray Burst",
        "Super Nova",
      ],
      "Performer Series": ["Eclipse", "Boson", "Dark Matter", "Singularity"],
      "Daily Driver Series": ["Worm Hole", "Quark", "Electron", "Interstellar"],
      "Longboard Series": [
        "Cosmic Microwave Background",
        "Spiral Galaxy",
        "Terraform",
        "Neutrino",
      ],
    },
  },
  hardware: {
    label: "Hardware",
    categories: {
      Grips: ["Graviton", "Nebula", "Asteroid", "Meteor", "Crater", "Flux"],
      Fins: [
        "Atoms",
        "Nucleus",
        "Ionosphere",
        "Plasma",
        "Flare",
        "Corona",
        "Aurora",
        "Zenith",
        "Apex",
        "Vector",
        "Comet",
        "Photon",
      ],
      Leashes: ["Equinox", "Satellite", "Constellation", "Orbit"],
    },
  },
} as const;

// Build flat list of all products
export function getAllProducts(): Product[] {
  const products: Product[] = [];

  for (const [menuKey, menuValue] of Object.entries(menuData)) {
    for (const [categoryName, productNames] of Object.entries(
      menuValue.categories
    )) {
      for (const productName of productNames) {
        products.push({
          name: productName,
          slug: toSlug(productName),
          category: categoryName,
          categorySlug: toSlug(categoryName),
          parentMenu: menuKey as "surfboards" | "hardware",
        });
      }
    }
  }

  return products;
}

// Build list of all categories
export function getAllCategories(): Category[] {
  const categories: Category[] = [];

  for (const [menuKey, menuValue] of Object.entries(menuData)) {
    for (const [categoryName, productNames] of Object.entries(
      menuValue.categories
    )) {
      const categorySlug = toSlug(categoryName);
      categories.push({
        name: categoryName,
        slug: categorySlug,
        parentMenu: menuKey as "surfboards" | "hardware",
        products: productNames.map((name) => ({
          name,
          slug: toSlug(name),
          category: categoryName,
          categorySlug,
          parentMenu: menuKey as "surfboards" | "hardware",
        })),
      });
    }
  }

  return categories;
}

// Get a specific category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((cat) => cat.slug === slug);
}

// Get a specific product by category and product slug
export function getProductBySlug(
  categorySlug: string,
  productSlug: string
): Product | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.products.find((p) => p.slug === productSlug);
}

// Get all valid category slugs (for generateStaticParams)
export function getAllCategorySlugs(): string[] {
  return getAllCategories().map((cat) => cat.slug);
}

// Get all valid category/product slug combinations (for generateStaticParams)
export function getAllProductPaths(): { category: string; product: string }[] {
  const paths: { category: string; product: string }[] = [];

  for (const category of getAllCategories()) {
    for (const product of category.products) {
      paths.push({
        category: category.slug,
        product: product.slug,
      });
    }
  }

  return paths;
}
