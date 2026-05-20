import { Badge } from "@/app/components/ui/badge";
import { PLAYBOOK_BRAND } from "../lib/brand";
import type { PartnerAgent } from "../lib/agent-types";
import { agentBrandStyle, resolveBrokerage, hasAgentVisualBranding } from "../lib/agent-branding";

type PartnerCobrandReportHeaderProps = {
  pathLabel: string;
  clientName?: string;
  agent: Pick<
    PartnerAgent,
    | "name"
    | "headshotUrl"
    | "logoUrl"
    | "brokerage"
    | "company"
    | "brandColor"
    | "bio"
    | "ctaPhone"
    | "ctaEmail"
  >;
  createdAt?: string;
  executiveSummary: string;
  isAi?: boolean;
  variant?: "screen" | "print";
};

export function PartnerCobrandReportHeader({
  pathLabel,
  clientName,
  agent,
  createdAt,
  executiveSummary,
  isAi,
  variant = "screen",
}: PartnerCobrandReportHeaderProps) {
  const brokerage = resolveBrokerage(agent);
  const brandStyle = agentBrandStyle(agent.brandColor);
  const showVisuals = hasAgentVisualBranding(agent);

  if (variant === "print") {
    return (
      <div
        className="playbook-print-only playbook-print-avoid-break mb-6 rounded-lg border border-[#d4d4d8] bg-[#fafafa] p-4"
        style={brandStyle}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9pt] font-semibold uppercase tracking-wider text-[#5b21b6]">
              {PLAYBOOK_BRAND.siteName}
            </p>
            <p className="text-[8pt] text-[#666]">{PLAYBOOK_BRAND.lendingPartnerFull}</p>
          </div>
          {agent.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={agent.logoUrl} alt="" className="h-8 max-w-[120px] object-contain" />
          ) : null}
        </div>
        {clientName ? (
          <p className="mt-3 text-[10pt] text-[#333]">
            <strong>Prepared for:</strong> {clientName}
          </p>
        ) : null}
        <p className="text-[10pt] text-[#333]">
          <strong>Shared by:</strong> {agent.name}
          {brokerage ? ` · ${brokerage}` : ""}
        </p>
        <p className="text-[10pt] text-[#333]">
          <strong>Financing strategy by:</strong> {PLAYBOOK_BRAND.strategist} /{" "}
          {PLAYBOOK_BRAND.lendingPartner}
        </p>
        <h1 className="mt-2 text-[14pt] font-semibold text-[#111]">
          {pathLabel} — Playbook snapshot
        </h1>
        <p className="mt-2 text-[10pt] leading-relaxed text-[#333]">{executiveSummary}</p>
      </div>
    );
  }

  return (
    <header
      className="playbook-screen-only relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#7c3aed]/15 via-zinc-950 to-[#c9a227]/10 p-8 md:p-10"
      style={brandStyle}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--agent-brand,#7c3aed)]/20 blur-3xl"
        aria-hidden
      />
      <div className="relative space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">Playbook Report</Badge>
            {isAi ? <Badge variant="purple">Chris&apos;s read</Badge> : null}
          </div>
          {agent.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={agent.logoUrl}
              alt=""
              className="h-10 max-w-[160px] object-contain opacity-95"
            />
          ) : null}
        </div>

        {showVisuals ? (
          <div className="flex items-center gap-4">
            {agent.headshotUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={agent.headshotUrl}
                alt=""
                className="h-16 w-16 rounded-2xl border border-white/[0.1] object-cover"
              />
            ) : null}
            <div>
              <p className="text-sm font-medium text-white">{agent.name}</p>
              {brokerage ? <p className="text-xs text-zinc-500">{brokerage}</p> : null}
            </div>
          </div>
        ) : null}

        {clientName ? (
          <p className="font-mono text-[10px] tracking-[0.24em] text-[#c9a227] uppercase">
            Prepared for {clientName}
          </p>
        ) : null}
        <p className="text-sm text-zinc-500">
          Shared by <span className="text-zinc-300">{agent.name}</span>
        </p>
        <p className="text-xs text-zinc-500">
          Financing strategy by {PLAYBOOK_BRAND.strategist} / {PLAYBOOK_BRAND.lendingPartner}
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
          {pathLabel} — your Playbook snapshot
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-300">
          {executiveSummary}
        </p>
        {createdAt ? (
          <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
            Generated{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        ) : null}
        <p className="text-xs text-zinc-600">
          Educational estimates only — not a loan estimate, approval, or guaranteed terms.
        </p>
      </div>
    </header>
  );
}
