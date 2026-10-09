
import Link from "next/link";

export type ProductItem = {
  id: number | string;
  name: string;
  category?: string;
  price?: number | string;
  unit?: string;
  change?: number | string;
  changePercent?: number | string;
  emoji?: string;
};


function getChange(product: ProductItem): number {
  const raw = product.changePercent ?? product.change ?? 0;

  if (typeof raw === "number") {
    return Number.isFinite(raw) ? raw : 0;
  }

  const value = Number.parseFloat(
    String(raw).replace(/,/g, "").replace(/%/g, "").trim()
  );

  return Number.isFinite(value) ? value : 0;
}

function toBengaliNumber(value: number) {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

export default function ProductCard({
  product,
}: {
  product: ProductItem;
}) {
  const change = getChange(product);
  const isUp = change > 0;
  const isDown = change < 0;
  const price = Number(product.price);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-xl border border-[#e3ebe3] bg-[#fbfdfb] p-3 transition hover:border-[#b9d9c1] hover:shadow-sm sm:p-3.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0f5ef] text-xl">
            {product.emoji || "🛒"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-xs font-bold text-[#29362c] group-hover:text-[#07833f] sm:text-sm">
              {product.name}
            </h3>
            <p className="mt-0.5 text-[10px] text-[#879087]">
              {product.unit || "প্রতি কেজি"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-[#858e85]">বর্তমান বাজার দর</p>
          <p className="mt-0.5 text-sm font-extrabold text-[#26332a]">
            {Number.isFinite(price)
              ? `${toBengaliNumber(price)} টাকা`
              : "তথ্য নেই"}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
            isUp
              ? "bg-[#fff0ef] text-[#df5148]"
              : isDown
                ? "bg-[#e8f7eb] text-[#168343]"
                : "bg-[#f0f2f0] text-[#737b73]"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {toBengaliNumber(Math.abs(change))}%
        </span>
      </div>
    </Link>
  );
}