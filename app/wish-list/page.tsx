"use client";

import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";

export default function WishListPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900">
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Typography color="text.primary">Wish list</Typography>
        </Breadcrumbs>

        <h1 className="text-3xl font-semibold">Wish list</h1>
        <p className="text-lg text-zinc-600">
          You have not saved any items yet. Browse products and tap the heart to
          keep track of boards you love.
        </p>
      </div>
    </main>
  );
}
