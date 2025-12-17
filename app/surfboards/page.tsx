import ParentMenuPageContent from "../../components/ParentMenuPageContent";
import {
  getCategoriesByParentMenu,
  getProductsByParentMenu,
  menuData,
} from "../../lib/data";

export const metadata = {
  title: "Surfboards | Multiverse Surfboards",
  description:
    "Browse all Multiverse surfboards by category and see every model in one place.",
};

export default async function SurfboardsPage() {
  const categories = getCategoriesByParentMenu("surfboards");
  const products = getProductsByParentMenu("surfboards");

  return (
    <ParentMenuPageContent
      parentMenu="surfboards"
      label={menuData.surfboards.label}
      categories={categories}
      products={products}
    />
  );
}
