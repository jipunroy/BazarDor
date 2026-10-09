"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PriceTicker from "./PriceTicker";
import type { Category, Product } from "@/types";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

export default function Navbar() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banglaDate, setBanglaDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setBanglaDate(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );

    async function loadData() {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/products`),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Failed to load navbar data");
        }

        const [categoryData, productData] = await Promise.all([
          categoryResponse.json(),
          productResponse.json(),
        ]);

        setCategories(categoryData);
        setProducts(productData);
      } catch (error) {
        console.error("Navbar data error:", error);
      }
    }

    loadData();
  }, []);

  function isActive(slug: string) {
    return pathname === `/category/${slug}`;
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main navbar */}
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর"
              width={48}
              height={48}
              priority
              className="h-11 w-11 object-contain"
            />

            <div>
              <h1 className="text-xl font-bold text-emerald-800 sm:text-2xl">
                বাজার দর
              </h1>

              <p className="text-xs text-gray-500">
                {banglaDate || "বাংলাদেশের বাজার"}
              </p>
            </div>
          </Link>

          {/* Desktop auth buttons */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/signin"
              className="rounded-lg border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              সাইন আপ
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xl sm:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Category navigation */}
        <nav className="hidden items-center gap-2 overflow-x-auto border-t border-gray-100 py-3 md:flex">
          <Link
            href="/"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              pathname === "/"
                ? "bg-emerald-700 text-white"
                : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            সব পণ্য
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(category.id)
                  ? "bg-emerald-700 text-white"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              {category.icon || "🛒"} {category.name}
            </Link>
          ))}
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav className="flex flex-col gap-2 border-t border-gray-100 py-3 md:hidden">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-emerald-50"
            >
              সব পণ্য
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 ${
                  isActive(category.id)
                    ? "bg-emerald-700 text-white"
                    : "hover:bg-emerald-50"
                }`}
              >
                {category.icon || "🛒"} {category.name}
              </Link>
            ))}

            <div className="mt-2 flex gap-2 border-t border-gray-100 pt-3 sm:hidden">
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg border border-emerald-700 px-3 py-2 text-center text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-center text-sm text-white"
              >
                সাইন আপ
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Price ticker */}
      <PriceTicker products={products} />
    </header>
  );
}