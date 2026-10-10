
import type { Category } from "@/types";

export default function CategoryHeader({
  category,
  count,
}: {
  category: Category;
  count: number;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-[#e1eae1] bg-white p-5 sm:p-7">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eff6ef] text-3xl">
          {category.icon ?? "🛒"}
        </div>

        <div>
          <p className="text-xs font-medium text-emerald-700">
            বাজার দর · ক্যাটাগরি
          </p>

          <h1 className="mt-1 text-2xl font-extrabold text-[#26332a]">
            {category.nameBn ?? category.name}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            এই ক্যাটাগরিতে {count.toLocaleString("bn-BD")}টি পণ্য
          </p>
        </div>
      </div>
    </section>
  );
}
