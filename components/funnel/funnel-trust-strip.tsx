const TRUST_ITEMS = [
  "Primary residences",
  "Rental properties",
  "Vacation homes",
  "Investment properties",
] as const;

export function FunnelTrustStrip() {
  return (
    <div
      className="mx-auto mb-3 max-w-xl px-1 text-center sm:mb-4 lg:max-w-2xl"
      aria-label="Property types eligible for review"
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] leading-snug text-slate-600 sm:gap-x-3 sm:text-xs">
        {TRUST_ITEMS.map((item) => (
          <li key={item} className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="font-semibold text-teal-600" aria-hidden>
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 text-[11px] text-slate-500 sm:text-xs">
        Takes about 60 seconds · No obligation
      </p>
    </div>
  );
}
