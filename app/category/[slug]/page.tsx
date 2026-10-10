
import { notFound } from "next/navigation";

import { getCategory, getProductsByCategory } from "@/lib/api";
import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryProducts from "@/components/category/CategoryProducts";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(
    category.slug ?? slug
  );

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-7">
      <div className="mx-auto max-w-6xl">
        <CategoryHeader
          category={category}
          count={products.length}
        />

        <CategoryProducts products={products} />
      </div>
    </main>
  );
}
