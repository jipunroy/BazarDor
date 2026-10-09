
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
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="পণ্য সাজানোর নিয়ম"
      className="rounded-lg border border-[#dce7dc] bg-white px-3 py-2 text-xs text-[#354337] outline-none focus:border-[#07833f]"
    >
      <option value="default">ডিফল্ট</option>
      <option value="low-high">দাম: কম থেকে বেশি</option>
      <option value="high-low">দাম: বেশি থেকে কম</option>
    </select>
  );
}