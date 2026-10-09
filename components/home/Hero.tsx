
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 pt-4 sm:pt-5">
      <div className="mx-auto grid max-w-[1200px] items-center gap-4 rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] px-5 py-6 sm:grid-cols-[1.4fr_0.6fr] sm:px-8 sm:py-7">
        <div>
          <span className="inline-flex rounded-full bg-[#e1f4e6] px-3 py-1 text-xs font-medium text-[#087f43]">
            বাংলাদেশের বাজারদর, এক নজরে
          </span>

          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#26332a] sm:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-xl text-xs leading-5 text-[#737d74] sm:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য নিত্যপ্রয়োজনীয়
            পণ্যের বাজারদর জানুন। প্রতিদিনের বাজারের দাম বাড়া-কমার তথ্য
            দেখুন সহজেই।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-[#07833f] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#066b35]"
          >
            সব পণ্যের দাম দেখুন
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-[220px] items-center justify-center sm:max-w-[190px]">
          <Image
            src="/images/bazar-hero.png"
            alt="বাজারের তাজা পণ্য"
            width={400}
            height={300}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}