
import type { Product } from "@/types";

type PriceTickerProps = {
  products: Product[];
};

function toBengaliNumber(value: number) {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  if (!products.length) return null;

  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-emerald-100 bg-emerald-50">
      <div className="ticker-track flex w-max items-center">
        {items.map((product, index) => {
          const rawChange = Number(
            product.changePercent ?? product.change ?? 0
          );

          const change = Number.isFinite(rawChange)
            ? rawChange
            : 0;

          const direction =
            product.changeDirection ??
            (change > 0
              ? "up"
              : change < 0
                ? "down"
                : "flat");

          const isUp = direction === "up";
          const isDown = direction === "down";

          const price = Number(
            product.today ?? product.price
          );

          const name =
            product.nameBn ?? product.name ?? "পণ্য";

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex shrink-0 items-center gap-2 px-5 py-3 text-sm"
            >
              <span>
                {product.image ?? product.emoji ?? "🛒"}
              </span>

              <span className="font-medium text-gray-800">
                {name}
              </span>

              <span className="font-bold text-gray-900">
                {Number.isFinite(price)
                  ? `${toBengaliNumber(price)} টাকা`
                  : "দাম পাওয়া যায়নি"}
              </span>

              <span
                className={
                  isUp
                    ? "font-semibold text-red-600"
                    : isDown
                      ? "font-semibold text-emerald-700"
                      : "font-semibold text-gray-500"
                }
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}
                {toBengaliNumber(Math.abs(change))}%
              </span>

              <span className="ml-3 text-emerald-200">
                •
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker-scroll 45s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
