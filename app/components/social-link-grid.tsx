import { socialLinks, type SocialLink } from "../lib/social-links";
import { RevealGroup } from "./reveal-group";
import { TrackedAnchor } from "./tracked-link";

export function SocialLinkGrid({
  links = socialLinks,
  className = "",
  ctaLabel = "Open destination",
}: {
  links?: SocialLink[];
  className?: string;
  ctaLabel?: string;
}) {
  return (
    <RevealGroup
      className={`social-link-grid mt-14 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      stagger={70}
    >
      {links.map((link) => (
          <TrackedAnchor
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            location="social_link_grid"
            label={link.label}
            eventType="social"
            platform={link.platform}
            className="reveal-item group relative bg-[#050505] p-7 transition-colors duration-[var(--duration-hover)] hover:bg-[#0a0a0a]"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/0 to-transparent opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-hover:from-[#5b21b6]/[0.06]"
              aria-hidden
            />
            <div className="relative flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                {link.platform}
              </p>
            </div>
            <h3 className="relative mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
              {link.label}
            </h3>
            <p className="relative mt-5 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
              {link.description}
            </p>
            <span className="relative mt-8 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase transition-colors duration-[var(--duration-hover)] group-hover:text-[#7c3aed]">
              {ctaLabel}
              <span aria-hidden>→</span>
            </span>
          </TrackedAnchor>
      ))}
    </RevealGroup>
  );
}
