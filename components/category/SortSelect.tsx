
"use client";

type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortSelect({
  value,
  onChange,
}: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="product-sort"
        className="shrink-0 text-sm text-gray-600"
      >
        সাজান:
      </label>

      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-[#dce7dc] bg-white px-3 py-2 text-sm text-[#29362c] outline-none focus:border-emerald-600"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-high">দাম: কম থেকে বেশি</option>
        <option value="high-low">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}
