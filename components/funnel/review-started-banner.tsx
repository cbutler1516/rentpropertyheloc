"use client";

import { cn } from "@/lib/cn";

type ReviewStartedBannerProps = {
  showPriority?: boolean;
  className?: string;
};

const BASE_ITEMS = ["Property Found", "Request Received"] as const;

export function ReviewStartedBanner({ showPriority = false, className }: ReviewStartedBannerProps) {
  const items = showPriority
    ? [...BASE_ITEMS, "Priority Review Activated"]
    : [...BASE_ITEMS, "Review In Progress"];

  return (
    <div
      className={cn(
        "rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 to-white p-5 sm:p-6",
        className,
      )}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-800">Review Started</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-slate-800">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs text-white"
              aria-hidden
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-relaxed text-slate-600">
        A licensed mortgage professional will review your scenario and discuss available financing
        options.
      </p>
    </div>
  );
}
