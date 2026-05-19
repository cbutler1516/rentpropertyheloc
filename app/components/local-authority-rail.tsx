import { RevealGroup } from "./reveal-group";
import { SectionHeader } from "./design-system";
import { TrackedLink } from "./tracked-link";
import {
  getLocalAuthoritySnippet,
  primaryLocalThemes,
  washingtonMarketLinks,
  type LocalAuthorityAudience,
} from "../lib/local-authority";

type LocalAuthorityRailProps = {
  audience?: LocalAuthorityAudience;
  title?: string;
  lead?: string;
  compact?: boolean;
};

export function LocalAuthorityRail({
  audience = "general",
  title = "Puget Sound expertise",
  lead = getLocalAuthoritySnippet(audience),
  compact = false,
}: LocalAuthorityRailProps) {
  if (compact) {
    return (
      <aside
        className="border border-zinc-900/80 bg-[#050505] p-6 md:p-7"
        data-analytics-section="local_authority"
      >
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Washington · Eastside
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">{lead}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {washingtonMarketLinks.map((link) => (
            <TrackedLink
              key={link.href}
              href={link.href}
              location="local_authority_rail"
              label={link.label}
              className="rounded-full border border-zinc-800 px-3 py-1.5 font-mono text-[9px] tracking-[0.14em] text-zinc-400 uppercase hover:border-[#7c3aed]/50 hover:text-white"
            >
              {link.label}
            </TrackedLink>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <section
      className="section-flow relative border-t border-zinc-900/40"
      data-analytics-section="local_authority"
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader eyebrow="Local" title={title} lead={lead} />
        <RevealGroup
          className="mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
          stagger={80}
        >
          {primaryLocalThemes.map((theme) => (
            <article key={theme} className="reveal-item bg-[#050505] p-6 md:p-7">
              <p className="text-sm leading-relaxed text-zinc-400">{theme}</p>
            </article>
          ))}
        </RevealGroup>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {washingtonMarketLinks.map((link) => (
            <TrackedLink
              key={link.href}
              href={link.href}
              location="local_authority_rail"
              label={link.label}
              className="rounded-full border border-zinc-800 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-zinc-400 uppercase hover:border-[#7c3aed]/50 hover:text-white"
            >
              {link.label}
            </TrackedLink>
          ))}
        </div>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
