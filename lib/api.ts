
import type { Category, Product } from "@/types";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchJson<Product[] | { products?: Product[] }>(
    `${API_URL}/products`
  );

  return Array.isArray(data) ? data : data.products ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<Category[] | { categories?: Category[] }>(
    `${API_URL}/categories`
  );

  return Array.isArray(data) ? data : data.categories ?? [];
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const data = await fetchJson<Product[] | { products?: Product[] }>(
    `${API_URL}/products?category=${encodeURIComponent(category)}`
  );

  return Array.isArray(data) ? data : data.products ?? [];
}

export async function getProduct(
  id: string
): Promise<Product | null> {
  const response = await fetch(
    `${API_URL}/products/${encodeURIComponent(id)}`,
    { next: { revalidate: 60 } }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`);
  }

  const data = await response.json();

  return data.product ?? data;
}

export async function getCategory(
  slug: string
): Promise<Category | null> {
  const response = await fetch(
    `${API_URL}/categories/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.status}`);
  }

  const data = await response.json();

  return data.category ?? data;
}