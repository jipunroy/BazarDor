import { NextResponse } from "next/server";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const details = await response.text();

      console.error("Categories API error:", response.status, details);

      return NextResponse.json(
        { error: "Categories API unavailable" },
        { status: 502 }
      );
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Categories proxy error:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 502 }
    );
  }
}