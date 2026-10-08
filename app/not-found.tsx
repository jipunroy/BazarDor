import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4 text-7xl">🛒</div>

        <h1 className="text-5xl font-bold">404</h1>

        <h2 className="mt-3 text-2xl font-semibold">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mt-2 text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো আর নেই অথবা URL টি ভুল।
        </p>

        <Link
          href="/"
          className="btn btn-primary mt-6"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}