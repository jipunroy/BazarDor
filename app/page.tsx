
import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen pb-8">
      <Hero />

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
    </main>
  );
}