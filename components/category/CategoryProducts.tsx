
"use client";

import { useMemo, useState } from "react";
import ProductCard, {
  type ProductItem,
} from "@/components/home/ProductCard";
import SortSelect from "./SortSelect";

type Props = {
  products: ProductItem[];
};

export default function CategoryProducts({ products }: Props) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-high") {
      result.sort(
        (a, b) => Number(a.price ?? 0) - Number(b.price ?? 0)
      );
    } else if (sort === "high-low") {
      result.sort(
        (a, b) => Number(b.price ?? 0) - Number(a.price ?? 0)
      );
    }

    return result;
  }, [products, sort]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#788078]">
          মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <SortSelect value={sort} onChange={setSort} />
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#dce7dc] bg-[#fbfdfb] px-5 py-12 text-center">
          <div className="text-3xl">🧺</div>
          <h2 className="mt-3 text-sm font-bold text-[#354337]">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-xs text-[#788078]">
            এই ক্যাটাগরিতে আপাতত কোনো পণ্যের তথ্য নেই।
          </p>
        </div>
      )}
    </div>
  );
}