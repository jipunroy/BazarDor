export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
      </div>
    </main>
  );
}