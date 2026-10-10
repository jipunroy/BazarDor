
"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f1f6f1] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-7 text-center">
        <div className="text-5xl">🌿</div>
        <h1 className="mt-4 text-xl font-extrabold text-[#26332a]">
          কিছু একটা সমস্যা হয়েছে
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#788078]">
          পেজটি লোড করা যায়নি। আবার চেষ্টা করো।
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-lg bg-[#07833f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#066b35]"
        >
          আবার চেষ্টা করো
        </button>
      </section>
    </main>
  );
}