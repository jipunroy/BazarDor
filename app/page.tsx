import { getCategories, getProducts } from "@/lib/api";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-bold">বাজার দর</h1>

      <p className="mt-2 text-gray-500">
        বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Categories</h2>

        <pre className="mt-4 overflow-auto rounded-lg bg-base-200 p-4">
          {JSON.stringify(categories, null, 2)}
        </pre>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Products ({products.length})
        </h2>

        <pre className="mt-4 overflow-auto rounded-lg bg-base-200 p-4">
          {JSON.stringify(products.slice(0, 3), null, 2)}
        </pre>
      </div>
    </main>
  );
}