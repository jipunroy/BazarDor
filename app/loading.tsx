
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="h-36 animate-pulse rounded-2xl bg-[#e2ebe2]" />

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl border border-[#e3ebe3] bg-[#fbfdfb]"
            />
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-[#788078]">
          বাজারদর লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
}