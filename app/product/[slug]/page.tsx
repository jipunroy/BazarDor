
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";

import { getProduct } from "@/lib/api";
import { auth } from "@/lib/auth";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function bengaliNumber(value: number) {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

async function ProductDetails({
  slug,
}: {
  slug: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProduct(slug);

  if (!product) notFound();

  const today = Number(product.today ?? product.price);
  const yesterday = Number(product.yesterday ?? 0);
  const lastWeek = Number(product.lastWeek ?? 0);
  const lastMonth = Number(product.lastMonth ?? 0);

  const change = Number(
    product.changePercent ?? product.change ?? 0
  );

  const direction =
    product.changeDirection ??
    (change > 0 ? "up" : change < 0 ? "down" : "flat");

  const isUp = direction === "up";
  const isDown = direction === "down";

  const unitNames: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    piece: "প্রতি পিস",
    dozen: "ডজন",
  };

  const unit = product.unit
    ? unitNames[product.unit] ?? product.unit
    : "";

  const priceHistory = [
    { label: "আজকের দাম", price: today },
    { label: "গতকালের দাম", price: yesterday },
    { label: "গত সপ্তাহের দাম", price: lastWeek },
    { label: "গত মাসের দাম", price: lastMonth },
  ];

  const markets = product.markets ?? [];

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-700 hover:underline"
        >
          ← হোম পেজে ফিরে যাও
        </Link>

        <section className="mt-5 rounded-2xl border border-[#e1eae1] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#eff6ef] text-5xl">
              {product.image ?? product.emoji ?? "🛒"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-emerald-700">
                {product.categoryNameBn ?? product.category ?? "বাজার পণ্য"}
              </p>

              <h1 className="mt-1 text-2xl font-extrabold text-[#26332a] sm:text-3xl">
                {product.nameBn ?? product.name}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                একক: {unit || "উল্লেখ নেই"}
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-xl bg-[#f4f8f3] p-5">
            <p className="text-sm text-gray-600">
              আজকের বাজার দর
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <p className="text-3xl font-extrabold text-[#26332a]">
                {bengaliNumber(today)} টাকা
              </p>

              <span
                className={`rounded-full px-3 py-1 text-sm font-bold ${
                  isUp
                    ? "bg-red-50 text-red-600"
                    : isDown
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {bengaliNumber(Math.abs(change))}%
              </span>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-[#26332a]">
            দামের তুলনা
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {priceHistory.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#e1eae1] bg-white p-4"
              >
                <p className="text-xs text-gray-500">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-bold text-[#26332a]">
                  {bengaliNumber(item.price)} টাকা
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  / {unit || "একক"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-lg font-bold text-[#26332a]">
              বিভিন্ন বাজারের দাম
            </h2>
            <p className="text-xs text-gray-500">
              মোট {bengaliNumber(markets.length)}টি বাজার
            </p>
          </div>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-[#e1eae1] bg-white">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-[#edf5ed] text-[#405444]">
                  <tr>
                    <th className="px-4 py-3">বাজার</th>
                    <th className="px-4 py-3">বিভাগ</th>
                    <th className="px-4 py-3">সর্বনিম্ন</th>
                    <th className="px-4 py-3">সর্বোচ্চ</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-gray-100"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {market.market}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {market.division}
                      </td>
                      <td className="px-4 py-3 font-semibold text-emerald-700">
                        {bengaliNumber(market.min)} টাকা
                      </td>
                      <td className="px-4 py-3 font-semibold text-red-600">
                        {bengaliNumber(market.max)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-xl bg-white p-5 text-sm text-gray-500">
              বাজারের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f1f6f1] p-6">
          <div className="mx-auto max-w-5xl animate-pulse space-y-4">
            <div className="h-48 rounded-2xl bg-[#e1eae1]" />
            <div className="h-28 rounded-xl bg-[#e1eae1]" />
            <div className="h-64 rounded-xl bg-[#e1eae1]" />
          </div>
        </main>
      }
    >
      <ProductDetails slug={slug} />
    </Suspense>
  );
}
