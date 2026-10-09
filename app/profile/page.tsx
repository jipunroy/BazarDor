
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile");
  }

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-10">
      <section className="mx-auto max-w-xl rounded-2xl border border-[#e3ebe3] bg-[#fbfdfb] p-6 sm:p-8">
        <Link href="/" className="text-sm font-medium text-[#07833f] hover:underline">
          ← হোম পেজ
        </Link>

        <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e1f4e6] text-3xl">
          👤
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-[#26332a]">
          আমার প্রোফাইল
        </h1>
        <p className="mt-2 text-sm text-[#788078]">
          তোমার অ্যাকাউন্টের তথ্য এখানে দেখো।
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-[#e3ebe3] bg-white p-4">
            <p className="text-xs text-[#788078]">নাম</p>
            <p className="mt-1 font-semibold text-[#26332a]">
              {session.user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div className="rounded-xl border border-[#e3ebe3] bg-white p-4">
            <p className="text-xs text-[#788078]">ইমেইল</p>
            <p className="mt-1 break-all font-semibold text-[#26332a]">
              {session.user.email}
            </p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="mt-6 inline-flex rounded-lg bg-[#07833f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b35]"
        >
          প্রোফাইল আপডেট
        </Link>
      </section>
    </main>
  );
}