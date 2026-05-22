import type { ReactNode } from "react";
import { RevealGroup } from "@/app/components/reveal-group";

type MarketSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  variant?: "warm" | "white" | "graphite";
  className?: string;
};

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MarketSection({
  id,
  eyebrow,
  title,
  lead,
  children,
  variant = "white",
  className,
}: MarketSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "market-section",
        variant === "warm" && "market-section-warm",
        variant === "white" && "market-section-white",
        variant === "graphite" && "market-section-graphite",
        className,
      )}
      data-analytics-section={id}
    >
      <div className="market-section-inner mx-auto w-full max-w-7xl px-6 md:px-10">
        <RevealGroup stagger={90}>
          {eyebrow ? (
            <p className="reveal-item market-eyebrow">{eyebrow}</p>
          ) : null}
          <h2 className="reveal-item market-section-title">{title}</h2>
          {lead ? (
            <p className="reveal-item market-section-lead">{lead}</p>
          ) : null}
        </RevealGroup>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}
