import Link from "next/link";
import type { PartnerAgent } from "../lib/agent-types";
import {
  agentBrandStyle,
  hasAgentVisualBranding,
  resolveBrokerage,
  resolveCtaEmail,
  resolveCtaPhone,
} from "../lib/agent-branding";

type PartnerSeoLandingHeaderProps = {
  agent: PartnerAgent;
  calculatorLabel: string;
};

export function PartnerSeoLandingHeader({
  agent,
  calculatorLabel,
}: PartnerSeoLandingHeaderProps) {
  const brokerage = resolveBrokerage(agent);
  const phone = resolveCtaPhone(agent);
  const email = resolveCtaEmail(agent);
  const brandStyle = agentBrandStyle(agent.brandColor);
  const hasVisuals = hasAgentVisualBranding(agent);

  return (
    <section
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[var(--agent-brand,#7c3aed)]/15 via-zinc-950/80 to-[#c9a227]/10 p-6 md:p-8"
      style={brandStyle}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {hasVisuals ? (
          <div className="flex shrink-0 flex-col items-center gap-2 md:items-start">
            {agent.headshotUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={agent.headshotUrl}
                alt=""
                className="h-24 w-24 rounded-2xl border-2 border-[var(--agent-brand,#c9a227)]/40 object-cover"
              />
            ) : null}
            {agent.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={agent.logoUrl}
                alt=""
                className="h-10 max-w-[160px] object-contain"
              />
            ) : null}
          </div>
        ) : null}
        <div className="min-w-0 flex-1 space-y-3">
          <p className="font-mono text-[9px] tracking-[0.24em] text-[#c9a227] uppercase">
            {calculatorLabel} · Shared by {agent.name}
          </p>
          <h2 className="text-xl font-medium text-white md:text-2xl">
            Financing strategy by Chris Butler
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            The Loan Playbook + Broadview Lending prepare your Playbook Report.
            {brokerage ? ` Work with ${agent.name} at ${brokerage}.` : ` Work with ${agent.name}.`}
          </p>
          {agent.bio ? (
            <p className="text-sm leading-relaxed text-zinc-500">{agent.bio}</p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-1">
            {phone ? (
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="inline-flex h-9 items-center rounded-full border border-zinc-700 px-4 font-mono text-[9px] tracking-[0.14em] text-zinc-300 uppercase hover:border-[var(--agent-brand,#7c3aed)]/50"
              >
                {phone}
              </a>
            ) : null}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex h-9 items-center rounded-full border border-zinc-700 px-4 font-mono text-[9px] tracking-[0.14em] text-zinc-300 uppercase hover:border-[var(--agent-brand,#7c3aed)]/50"
              >
                Email {agent.name.split(" ")[0]}
              </a>
            ) : null}
            <Link
              href={`/partners/${agent.slug}`}
              className="inline-flex h-9 items-center rounded-full px-4 font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:text-zinc-300"
            >
              Partner hub →
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-6 border-t border-white/[0.06] pt-4 font-mono text-[8px] tracking-[0.16em] text-zinc-600 uppercase">
        Powered by The Loan Playbook + Broadview Lending · Referral {agent.referralCode}
      </p>
    </section>
  );
}
