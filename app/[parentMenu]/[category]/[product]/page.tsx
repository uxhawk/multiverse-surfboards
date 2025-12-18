import { notFound } from "next/navigation";
import ProductPageContent from "../../../../components/ProductPageContent";
import {
  getProductBySlug,
  getAllProductPaths,
  getCategoryBySlug,
  menuData,
  type ParentMenu,
} from "../../../../lib/data";

// Generate static params for all product pages
export async function generateStaticParams() {
  return getAllProductPaths();
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    parentMenu: ParentMenu;
    category: string;
    product: string;
  }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const parentMenuLabel = menuData[product.parentMenu].label;
  const categoryName = category?.name ?? product.category;

  return {
    title: `${product.name} | ${categoryName} | ${parentMenuLabel} | Multiverse Surfboards`,
    description: `The ${product.name} from our ${categoryName} collection in ${parentMenuLabel}. Premium quality ${product.parentMenu} from Multiverse Surfboards.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    parentMenu: ParentMenu;
    category: string;
    product: string;
  }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || !category) {
    notFound();
  }

  return <ProductPageContent category={category} product={product} />;
}
