import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { partnerDealAnalyzerBase } from "../lib/agent-types";
import type { PartnerAgent } from "../lib/agent-types";
import {
  agentBrandStyle,
  hasAgentVisualBranding,
  resolveBrokerage,
  resolveCtaEmail,
  resolveCtaPhone,
} from "../lib/agent-branding";

type PartnerLandingViewProps = {
  agent: PartnerAgent;
};

export function PartnerLandingView({ agent }: PartnerLandingViewProps) {
  const analyzeHref = `${partnerDealAnalyzerBase(agent.slug)}/analyze`;
  const brokerage = resolveBrokerage(agent);
  const phone = resolveCtaPhone(agent);
  const email = resolveCtaEmail(agent);
  const brandStyle = agentBrandStyle(agent.brandColor);
  const hasVisuals = hasAgentVisualBranding(agent);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#030712] text-white"
      style={brandStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 playbook-grid opacity-30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[var(--agent-brand,#7c3aed)]/25 blur-3xl"
        aria-hidden
      />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          {agent.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={agent.logoUrl}
              alt=""
              className="h-9 max-w-[140px] object-contain"
            />
          ) : null}
          <p className="font-mono text-[9px] tracking-[0.22em] text-[#c9a227] uppercase">
            The Loan Playbook · Broadview Lending
          </p>
        </div>
        <p className="font-mono text-[8px] tracking-[0.16em] text-zinc-600 uppercase">
          Powered by The Loan Playbook + Broadview Lending
        </p>
      </header>

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-14 md:py-20">
        <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#7c3aed]/10 via-zinc-950/80 to-[#c9a227]/10 p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {hasVisuals ? (
              <div className="flex shrink-0 flex-col items-center gap-3 md:items-start">
                {agent.headshotUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={agent.headshotUrl}
                    alt=""
                    className="h-28 w-28 rounded-2xl border-2 border-[var(--agent-brand,#c9a227)]/40 object-cover shadow-lg"
                  />
                ) : null}
                {agent.logoUrl && !agent.headshotUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={agent.logoUrl}
                    alt=""
                    className="h-20 max-w-[200px] object-contain"
                  />
                ) : null}
              </div>
            ) : null}

            <div className="min-w-0 flex-1 space-y-5">
              <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                Your premium financing tool
              </p>
              <h1 className="text-4xl font-medium tracking-tight text-white md:text-5xl">
                Get a custom financing playbook from{" "}
                <span className="text-[var(--agent-brand,#c9a227)]">{agent.name}</span>{" "}
                and Chris Butler
              </h1>
              {brokerage ? (
                <p className="text-lg text-zinc-400">{brokerage}</p>
              ) : null}
              {agent.bio ? (
                <p className="text-base leading-relaxed text-zinc-300">{agent.bio}</p>
              ) : (
                <p className="text-base leading-relaxed text-zinc-300">
                  Model your deal in minutes. Chris Butler and Broadview Lending prepare
                  an educational Playbook Report—payment framing, structure tradeoffs,
                  risks, and next steps. Not a loan approval or guaranteed rate quote.
                </p>
              )}

              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• Co-branded Playbook you can review with {agent.name}</li>
                <li>• Strategy notes built for real decisions—not generic calculators</li>
                <li>• Optional Strategy Call with Chris to confirm program fit</li>
              </ul>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link href={analyzeHref}>
                  <Button variant="gold" size="lg" className="w-full sm:w-auto">
                    Analyze My Scenario
                  </Button>
                </Link>
                <Link
                  href="/deal-analyzer"
                  className="inline-flex h-12 items-center justify-center rounded-full px-6 font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase hover:text-zinc-300"
                >
                  Standard analyzer
                </Link>
              </div>
            </div>
          </div>
        </section>

        {(phone || email) ? (
          <section className="mt-8 rounded-2xl border border-[var(--agent-brand,#c9a227)]/25 bg-zinc-950/80 p-6 md:p-8">
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase">
              Connect with {agent.name}
            </p>
            <p className="mt-2 text-lg font-medium text-white">
              Questions before you analyze?
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Reach out directly—Chris prepares the financing strategy; your agent guides
              the relationship.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="inline-flex h-11 items-center rounded-full border border-white/[0.12] px-6 font-mono text-[10px] tracking-[0.14em] text-white uppercase hover:border-[var(--agent-brand,#c9a227)]/50"
                >
                  Call {phone}
                </a>
              ) : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex h-11 items-center rounded-full border border-white/[0.12] px-6 font-mono text-[10px] tracking-[0.14em] text-zinc-300 uppercase hover:text-white"
                >
                  Email {agent.name}
                </a>
              ) : null}
            </div>
          </section>
        ) : null}

        <p className="mt-10 text-center text-xs leading-relaxed text-zinc-600">
          Powered by The Loan Playbook + Broadview Lending · Educational estimates only ·
          Referral: {agent.referralCode}
        </p>
      </main>
    </div>
  );
}
