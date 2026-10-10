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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      toast.error("তোমার নাম লিখো।");
      return;
    }

    if (!trimmedEmail) {
      toast.error("ইমেইল লিখো।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);

      toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label
          htmlFor="signup-name"
          className="mb-1.5 block text-sm font-medium"
        >
          তোমার নাম
        </label>

        <input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="তোমার নাম"
          className="w-full rounded-lg border border-[#dce7dc] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#07833f]"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="signup-email"
          className="mb-1.5 block text-sm font-medium"
        >
          ইমেইল
        </label>

        <input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className="w-full rounded-lg border border-[#dce7dc] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#07833f]"
        />
      </div>

      {/* Password with Show/Hide */}
      <div>
        <label
          htmlFor="signup-password"
          className="mb-1.5 block text-sm font-medium"
        >
          পাসওয়ার্ড
        </label>

        <div className="relative">
          <input
            id="signup-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full rounded-lg border border-[#dce7dc] bg-white px-3 py-2.5 pr-16 text-sm outline-none focus:border-[#07833f]"
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? "পাসওয়ার্ড লুকাও" : "পাসওয়ার্ড দেখাও"}
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#07833f] hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#07833f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#066b35] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করো"}
      </button>

      {/* Sign in link */}
      <p className="text-center text-sm text-[#788078]">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-[#07833f] hover:underline"
        >
          লগইন করো
        </Link>
      </p>
    </form>
  );
}