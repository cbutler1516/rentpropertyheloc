import { RevealGroup } from "./reveal-group";
import { SectionHeader } from "./design-system";
import { TrackedAnchor } from "./tracked-link";
import { LicensingTrust } from "./licensing-trust";
import { ReviewTrustStrip } from "./review-trust-strip";
import {
  agentTrustSnippets,
  borrowerOutcomes,
  googleReviewConfig,
  whyClientsWorkWithUs,
} from "../lib/proof-signals";

type ProofLayerProps = {
  variant?: "standard" | "compact";
  showGoogleReview?: boolean;
  className?: string;
};

export function ProofLayer({
  variant = "standard",
  showGoogleReview = true,
  className = "",
}: ProofLayerProps) {
  if (variant === "compact") {
    return (
      <aside
        className={`proof-layer proof-layer--compact border border-zinc-900/80 bg-[#050505] p-7 md:p-8 ${className}`}
        data-analytics-section="proof_layer"
      >
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Why clients work with us
        </p>
        <ul className="mt-5 space-y-3">
          {whyClientsWorkWithUs.slice(0, 3).map((item) => (
            <li key={item} className="text-sm leading-relaxed text-zinc-500">
              {item}
            </li>
          ))}
        </ul>
        {showGoogleReview ? (
          <TrackedAnchor
            href={googleReviewConfig.href}
            target="_blank"
            rel="noreferrer"
            location="proof_google_review"
            label={googleReviewConfig.label}
            eventType="review"
            className="mt-6 inline-flex text-sm font-medium text-zinc-400 hover:text-white"
          >
            {googleReviewConfig.label} →
          </TrackedAnchor>
        ) : null}
      </aside>
    );
  }

  return (
    <section
      className={`section-flow relative ${className}`}
      data-analytics-section="proof_layer"
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader
          eyebrow="Credibility"
          title="Quiet proof—not a quote wall."
          lead="Outcomes, partner context, and licensing clarity—kept minimal on purpose."
        />
        <RevealGroup
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          stagger={80}
        >
          <article className="reveal-item border border-zinc-900/80 bg-[#050505] p-6 md:p-7 lg:col-span-2">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
              Why clients work with us
            </p>
            <ul className="mt-5 space-y-3">
              {whyClientsWorkWithUs.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-zinc-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="reveal-item border border-zinc-900/80 bg-[#050505] p-6 md:p-7">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
              Borrower outcomes
            </p>
            <ul className="mt-5 space-y-4">
              {borrowerOutcomes.map((item) => (
                <li key={item.label}>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-600 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.outcome}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <article className="reveal-item border border-zinc-900/80 bg-[#050505] p-6 md:p-7">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
              Agent trust
            </p>
            <ul className="mt-5 space-y-4">
              {agentTrustSnippets.map((item, index) => (
                <li
                  key={item.outcome}
                  className="text-sm leading-relaxed text-zinc-400"
                >
                  <span className="text-zinc-600" aria-hidden>
                    {index + 1}.{" "}
                  </span>
                  {item.outcome}
                </li>
              ))}
            </ul>
          </article>
        </RevealGroup>

        {showGoogleReview ? (
          <div className="mt-6">
            <ReviewTrustStrip variant="inline" maxSnippets={1} />
          </div>
        ) : null}

        <div className="mt-6">
          <LicensingTrust variant="banner" />
        </div>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
