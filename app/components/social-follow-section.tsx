import { socialLinks } from "../lib/social-links";
import { SectionHeader } from "./design-system";
import { RevealGroup } from "./reveal-group";
import { SocialLinkGrid } from "./social-link-grid";
import { TrackedLink } from "./tracked-link";

const mainSocialLinks = socialLinks.filter(
  (link) => link.platform !== "Broadview Lending",
);

const flywheelSteps = [
  {
    label: "01 / Watch",
    title: "Short video",
    body: "One useful mortgage idea earns attention.",
  },
  {
    label: "02 / Read",
    title: "Deeper guide",
    body: "The topic becomes a Learn article or resource.",
  },
  {
    label: "03 / Book",
    title: "Strategy call",
    body: "Ready viewers move into a compliant conversation.",
  },
];

export function SocialFollowSection({
  eyebrow = "Follow The Loan Playbook",
  title = "Follow the media engine.",
  lead = "TikTok, Instagram, Facebook, YouTube, and LinkedIn are the main distribution channels now. Individual post pages are ready to grow next.",
  showFlywheel = true,
  showHubLink = true,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  showFlywheel?: boolean;
  showHubLink?: boolean;
}) {
  return (
    <section className="section-flow section-matte relative border-y border-zinc-900/40">
      <div className="section-bridge-top" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
        {showHubLink ? (
          <TrackedLink
            href="/social"
            location="social_follow_section"
            className="btn-ghost mt-8 inline-flex h-12 items-center justify-center border border-zinc-800 px-7 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
          >
            Explore Social Hub
          </TrackedLink>
        ) : null}
        <SocialLinkGrid links={mainSocialLinks} ctaLabel="Follow profile" />

        {showFlywheel ? (
          <RevealGroup
            className="mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
            stagger={90}
          >
            {flywheelSteps.map((step) => (
              <article key={step.label} className="reveal-item bg-[#050505] p-7">
                <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                  {step.label}
                </p>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                  {step.body}
                </p>
              </article>
            ))}
          </RevealGroup>
        ) : null}
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
