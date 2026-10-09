
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

async function ProductContent({ params }: Props) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProduct(slug);

  if (!product) notFound();

  const price = Number(product.price);
  const formattedPrice = Number.isFinite(price)
    ? price.toLocaleString("bn-BD", { maximumFractionDigits: 2 })
    : "তথ্য নেই";

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-medium text-[#07833f] hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>

        <section className="mt-5 rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-6 sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f5ef] text-4xl">
            {product.emoji || "🛒"}
          </div>

          <p className="mt-5 text-sm text-[#788078]">পণ্যের বিস্তারিত</p>
          <h1 className="mt-1 text-2xl font-extrabold text-[#26332a]">
            {product.name}
          </h1>

          <p className="mt-2 text-sm text-[#788078]">
            একক: {product.unit || "নির্ধারিত নয়"}
          </p>

          <div className="mt-6 rounded-xl bg-[#edf6ee] p-5">
            <p className="text-sm text-[#617263]">বর্তমান বাজারদর</p>
            <p className="mt-1 text-3xl font-extrabold text-[#07833f]">
              {formattedPrice} টাকা
            </p>
            <p className="mt-1 text-xs text-[#788078]">
              {product.unit ? `প্রতি ${product.unit}` : "প্রতি একক"}
            </p>
          </div>

          {product.description && (
            <div className="mt-6">
              <h2 className="text-base font-bold text-[#26332a]">পণ্যের বিবরণ</h2>
              <p className="mt-2 text-sm leading-6 text-[#788078]">
                {product.description}
              </p>
            </div>
          )}

          <p className="mt-6 text-xs leading-5 text-[#788078]">
            বাজারদর সময়ের সঙ্গে পরিবর্তিত হতে পারে। কেনাকাটার আগে স্থানীয়
            বাজারে দাম যাচাই করে নাও।
          </p>
        </section>
      </div>
    </main>
  );
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f1f6f1] px-4 py-8">
          <div className="mx-auto max-w-3xl animate-pulse rounded-2xl bg-[#e2ebe2] p-8">
            <div className="h-8 w-40 rounded bg-white/70" />
            <div className="mt-6 h-6 w-2/3 rounded bg-white/70" />
            <div className="mt-4 h-28 rounded-xl bg-white/70" />
          </div>
        </main>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}