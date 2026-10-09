
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getCategories,
  getProductsByCategory,
} from "@/lib/api";
import CategoryProducts from "@/components/category/CategoryProducts";
import EmptyState from "@/components/shared/EmptyState";

type Props = {
  params: Promise<{ slug: string }>;
};

async function CategoryContent({ params }: Props) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  const category = categories.find(
    (item) => String(item.id) === slug || item.slug === slug
  );

  if (!category) notFound();

  return (
    <main className="min-h-screen pb-12">
      <div className="mx-auto max-w-[1200px] px-4 pt-7">
        <Link
          href="/"
          className="text-xs text-[#07833f] hover:underline"
        >
          ← হোম পেজ
        </Link>

        <header className="mt-4 rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-5 sm:p-7">
          <p className="text-xs text-[#788078]">ক্যাটাগরি</p>

          <h1 className="mt-2 text-2xl font-extrabold text-[#26332a]">
            {category.icon ?? "🛒"} {category.name}
          </h1>

          <p className="mt-2 text-sm text-[#788078]">
            এই ক্যাটাগরির পণ্যের বাজারদর দেখুন।
          </p>
        </header>

        <section className="pt-6">
          <h2 className="mb-4 text-sm font-bold text-[#26332a]">
            {category.name} — সব পণ্য
          </h2>

          {products.length > 0 ? (
            <CategoryProducts products={products} />
          ) : (
            <EmptyState
              title="এই ক্যাটাগরিতে পণ্য নেই"
              description="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।"
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto min-h-screen max-w-[1200px] px-4 py-10">
          <div className="h-28 animate-pulse rounded-2xl bg-[#e5eee5]" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl bg-[#e5eee5]"
              />
            ))}
          </div>
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}