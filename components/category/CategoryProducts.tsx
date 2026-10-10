
"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import ProductCard from "@/components/home/ProductCard";
import SortSelect from "./SortSelect";

type CategoryProductsProps = {
  products: Product[];
};

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-high") {
      result.sort(
        (a, b) =>
          Number(a.today ?? a.price ?? 0) -
          Number(b.today ?? b.price ?? 0)
      );
    } else if (sort === "high-low") {
      result.sort(
        (a, b) =>
          Number(b.today ?? b.price ?? 0) -
          Number(a.today ?? a.price ?? 0)
      );
    }

    return result;
  }, [products, sort]);

  if (!products.length) {
    return (
      <div className="rounded-xl border border-dashed border-[#d5e2d5] bg-white px-5 py-12 text-center">
        <div className="text-4xl">🛒</div>
        <h2 className="mt-3 font-bold text-[#29362c]">
          এই ক্যাটাগরিতে কোনো পণ্য নেই
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          অন্য ক্যাটাগরি থেকে পণ্য দেখুন।
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
