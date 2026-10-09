
import Link from "next/link";

type Props = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = "কোনো পণ্য পাওয়া যায়নি",
  description = "অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।",
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-[#dce7dc] bg-[#fbfdfb] px-5 py-12 text-center">
      <div className="text-4xl">🧺</div>

      <h2 className="mt-3 text-lg font-bold text-[#354337]">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#788078]">
        {description}
      </p>

      <Link
        href="/"
        className="mt-5 inline-flex rounded-lg bg-[#07833f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#066b35]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}