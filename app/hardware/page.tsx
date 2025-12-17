import ParentMenuPageContent from "../../components/ParentMenuPageContent";
import {
  getCategoriesByParentMenu,
  getProductsByParentMenu,
  menuData,
} from "../../lib/data";

export const metadata = {
  title: "Hardware | Multiverse Surfboards",
  description:
    "Explore all Multiverse hardware categories and products in one view.",
};

export default async function HardwarePage() {
  const categories = getCategoriesByParentMenu("hardware");
  const products = getProductsByParentMenu("hardware");

  return (
    <ParentMenuPageContent
      parentMenu="hardware"
      label={menuData.hardware.label}
      categories={categories}
      products={products}
    />
  );
}
