
import ProductCard, { type ProductItem } from "./ProductCard";

type ProductSectionProps = {
  title: string;
  products: ProductItem[];
  type?: "up" | "down" | "all";
  id?: string;
};

export default function ProductSection({
  title,
  products,
  type = "all",
  id,
}: ProductSectionProps) {
  const filteredProducts = products.filter((product) => {
    const raw = product.changePercent ?? product.change ?? 0;
    const change =
      typeof raw === "number"
        ? raw
        : Number.parseFloat(String(raw).replace(/,/g, "")) || 0;

    if (type === "up") return change > 0;
    if (type === "down") return change < 0;

    return true;
  });

  const sortedProducts = [...filteredProducts];

  if (type === "up") {
    sortedProducts.sort((a, b) => {
      const aChange = Number.parseFloat(
        String(a.changePercent ?? a.change ?? 0),
      ) || 0;
      const bChange = Number.parseFloat(
        String(b.changePercent ?? b.change ?? 0),
      ) || 0;

      return bChange - aChange;
    });
  }

  if (type === "down") {
    sortedProducts.sort((a, b) => {
      const aChange = Number.parseFloat(
        String(a.changePercent ?? a.change ?? 0),
      ) || 0;
      const bChange = Number.parseFloat(
        String(b.changePercent ?? b.change ?? 0),
      ) || 0;

      return aChange - bChange;
    });
  }

  const displayedProducts =
    type === "all" ? sortedProducts : sortedProducts.slice(0, 6);

  return (
    <section id={id} className="mx-auto max-w-[1200px] px-4 pt-6">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#26332a]">
        {type === "up" && (
          <span className="text-red-500">▲</span>
        )}
        {type === "down" && (
          <span className="text-emerald-600">▼</span>
        )}
        {title}
      </h2>

      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#e3ebe3] bg-[#fbfdfb] px-4 py-6 text-center text-xs text-[#788078]">
          এই মুহূর্তে কোনো পণ্যের দাম পরিবর্তনের তথ্য পাওয়া যায়নি।
        </div>
      )}
    </section>
  );
}