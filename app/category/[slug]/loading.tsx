
export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-7">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-28 rounded-2xl bg-[#dfe9df]" />

        <div className="my-6 flex justify-between gap-4">
          <div className="h-5 w-32 rounded bg-[#dfe9df]" />
          <div className="h-10 w-44 rounded-lg bg-[#dfe9df]" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="h-28 rounded-xl border border-[#e3ebe3] bg-white p-3"
            >
              <div className="h-8 w-8 rounded-lg bg-[#e5eee5]" />
              <div className="mt-3 h-3 w-3/4 rounded bg-[#e5eee5]" />
              <div className="mt-2 h-3 w-1/2 rounded bg-[#e5eee5]" />
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          পণ্য লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
}
