import { NextResponse } from "next/server";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      cache: "no-store",
    });

    const body = await response.text();

    if (!response.ok) {
      console.error("Categories upstream API error:", response.status, body);

      return NextResponse.json(
        {
          error: "Categories API unavailable",
          upstreamStatus: response.status,
        },
        { status: 502 }
      );
    }

    let data: unknown;

    try {
      data = JSON.parse(body);
    } catch {
      console.error("Categories API returned invalid JSON:", body);

      return NextResponse.json(
        { error: "Invalid categories API response" },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Categories route error:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 502 }
    );
  }
}