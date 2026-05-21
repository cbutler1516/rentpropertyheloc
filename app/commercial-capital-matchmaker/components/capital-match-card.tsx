import { CAPITAL_PATH_META } from "../lib/form-options";
import { ccmPanelElevated } from "../lib/ccm-ui";
import type { CapitalMatch } from "../lib/types";

type CapitalMatchCardProps = {
  match: CapitalMatch;
  rank: number;
};

export function CapitalMatchCard({ match, rank }: CapitalMatchCardProps) {
  const pathLabel = CAPITAL_PATH_META[match.pathId].label;

  return (
    <article className={`${ccmPanelElevated} overflow-hidden`}>
      <div className="flex flex-col gap-6 p-8 md:flex-row md:items-start md:justify-between md:p-10">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
              Lane {rank}
            </span>
            <span className="rounded-full bg-[#7c3aed]/10 px-3 py-1 font-mono text-[9px] tracking-[0.16em] text-[#c4b5fd] uppercase ring-1 ring-[#7c3aed]/25">
              {pathLabel}
            </span>
          </div>
          <h3 className="text-xl font-medium tracking-tight text-white">
            {match.lenderName}
          </h3>
          <p className="text-sm text-zinc-500">{match.productLabel}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-600 uppercase">
            Category fit
          </p>
          <p className="mt-1 text-3xl font-semibold text-[#c9a227]">{match.fitScore}</p>
        </div>
      </div>

      <div className="grid gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Rate context", value: match.rateBand },
          { label: "Term structure", value: match.termSnapshot },
          { label: "Leverage band", value: match.leverageRange },
          { label: "Quote timing", value: match.speedToQuote },
        ].map((item) => (
          <div key={item.label} className="bg-[#080808]/80 px-6 py-5">
            <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-snug text-zinc-300">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
        <div>
          <p className="font-mono text-[9px] tracking-[0.18em] text-[#c9a227] uppercase">
            Why this lane fits
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-400">
            {match.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
            Underwriting focus
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-500">
            {match.considerations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
