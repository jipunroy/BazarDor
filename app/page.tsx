
import Hero from "@/components/home/Hero";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen pb-8">
      

      <Hero />

      <section
        id="আজকের-বাজার"
        className="mx-auto max-w-[1200px] px-4 pt-6"
      >
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#26332a]">
          <span className="text-red-500">▲</span>
          আজ দাম বেড়েছে
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-[#e2eae2] bg-[#fbfdfb] p-4"
            >
              <p className="text-sm font-semibold">{product.name}</p>
              <p className="mt-2 text-xs text-[#788078]">
                বর্তমান বাজারদর
              </p>
              <p className="mt-1 text-sm font-bold">
                {Number(product.price).toLocaleString("bn-BD")} টাকা
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pt-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#26332a]">
          <span className="text-emerald-600">▼</span>
          আজ দাম কমেছে
        </h2>

        <div className="rounded-xl border border-[#e2eae2] bg-[#fbfdfb] p-5 text-xs text-[#788078]">
          পরের Part-এ এখানে দাম কমেছে এমন পণ্যের কার্ড দেখানো হবে।
        </div>
      </section>

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-[1200px] px-4 pt-7"
      >
        <h2 className="mb-3 text-sm font-bold text-[#26332a]">
          সব পণ্য
        </h2>

        <div className="rounded-xl border border-[#e2eae2] bg-[#fbfdfb] p-5 text-xs text-[#788078]">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে।
          পরের Part-এ সম্পূর্ণ পণ্যের grid তৈরি করব।
        </div>
      </section>
    </main>
  );
}