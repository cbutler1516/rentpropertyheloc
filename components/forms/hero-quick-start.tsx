"use client";

import { Button } from "@/components/ui/button";
import { trackLeadFormStarted } from "@/lib/analytics/events";
import { buildCheckOptionsUrl, PROPERTY_TYPES } from "@/lib/lead-funnel";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";

export function HeroQuickStart({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const router = useRouter();

  function handleSelect(propertyType: string) {
    trackLeadFormStarted("hero_quick_start");
    router.push(buildCheckOptionsUrl({ propertyType }));
  }

  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5",
        isLight
          ? "border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
          : "border-white/15 bg-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md",
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-bright sm:text-xs">
        Quick start
      </p>
      <p className={cn("mt-2 text-sm font-semibold sm:text-base", isLight ? "text-navy-950" : "text-white")}>
        What type of rental property do you own?
      </p>
      <p className={cn("mt-1 text-xs", isLight ? "text-slate-500" : "text-white/55")}>Takes about 60 seconds · Subject to approval</p>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PROPERTY_TYPES.map((type) => (
          <Button
            key={type.id}
            type="button"
            variant="secondary"
            size="lg"
            className={cn(
              "h-auto min-h-[44px] justify-start whitespace-normal px-3 py-2.5 text-left text-sm",
              isLight
                ? "border-slate-200 bg-slate-50 text-navy-950 hover:bg-slate-100"
                : "border-white/15 bg-white/10 text-white hover:bg-white/15",
            )}
            onClick={() => handleSelect(type.id)}
          >
            {type.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
