import Link from "next/link";
import { RevealGroup } from "./reveal-group";
import { SectionHeader } from "./design-system";
import {
  founderProfile,
  getFounderLead,
  type FounderAudience,
} from "../lib/founder-profile";
import { getLocalAuthoritySnippet } from "../lib/local-authority";

type FounderAdvisorSectionProps = {
  audience?: FounderAudience;
  variant?: "standard" | "compact";
  showLocalAuthority?: boolean;
  className?: string;
};

export function FounderAdvisorSection({
  audience = "general",
  variant = "standard",
  showLocalAuthority = true,
  className = "",
}: FounderAdvisorSectionProps) {
  const lead = getFounderLead(audience);
  const localSnippet = showLocalAuthority
    ? getLocalAuthoritySnippet(
        audience === "general" ? "general" : audience,
      )
    : null;

  if (variant === "compact") {
    return (
      <aside
        className={`founder-advisor founder-advisor--compact border border-zinc-900/80 bg-[#050505] p-7 md:p-8 ${className}`}
      >
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Your advisor
        </p>
        <p className="mt-4 text-xl font-semibold tracking-[-0.02em] text-white">
          {founderProfile.name}
        </p>
        <p className="mt-2 text-sm text-zinc-400">{founderProfile.title}</p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          {founderProfile.lendingPartner} · powered by{" "}
          {founderProfile.lendingPartnerPoweredBy}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">{lead}</p>
        <Link
          href={founderProfile.aboutHref}
          className="mt-6 inline-flex text-sm font-medium text-zinc-300 hover:text-white"
        >
          About the playbook →
        </Link>
      </aside>
    );
  }

  return (
    <section
      className={`section-flow relative border-y border-zinc-900/40 ${className}`}
      data-analytics-section="founder_advisor"
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader
          eyebrow="Advisor"
          title="Human guidance. Clear standards."
          lead={lead}
        />
        <RevealGroup
          className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
          stagger={90}
        >
          <article className="reveal-item border border-zinc-900/80 bg-[#050505] p-7 md:p-8">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
              {founderProfile.brand}
            </p>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              {founderProfile.name}
            </h3>
            <p className="mt-3 text-sm text-zinc-400">{founderProfile.title}</p>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              <span className="text-zinc-300">{founderProfile.lendingPartner}</span>
              , powered by {founderProfile.lendingPartnerPoweredBy}.{" "}
              {founderProfile.region} · {founderProfile.focus}
            </p>
            <Link
              href={founderProfile.aboutHref}
              className="mt-8 inline-flex text-sm font-medium text-zinc-300 hover:text-white"
            >
              About the playbook →
            </Link>
          </article>

          <article className="reveal-item flex flex-col justify-center border border-zinc-900/80 bg-[#050505] p-7 md:p-8">
            <ul className="space-y-4">
              {founderProfile.bullets.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-zinc-400"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c3aed]"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </ul>
            {localSnippet ? (
              <p className="mt-8 border-t border-zinc-900/80 pt-6 text-sm leading-relaxed text-zinc-500">
                {localSnippet}
              </p>
            ) : null}
          </article>
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
