
import Link from "next/link";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f1f6f1] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm font-bold text-[#07833f]">
          🛒 বাজার দর
        </Link>
        <h1 className="mt-5 text-2xl font-extrabold text-[#26332a]">
          নতুন অ্যাকাউন্ট তৈরি করো
        </h1>
        <p className="mt-2 mb-6 text-sm text-[#788078]">
          বাজারদরের বিস্তারিত দেখতে শুরু করো।
        </p>
        <SignUpForm />
      </section>
    </main>
  );
}