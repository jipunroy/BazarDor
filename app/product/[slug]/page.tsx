
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatPrice(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "তথ্য নেই";
  }

  const price = Number(value);

  return Number.isFinite(price)
    ? `${price.toLocaleString("bn-BD")} টাকা`
    : "তথ্য নেই";
}

function getChange(value: unknown): number {
  const parsed = Number(
    String(value ?? 0).replace(/,/g, "").replace(/%/g, "").trim()
  );

  return Number.isFinite(parsed) ? parsed : 0;
}

export default async function ProductDetailsPage({
  params,
}: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const change = getChange(
    product.changePercent ?? product.change
  );

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-xs text-[#07833f] hover:underline"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        <article className="mt-5 rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-5 sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf5ed] text-4xl">
            {product.emoji || "🛒"}
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-[#26332a]">
            {product.name}
          </h1>

          <p className="mt-2 text-sm text-[#788078]">
            {product.unit || "একক উল্লেখ নেই"}
          </p>

          <div className="mt-6 rounded-xl bg-[#edf6ee] p-5">
            <p className="text-xs text-[#657467]">
              বর্তমান বাজারদর
            </p>

            <p className="mt-2 text-3xl font-extrabold text-[#07833f]">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-[#e3ebe3] p-4">
            <p className="text-xs text-[#788078]">
              দামের পরিবর্তন
            </p>

            <p
              className={`mt-2 text-sm font-semibold ${
                change > 0
                  ? "text-red-500"
                  : change < 0
                    ? "text-emerald-700"
                    : "text-gray-500"
              }`}
            >
              {change > 0
                ? `▲ ${change.toLocaleString("bn-BD")}% দাম বেড়েছে`
                : change < 0
                  ? `▼ ${Math.abs(change).toLocaleString("bn-BD")}% দাম কমেছে`
                  : "দামের পরিবর্তনের তথ্য নেই"}
            </p>
          </div>

          {product.description && (
            <div className="mt-6 border-t border-[#e3ebe3] pt-5">
              <h2 className="font-bold text-[#26332a]">
                পণ্যের বিবরণ
              </h2>

              <p className="mt-2 text-sm leading-7 text-[#687268]">
                {product.description}
              </p>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}