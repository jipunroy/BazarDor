
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/api";

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products API route error:", error);

    return NextResponse.json(
      { error: "পণ্যের তথ্য এখন পাওয়া যাচ্ছে না" },
      { status: 502 }
    );
  }
}
