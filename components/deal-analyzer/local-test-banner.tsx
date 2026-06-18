"use client";

export function LocalTestBanner() {
  if (process.env.NODE_ENV === "production") return null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) return null;

  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>Local test mode:</strong> Supabase is not configured. Reports are stored in browser
      localStorage only.
    </div>
  );
}
