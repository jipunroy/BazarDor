
import Link from "next/link";
import type { Product } from "@/types";

function toBengaliNumber(value: number) {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const price = Number(product.today ?? product.price);
  const rawChange = Number(
    product.changePercent ?? product.change ?? 0
  );

  const change = Number.isFinite(rawChange) ? rawChange : 0;

  const direction =
    product.changeDirection ??
    (change > 0 ? "up" : change < 0 ? "down" : "flat");

  const isUp = direction === "up";
  const isDown = direction === "down";

  const productName =
    product.nameBn ?? product.name ?? "পণ্যের নাম নেই";

  const productUrl = product.slug ?? String(product.id);

  const unitLabels: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    piece: "প্রতি পিস",
    dozen: "ডজন",
  };

  const unit = product.unit
    ? unitLabels[product.unit] ?? product.unit
    : "একক উল্লেখ নেই";

  return (
    <Link
      href={`/product/${productUrl}`}
      className="group block rounded-xl border border-[#e3ebe3] bg-[#fbfdfb] p-3 transition hover:border-[#b9d9c1] hover:shadow-sm sm:p-3.5"
    >
      <div className="flex items-start gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0f5ef] text-xl">
          {product.image ?? product.emoji ?? "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-xs font-bold text-[#29362c] group-hover:text-[#07833f] sm:text-sm">
            {productName}
          </h3>

          <p className="mt-0.5 text-[10px] text-[#879087]">
            {unit}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-[#858e85]">
            আজকের বাজার দর
          </p>

          <p className="mt-0.5 text-sm font-extrabold text-[#26332a]">
            {Number.isFinite(price)
              ? `${toBengaliNumber(price)} টাকা`
              : "দামের তথ্য নেই"}
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
