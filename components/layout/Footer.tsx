
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[#e0e9e0] bg-[#fbfdfb]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="font-bold text-[#087f43]">বাজার দর</span>
        </Link>

        <p className="text-xs leading-5 text-[#788078]">
          বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে।
        </p>

        <nav className="flex flex-wrap gap-4 text-xs text-[#667267]">
          <Link href="/" className="hover:text-[#07833f]">
            হোম
          </Link>
          <Link href="/signin" className="hover:text-[#07833f]">
            সাইন ইন
          </Link>
          <Link href="/signup" className="hover:text-[#07833f]">
            সাইন আপ
          </Link>
        </nav>
      </div>

      <div className="border-t border-[#e8eee8] px-4 py-3 text-center text-xs text-[#879087]">
       © ২০২৬ বাজার দর। সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}