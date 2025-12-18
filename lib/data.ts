// Shared product data and helper functions

export type ParentMenu = "surfboards" | "hardware";

export interface Product {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  parentMenu: ParentMenu;
}

export interface Category {
  name: string;
  slug: string;
  parentMenu: ParentMenu;
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
          parentMenu: menuKey as ParentMenu,
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
        parentMenu: menuKey as ParentMenu,
        products: productNames.map((name: string) => ({
          name,
          slug: toSlug(name),
          category: categoryName,
          categorySlug,
          parentMenu: menuKey as ParentMenu,
        })),
      });
    }
  }

  return categories;
}

// Get a specific category by slug
export function getCategoryBySlug(
  slug: string,
  parentMenu?: ParentMenu
): Category | undefined {
  const categories = getAllCategories();
  const matchWithParent = categories.find(
    (cat) => cat.slug === slug && (!parentMenu || cat.parentMenu === parentMenu)
  );
  if (matchWithParent) return matchWithParent;
  // Fallback: allow resolving by slug even if parentMenu is mismatched/omitted
  return categories.find((cat) => cat.slug === slug);
}

// Get categories for a parent menu (surfboards or hardware)
export function getCategoriesByParentMenu(parentMenu: ParentMenu): Category[] {
  return getAllCategories().filter((cat) => cat.parentMenu === parentMenu);
}

// Get products for a parent menu (surfboards or hardware)
export function getProductsByParentMenu(parentMenu: ParentMenu): Product[] {
  return getAllProducts().filter(
    (product) => product.parentMenu === parentMenu
  );
}

// Get a specific product by category and product slug
export function getProductBySlug(
  categorySlug: string,
  productSlug: string,
  parentMenu?: ParentMenu
): Product | undefined {
  const category = getCategoryBySlug(categorySlug, parentMenu);
  if (!category) return undefined;
  return category.products.find((p) => p.slug === productSlug);
}

// Get all valid category slugs (for generateStaticParams)
export function getAllCategorySlugs(): string[] {
  return getAllCategories().map((cat) => cat.slug);
}

// Get all valid category/product slug combinations (for generateStaticParams)
export function getAllProductPaths(): {
  parentMenu: ParentMenu;
  category: string;
  product: string;
}[] {
  const paths: { parentMenu: ParentMenu; category: string; product: string }[] =
    [];

  for (const category of getAllCategories()) {
    for (const product of category.products) {
      paths.push({
        parentMenu: category.parentMenu,
        category: category.slug,
        product: product.slug,
      });
    }
  }

  return paths;
}

// Get all valid category paths (for generateStaticParams)
export function getAllCategoryPaths(): {
  parentMenu: ParentMenu;
  category: string;
}[] {
  return getAllCategories().map((category) => ({
    parentMenu: category.parentMenu,
    category: category.slug,
  }));
}
