"use client";

import { CtaLink } from "@/components/ui/cta-link";
import {
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  PRIMARY_CTA_SHORT,
} from "@/lib/cta";
import { cn } from "@/lib/cn";

export function SectionLeadCta({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex justify-center", className)}>
      <CtaLink
        href={PRIMARY_CTA_HREF}
        size="lg"
        className={cn("glow-accent w-full max-w-md sm:w-auto", compact && "max-w-sm")}
      >
        <span className="md:hidden">{PRIMARY_CTA_SHORT}</span>
        <span className="hidden md:inline">{PRIMARY_CTA_LABEL}</span>
      </CtaLink>
    </div>
  );
}
