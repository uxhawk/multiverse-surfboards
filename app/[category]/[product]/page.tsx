import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getAllProductPaths,
  getCategoryBySlug,
} from "../../../lib/data";
import ProductPageContent from "../../../components/ProductPageContent";

// Generate static params for all product pages
export async function generateStaticParams() {
  return getAllProductPaths();
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | ${product.category} | Multiverse Surfboards`,
    description: `The ${product.name} from our ${product.category} collection. Premium quality ${product.parentMenu} from Multiverse Surfboards.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || !category) {
    notFound();
  }

  return <ProductPageContent category={category} product={product} />;
}
