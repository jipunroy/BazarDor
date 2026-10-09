
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import PriceTicker from "./PriceTicker";
import type { Category, Product } from "@/types";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banglaDate, setBanglaDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

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

        setCategories(
          Array.isArray(categoryData)
            ? categoryData
            : categoryData.categories ?? []
        );

        setProducts(
          Array.isArray(productData)
            ? productData
            : productData.products ?? []
        );
      } catch (error) {
        console.error("Navbar data error:", error);
      }
    }

    loadData();
  }, []);

  function isActive(slug: string | number) {
    return pathname === `/category/${slug}`;
  }

  async function handleSignOut() {
    setLoggingOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("লগআউট করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      setMenuOpen(false);
      toast.success("সফলভাবে লগআউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoggingOut(false);
    }
  }

  function AuthLinks({ mobile = false }: { mobile?: boolean }) {
    if (isPending) {
      return (
        <span className="inline-block h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
      );
    }

    if (session) {
      return (
        <>
          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className={
              mobile
                ? "flex-1 rounded-lg border border-emerald-700 px-3 py-2 text-center text-sm text-emerald-800"
                : "rounded-lg border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            }
          >
            {session.user.name || "আমার অ্যাকাউন্ট"}
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={loggingOut}
            className={
              mobile
                ? "flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 disabled:opacity-60"
                : "rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:opacity-60"
            }
          >
            {loggingOut ? "অপেক্ষা করো..." : "লগআউট"}
          </button>
        </>
      );
    }

    return (
      <>
        <Link
          href="/signin"
          onClick={() => setMenuOpen(false)}
          className={
            mobile
              ? "flex-1 rounded-lg border border-emerald-700 px-3 py-2 text-center text-sm text-emerald-800"
              : "rounded-lg border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
          }
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          onClick={() => setMenuOpen(false)}
          className={
            mobile
              ? "flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-center text-sm text-white"
              : "rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          }
        >
          সাইন আপ
        </Link>
      </>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
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

          <div className="hidden items-center gap-3 sm:flex">
            <AuthLinks />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xl md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

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
              href={`/category/${category.slug ?? category.id}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(category.slug ?? category.id)
                  ? "bg-emerald-700 text-white"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              {category.icon || "🛒"} {category.name}
            </Link>
          ))}
        </nav>

        {menuOpen && (
          <nav className="flex flex-col gap-2 border-t border-gray-100 py-3 md:hidden">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2 ${
                pathname === "/" ? "bg-emerald-50 text-emerald-800" : ""
              }`}
            >
              সব পণ্য
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug ?? category.id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 ${
                  isActive(category.slug ?? category.id)
                    ? "bg-emerald-700 text-white"
                    : "hover:bg-emerald-50"
                }`}
              >
                {category.icon || "🛒"} {category.name}
              </Link>
            ))}

            <div className="mt-2 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
              <AuthLinks mobile />
            </div>
          </nav>
        )}
      </div>

      <PriceTicker products={products} />
    </header>
  );
}