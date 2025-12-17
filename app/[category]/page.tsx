import { notFound } from "next/navigation";
import { getCategoryBySlug, getAllCategories } from "../../lib/data";
import CategoryPageContent from "../../components/CategoryPageContent";

// Generate static params for all category pages
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} | Multiverse Surfboards`,
    description: `Browse our ${category.name} collection. High-quality ${category.parentMenu} for surfers of all levels.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return <CategoryPageContent category={category} />;
}
