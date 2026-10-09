
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/api";
import ProductSection from "@/components/home/ProductSection";

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
        <Link href="/" className="text-xs text-[#07833f] hover:underline">
          ← হোম পেজ
        </Link>

        <header className="mt-4 rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-5 sm:p-7">
          <p className="text-xs text-[#788078]">ক্যাটাগরি</p>

          <h1 className="mt-2 text-2xl font-extrabold text-[#26332a]">
            {category.icon ?? "🛒"} {category.name}
          </h1>

          <p className="mt-2 text-sm text-[#788078]">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
          </p>
        </header>
      </div>

      <ProductSection
        title={`${category.name} — সব পণ্য`}
        products={products}
        type="all"
        id="সব-পণ্য"
      />
    </main>
  );
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto min-h-screen max-w-[1200px] px-4 py-10">
          <div className="h-28 animate-pulse rounded-2xl bg-[#e5eee5]" />
          <div className="mt-5 h-40 animate-pulse rounded-2xl bg-[#e5eee5]" />
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}