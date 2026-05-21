"use client";

import Link from "next/link";
import { trackScenarioReviewCtaClick } from "../lib/analytics-events";
import { cn } from "@/lib/utils";

export type ScenarioReviewAudience =
  | "buyer"
  | "homeowner"
  | "commercial"
  | "agent"
  | "seller-concessions"
  | "buydown"
  | "heloc"
  | "refinance";

const scenarioCopy: Record<
  ScenarioReviewAudience,
  { title: string; lead: string; label: string }
> = {
  buyer: {
    title: "Compare financing options",
    lead: "Model payment, cash to close, and structure before you tour or write.",
    label: "Review a Scenario",
  },
  homeowner: {
    title: "Compare payment strategies",
    lead: "See refinance, HELOC, and hold paths side by side—not rate noise alone.",
    label: "Compare Payment Strategies",
  },
  commercial: {
    title: "Investment financing review",
    lead: "Clarify DSCR, bridge, and structure for the asset and sponsor.",
    label: "Investment Financing Review",
  },
  agent: {
    title: "Offer strategy review",
    lead: "Give clients a clearer financing story before the offer window.",
    label: "Offer Strategy Review",
  },
  "seller-concessions": {
    title: "Explore loan structures",
    lead: "See how concessions, buydowns, and terms change the payment picture.",
    label: "Explore Loan Structures",
  },
  buydown: {
    title: "Compare payment strategies",
    lead: "Walk through buydown and ARM options with real numbers.",
    label: "Compare Payment Strategies",
  },
  heloc: {
    title: "Compare financing options",
    lead: "Compare HELOC, cash-out, and leaving the first mortgage in place.",
    label: "Compare Financing Options",
  },
  refinance: {
    title: "Review a scenario",
    lead: "Break-even, cash flow, and timing—before you react to headlines.",
    label: "Review a Scenario",
  },
};

type ScenarioReviewCtaProps = {
  audience: ScenarioReviewAudience;
  location: string;
  className?: string;
};

export function ScenarioReviewCta({
  audience,
  location,
  className,
}: ScenarioReviewCtaProps) {
  const copy = scenarioCopy[audience];
  const href = "/deal-analyzer";

  return (
    <aside
      className={cn(
        "rounded-lg border border-zinc-900/80 bg-[#050505] p-6 md:p-7",
        className,
      )}
      data-analytics-section={`scenario_review_${location}`}
    >
      <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
        Scenario review
      </p>
      <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white md:text-2xl">
        {copy.title}
      </h3>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400">
        {copy.lead}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-6 font-mono text-[10px] tracking-[0.14em] text-zinc-200 uppercase transition-colors hover:border-[#7c3aed]/50 hover:text-white"
        onClick={() =>
          trackScenarioReviewCtaClick({
            audience,
            label: copy.label,
            href,
            location,
            ctaType: copy.label,
          })
        }
      >
        {copy.label}
      </Link>
      <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.12em] text-zinc-600 uppercase">
        Educational tool · Not a loan application
      </p>
    </aside>
  );
}
