import { FounderAdvisorSection } from "./founder-advisor-section";
import { ProofLayer } from "./proof-layer";
import type { FounderAudience } from "../lib/founder-profile";

type TrustStackProps = {
  audience?: FounderAudience;
  layout?: "split" | "founder-only";
};

/** Reusable founder + proof block for audience hubs. */
export function TrustStack({
  audience = "general",
  layout = "split",
}: TrustStackProps) {
  if (layout === "founder-only") {
    return <FounderAdvisorSection audience={audience} variant="standard" />;
  }

  return (
    <section
      className="section-flow relative border-t border-zinc-900/40"
      data-analytics-section="trust_stack"
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-10">
        <FounderAdvisorSection audience={audience} variant="compact" />
        <ProofLayer variant="compact" />
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
