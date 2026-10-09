import type { Product } from "@/types";

type PriceTickerProps = {
  products: Product[];
};

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  if (!products.length) return null;

  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-emerald-100 bg-emerald-50">
      <div className="ticker-track flex w-max items-center">
        {items.map((product, index) => {
          const change = Number(
            product.changePercent ?? product.change ?? 0
          );

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex shrink-0 items-center gap-2 px-5 py-3 text-sm"
            >
              <span>{product.emoji || "🛒"}</span>

              <span className="font-medium text-gray-800">
                {product.name}
              </span>

              <span className="font-bold text-gray-900">
                {Number(product.price || 0).toLocaleString("bn-BD")} টাকা
              </span>

              <span
                className={
                  change > 0
                    ? "font-semibold text-emerald-700"
                    : change < 0
                      ? "font-semibold text-red-600"
                      : "text-gray-500"
                }
              >
                {change > 0 ? "▲" : change < 0 ? "▼" : "—"}
                {Math.abs(change).toLocaleString("bn-BD")}%
              </span>

              <span className="ml-3 text-emerald-200">•</span>
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