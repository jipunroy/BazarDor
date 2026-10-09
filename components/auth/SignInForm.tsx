
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "লগইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="signin-email" className="mb-1.5 block text-sm font-medium">
          ইমেইল
        </label>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className="w-full rounded-lg border border-[#dce7dc] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#07833f]"
        />
      </div>

      <div>
        <label htmlFor="signin-password" className="mb-1.5 block text-sm font-medium">
          পাসওয়ার্ড
        </label>
        <input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="তোমার পাসওয়ার্ড"
          className="w-full rounded-lg border border-[#dce7dc] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#07833f]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#07833f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#066b35] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "লগইন হচ্ছে..." : "লগইন"}
      </button>

      <p className="text-center text-sm text-[#788078]">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-[#07833f] hover:underline">
          অ্যাকাউন্ট তৈরি করো
        </Link>
      </p>
    </form>
  );
}