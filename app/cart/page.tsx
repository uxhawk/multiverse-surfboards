import Link from "next/link";
import { Breadcrumbs } from "@mui/material";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900">
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumbs aria-label="breadcrumb" className="text-sm text-zinc-600">
          <Link
            href="/"
            className="text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Home
          </Link>
          <span className="text-zinc-900">Cart</span>
        </Breadcrumbs>

        <h1 className="text-3xl font-semibold">Cart</h1>
        <p className="text-lg text-zinc-600">
          Your cart is empty. Add products to review them here before checkout.
        </p>
      </div>
    </main>
  );
}
