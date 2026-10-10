
import type { Category, Product } from "@/types";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`BazarDor API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// API array বা object-এর ভেতরে array দিতে পারে।
function extractArray<T>(
  response: unknown,
  possibleKeys: string[]
): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const obj = response as Record<string, unknown>;

  for (const key of possibleKeys) {
    if (Array.isArray(obj[key])) {
      return obj[key] as T[];
    }
  }

  if (obj.data && typeof obj.data === "object") {
    return extractArray<T>(obj.data, possibleKeys);
  }

  return [];
}

type ApiProduct = {
  id?: number | string;
  _id?: string;
  slug?: string;
  name?: string;
  nameBn?: string;
  name_bn?: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image?: string;
  emoji?: string;
  unit?: string;
  today?: number | string;
  yesterday?: number | string;
  lastWeek?: number | string;
  lastMonth?: number | string;
  price?: number | string;
  change?: number | string | {
    dir?: "up" | "down" | "flat";
    pct?: number | string;
  };
  markets?: Product["markets"];
};

type ApiCategory = {
  id?: number | string;
  _id?: string;
  slug?: string;
  name?: string;
  nameBn?: string;
  name_bn?: string;
  icon?: string;
};

function normalizeProduct(item: ApiProduct): Product {
  const today = Number(item.today ?? item.price ?? 0);
  const yesterday = Number(item.yesterday ?? 0);

  const changePercent =
    typeof item.change === "object" && item.change !== null
      ? Number(item.change.pct ?? 0)
      : Number(item.change ?? 0);

  const direction =
    typeof item.change === "object" && item.change !== null
      ? item.change.dir
      : changePercent > 0
        ? "up"
        : changePercent < 0
          ? "down"
          : "flat";

  return {
    id: item.id ?? item._id ?? item.slug ?? "",
    slug: item.slug ?? String(item.id ?? item._id ?? ""),
    name: item.nameBn ?? item.name_bn ?? item.name ?? "নাম পাওয়া যায়নি",
    nameBn: item.nameBn ?? item.name_bn ?? item.name,
    category: item.category,
    categoryNameBn: item.categoryNameBn,
    price: today,
    today,
    yesterday,
    lastWeek: Number(item.lastWeek ?? 0),
    lastMonth: Number(item.lastMonth ?? 0),
    unit: item.unit,
    emoji: item.emoji ?? item.categoryIcon ?? "🛒",
    image: item.image,
    change: changePercent,
    changePercent,
    changeDirection: direction ?? "flat",
    markets: item.markets ?? [],
  };
}

function normalizeCategory(item: ApiCategory): Category {
  return {
    id: item.id ?? item._id ?? item.slug ?? "",
    slug: item.slug ?? String(item.id ?? item._id ?? ""),
    name: item.nameBn ?? item.name_bn ?? item.name ?? "অন্যান্য",
    nameBn: item.nameBn ?? item.name_bn ?? item.name,
    icon: item.icon ?? "🛒",
  };
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetchJson<unknown>(`${API_URL}/products`);
  const items = extractArray<ApiProduct>(response, [
    "products",
    "items",
    "results",
  ]);

  return items.map(normalizeProduct);
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetchJson<unknown>(`${API_URL}/categories`);
  const items = extractArray<ApiCategory>(response, [
    "categories",
    "items",
    "results",
  ]);

  return items.map(normalizeCategory);
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetchJson<unknown>(
    `${API_URL}/products?category=${encodeURIComponent(category)}`
  );

  const items = extractArray<ApiProduct>(response, [
    "products",
    "items",
    "results",
  ]);

  return items.map(normalizeProduct);
}

export async function getProduct(
  slugOrId: string
): Promise<Product | null> {
  const products = await getProducts();

  return (
    products.find(
      (product) =>
        product.slug === slugOrId ||
        String(product.id) === slugOrId
    ) ?? null
  );
}

export async function getCategory(
  slug: string
): Promise<Category | null> {
  const categories = await getCategories();

  return (
    categories.find(
      (category) =>
        category.slug === slug ||
        String(category.id) === slug
    ) ?? null
  );
}
