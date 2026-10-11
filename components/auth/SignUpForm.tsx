
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
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

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

  async function handleSocialSignUp(provider: "google" | "github") {
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            `${provider} দিয়ে অ্যাকাউন্ট তৈরি করা যায়নি।`
        );
        setSocialLoading(null);
      }
    } catch {
      toast.error("সোশ্যাল লগইনে সমস্যা হয়েছে। আবার চেষ্টা করো।");
      setSocialLoading(null);
    }
  }

  const busy = loading || socialLoading !== null;

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => handleSocialSignUp("google")}
          disabled={busy}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#dce7dc] bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-lg font-bold text-[#4285F4]" aria-hidden="true">
            G
          </span>
          {socialLoading === "google"
            ? "Google-এ সংযোগ হচ্ছে..."
            : "Google দিয়ে অ্যাকাউন্ট তৈরি করো"}
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignUp("github")}
          disabled={busy}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#dce7dc] bg-[#24292f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#32383f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
          >
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76 2.2 3.9 1.57.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.05-1.15 3.05-1.15.61 1.55.23 2.69.11 2.98.72.78 1.16 1.78 1.16 3 0 4.27-2.61 5.22-5.09 5.5.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>
          {socialLoading === "github"
            ? "GitHub-এ সংযোগ হচ্ছে..."
            : "GitHub দিয়ে অ্যাকাউন্ট তৈরি করো"}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#dce7dc]" />
        <span className="text-xs text-[#788078]">
          অথবা ইমেইল দিয়ে
        </span>
        <div className="h-px flex-1 bg-[#dce7dc]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              aria-label={
                showPassword ? "পাসওয়ার্ড লুকাও" : "পাসওয়ার্ড দেখাও"
              }
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

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-[#07833f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#066b35] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করো"}
        </button>

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
    </div>
  );
}
