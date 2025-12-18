import { notFound } from "next/navigation";
import CategoryPageContent from "../../../components/CategoryPageContent";
import {
  getCategoryBySlug,
  getAllCategoryPaths,
  menuData,
  type ParentMenu,
} from "../../../lib/data";

// Generate static params for all category pages
export async function generateStaticParams() {
  return getAllCategoryPaths();
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ parentMenu: ParentMenu; category: string }>;
}) {
  const { parentMenu, category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug, parentMenu);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const parentMenuLabel = menuData[parentMenu].label;

  return {
    title: `${category.name} | ${parentMenuLabel} | Multiverse Surfboards`,
    description: `Browse our ${category.name} collection within ${parentMenuLabel}. High-quality ${category.parentMenu} for surfers of all levels.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ parentMenu: ParentMenu; category: string }>;
}) {
  const { parentMenu, category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug, parentMenu);

  if (!category) {
    notFound();
  }

  return <CategoryPageContent category={category} />;
}
