
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
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
        <label htmlFor="signup-name" className="mb-1.5 block text-sm font-medium">
          তোমার নাম
        </label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="তোমার নাম"
          className="w-full rounded-lg border border-[#dce7dc] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#07833f]"
        />
      </div>

      <div>
        <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium">
          ইমেইল
        </label>
        <input
          id="signup-email"
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
        <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium">
          পাসওয়ার্ড
        </label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="কমপক্ষে ৮ অক্ষর"
          className="w-full rounded-lg border border-[#dce7dc] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#07833f]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#07833f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#066b35] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করো"}
      </button>

      <p className="text-center text-sm text-[#788078]">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-[#07833f] hover:underline">
          লগইন করো
        </Link>
      </p>
    </form>
  );
}