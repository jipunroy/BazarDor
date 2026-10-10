
import type { Category, Product } from "@/types";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor";

// API response-এর ধরন
type ApiProduct = {
  id: number | string;
  slug?: string;
  nameBn?: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit?: string;
  image?: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir?: "up" | "down" | "flat";
    pct?: number;
  };
  markets?: Product["markets"];
};

type ApiCategory = {
  id: string | number;
  slug?: string;
  nameBn?: string;
  icon?: string;
};

// API থেকে data আনা
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${url}`
    );
  }

  return response.json() as Promise<T>;
}

// API product-কে application-এর Product type-এ রূপান্তর
function normalizeProduct(item: ApiProduct): Product {
  const changePercent = Number(item.change?.pct ?? 0);

  return {
    id: item.id,
    slug: item.slug,
    name: item.nameBn ?? "নাম পাওয়া যায়নি",
    nameBn: item.nameBn,
    category: item.category,
    categoryNameBn: item.categoryNameBn,
    price: Number(item.today ?? 0),
    today: item.today,
    yesterday: item.yesterday,
    lastWeek: item.lastWeek,
    lastMonth: item.lastMonth,
    unit: item.unit,
    emoji: item.image ?? item.categoryIcon ?? "🛒",
    image: item.image,
    change: changePercent,
    changePercent,
    changeDirection: item.change?.dir ?? "flat",
    markets: item.markets ?? [],
  };
}

// API category-কে application-এর Category type-এ রূপান্তর
function normalizeCategory(item: ApiCategory): Category {
  return {
    id: item.id,
    slug: item.slug ?? String(item.id),
    name: item.nameBn ?? "অন্যান্য",
    nameBn: item.nameBn,
    icon: item.icon ?? "🛒",
  };
}

// সব products
export async function getProducts(): Promise<Product[]> {
  const data = await fetchJson<ApiProduct[]>(
    `${API_URL}/products`
  );

  return data.map(normalizeProduct);
}

// সব categories
export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<ApiCategory[]>(
    `${API_URL}/categories`
  );

  return data.map(normalizeCategory);
}

// নির্দিষ্ট category-এর products
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const data = await fetchJson<ApiProduct[]>(
    `${API_URL}/products?category=${encodeURIComponent(category)}`
  );

  return data.map(normalizeProduct);
}

// নির্দিষ্ট ID বা slug দিয়ে product খোঁজা
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

// নির্দিষ্ট slug দিয়ে category খোঁজা
export async function getCategory(
  slug: string
): Promise<Category | null> {
  const response = await fetch(
    `${API_URL}/categories/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Category API failed: ${response.status}`
    );
  }

  const data: ApiCategory = await response.json();

  return normalizeCategory(data);
}
