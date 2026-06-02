import type { ReactNode } from "react";
import type { MarketingUseCaseIcon } from "@/lib/marketing/content";
import { cn } from "@/lib/cn";

const ICON_PATHS: Record<MarketingUseCaseIcon, ReactNode> = {
  acquire: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10.5L12 4l9 6.5V19a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19v-8.5z"
    />
  ),
  renovate: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
    />
  ),
  reserves: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6" />
    </>
  ),
  consolidate: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 7h16M4 12h10M4 17h6"
    />
  ),
  recycle: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h5M20 20v-5h-5M20 9A8 8 0 006.3 6.3L4 9M4 15a8 8 0 0013.7 2.7L20 15"
    />
  ),
};

export function UseCaseIcon({
  icon,
  className,
  tone = "light",
}: {
  icon: MarketingUseCaseIcon;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
        tone === "light" ? "bg-teal-50 text-teal-700" : "bg-white/10 text-teal-300",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        className="h-5 w-5"
      >
        {ICON_PATHS[icon]}
      </svg>
    </span>
  );
}
