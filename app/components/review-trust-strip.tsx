import { TrackedAnchor } from "./tracked-link";
import {
  googleReviewConfig,
  googleReviewSnippets,
} from "../lib/proof-signals";

type ReviewTrustStripProps = {
  variant?: "inline" | "stacked";
  maxSnippets?: number;
  showCta?: boolean;
};

export function ReviewTrustStrip({
  variant = "inline",
  maxSnippets = 2,
  showCta = true,
}: ReviewTrustStripProps) {
  const snippets = googleReviewSnippets.slice(0, maxSnippets);

  if (variant === "stacked") {
    return (
      <aside
        className="border border-zinc-900/80 bg-[#050505] p-6 md:p-7"
        data-analytics-section="review_trust"
      >
        <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
          Client feedback
        </p>
        <ul className="mt-5 space-y-4">
          {snippets.map((snippet) => (
            <li key={snippet.id}>
              <p className="text-sm leading-relaxed text-zinc-400">
                &ldquo;{snippet.text}&rdquo;
              </p>
              <p className="mt-2 font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
                {snippet.context}
              </p>
            </li>
          ))}
        </ul>
        {showCta ? (
          <TrackedAnchor
            href={googleReviewConfig.href}
            target="_blank"
            rel="noreferrer"
            location="review_trust_strip"
            label="Leave a review"
            eventType="review"
            className="mt-6 inline-flex text-sm font-medium text-zinc-400 hover:text-white"
          >
            Leave a review →
          </TrackedAnchor>
        ) : null}
      </aside>
    );
  }

  return (
    <div
      className="flex flex-col gap-6 border border-zinc-900/80 bg-[#050505]/80 p-6 md:flex-row md:items-center md:justify-between md:p-7"
      data-analytics-section="review_trust"
    >
      <ul className="flex flex-col gap-4 md:max-w-2xl">
        {snippets.map((snippet) => (
          <li key={snippet.id} className="text-sm leading-relaxed text-zinc-500">
            <span className="text-zinc-400">&ldquo;{snippet.text}&rdquo;</span>
            <span className="mt-1 block font-mono text-[9px] tracking-[0.16em] text-zinc-600 uppercase">
              {snippet.context}
            </span>
          </li>
        ))}
      </ul>
      {showCta ? (
        <TrackedAnchor
          href={googleReviewConfig.href}
          target="_blank"
          rel="noreferrer"
          location="review_trust_strip"
          label="Leave a review"
          eventType="review"
          className="btn-ghost inline-flex h-11 shrink-0 items-center justify-center border border-zinc-800 px-5 text-sm font-medium text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
        >
          Leave a review
        </TrackedAnchor>
      ) : null}
    </div>
  );
}
