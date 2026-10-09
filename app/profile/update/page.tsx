
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/auth/ProfileUpdateForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile%2Fupdate");
  }

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-10">
      <section className="mx-auto max-w-xl rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-6 sm:p-8">
        <Link
          href="/profile"
          className="text-sm font-medium text-[#07833f] hover:underline"
        >
          ← প্রোফাইলে ফিরে যাও
        </Link>

        <h1 className="mt-6 text-2xl font-extrabold text-[#26332a]">
          প্রোফাইল আপডেট
        </h1>
        <p className="mt-2 text-sm text-[#788078]">
          তোমার নাম পরিবর্তন করে সংরক্ষণ করো।
        </p>

        <ProfileUpdateForm currentName={session.user.name || ""} />
      </section>
    </main>
  );
}