
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
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
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

  async function handleSocialSignIn(provider: "google" | "github") {
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message || `${provider} দিয়ে লগইন করা যায়নি।`
        );
        setSocialLoading(null);
      }
    } catch {
      toast.error("লগইনে সমস্যা হয়েছে। আবার চেষ্টা করো।");
      setSocialLoading(null);
    }
  }

  const busy = loading || socialLoading !== null;

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={busy}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#dce7dc] bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-lg font-bold text-[#4285F4]" aria-hidden="true">
            G
          </span>
          {socialLoading === "google"
            ? "Google-এ সংযোগ হচ্ছে..."
            : "Google দিয়ে লগইন করো"}
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
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
            : "GitHub দিয়ে লগইন করো"}
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
            htmlFor="signin-email"
            className="mb-1.5 block text-sm font-medium"
          >
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
          <label
            htmlFor="signin-password"
            className="mb-1.5 block text-sm font-medium"
          >
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
          disabled={busy}
          className="w-full rounded-lg bg-[#07833f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#066b35] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "লগইন হচ্ছে..." : "লগইন"}
        </button>

        <p className="text-center text-sm text-[#788078]">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#07833f] hover:underline"
          >
            অ্যাকাউন্ট তৈরি করো
          </Link>
        </p>
      </form>
    </div>
  );
}
