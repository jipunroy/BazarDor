
import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types";

export default async function HomePage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Home products API error:", error);
  }

  return (
    <main className="min-h-screen pb-8">
      <Hero />

      {products.length > 0 ? (
        <>
          <ProductSection
            title="আজ দাম বেড়েছে"
            products={products}
            type="up"
            id="আজকের-বাজার"
          />

          <ProductSection
            title="আজ দাম কমেছে"
            products={products}
            type="down"
          />

          <ProductSection
            title="সব পণ্য"
            products={products}
            type="all"
            id="সব-পণ্য"
          />
        </>
      ) : (
        <section
          id="সব-পণ্য"
          className="mx-auto max-w-6xl px-4 py-12 text-center"
        >
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-3xl">🛒</p>
            <h2 className="mt-3 text-xl font-bold">
              বাজারদরের তথ্য এখন পাওয়া যাচ্ছে না
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              কিছুক্ষণ পর আবার চেষ্টা করো।
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
