"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { STRATEGY_CALL_URL } from "../lib/constants";
import type { PlaybookNarrative } from "../lib/report-content";
import { AgentShareBox } from "./agent-share-box";

function NarrativeList({
  items,
  accent = "purple",
}: {
  items: string[];
  accent?: "purple" | "gold" | "amber";
}) {
  const dot =
    accent === "gold"
      ? "text-[#c9a227]"
      : accent === "amber"
        ? "text-amber-500"
        : "text-[#7c3aed]";
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
          <span className={`mt-1 shrink-0 ${dot}`}>•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type ReportNarrativeSectionsProps = {
  narrative: PlaybookNarrative;
  pathLabel: string;
  clientName?: string;
  agentName?: string | null;
  createdAt?: string;
  showAgentShare: boolean;
  isAi: boolean;
  showFooterCta: boolean;
  /** Render header only, body only, or full report narrative */
  part?: "all" | "header" | "body";
};

export function ReportNarrativeSections({
  narrative,
  pathLabel,
  clientName,
  agentName,
  createdAt,
  showAgentShare,
  isAi,
  showFooterCta,
  part = "all",
}: ReportNarrativeSectionsProps) {
  const showHeader = part === "all" || part === "header";
  const showBody = part === "all" || part === "body";

  return (
    <>
      {showHeader ? (
      <header className="playbook-screen-only relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#7c3aed]/15 via-zinc-950 to-[#c9a227]/10 p-8 md:p-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#7c3aed]/20 blur-3xl"
          aria-hidden
        />
        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">Playbook Report</Badge>
            {isAi ? <Badge variant="purple">Chris&apos;s read</Badge> : null}
          </div>
          {clientName ? (
            <p className="font-mono text-[10px] tracking-[0.24em] text-[#c9a227] uppercase">
              Prepared for {clientName}
            </p>
          ) : null}
          {agentName ? (
            <p className="text-sm text-zinc-500">
              Shared by {agentName}
            </p>
          ) : null}
          <h1 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
            {pathLabel} — your Playbook snapshot
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-300">
            {narrative.executiveSummary}
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
            Educational estimates only — not a loan estimate, approval, or
            guaranteed terms. Confirm details with a licensed loan advisor.
          </p>
        </div>
      </header>
      ) : null}

      {showBody ? (
      <>
      <div className="playbook-print-only playbook-print-avoid-break mb-6 rounded-lg border border-[#d4d4d8] bg-[#fafafa] p-4">
        <p className="text-[9pt] font-semibold uppercase tracking-wider text-[#5b21b6]">
          Executive summary
        </p>
        <p className="mt-2 text-[10pt] leading-relaxed text-[#333]">
          {narrative.executiveSummary}
        </p>
      </div>
      <Card className="playbook-print-avoid-break border-white/[0.06] bg-zinc-950/60">
        <CardHeader>
          <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
            In plain language
          </p>
          <CardTitle className="text-xl">What this means for you</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-zinc-300">
            {narrative.clientFriendlyExplanation}
          </p>
        </CardContent>
      </Card>

      <Card className="border-[#c9a227]/25 bg-gradient-to-b from-[#c9a227]/8 to-transparent">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
              Coach&apos;s notes
            </p>
            <Badge variant="gold">Chris Butler</Badge>
            {isAi ? <Badge variant="purple">Personalized read</Badge> : null}
          </div>
          <CardTitle className="text-xl">How I&apos;d think about this deal</CardTitle>
        </CardHeader>
        <CardContent>
          <NarrativeList items={narrative.coachNotes} accent="gold" />
        </CardContent>
      </Card>

      <Card className="border-[#7c3aed]/20">
        <CardHeader>
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
            Recommended strategy
          </p>
          <CardTitle className="text-xl">Playbook read — {pathLabel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-400">
            {narrative.executiveSummary}
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">
            {narrative.recommendedStrategy}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
            What I&apos;d look at next
          </p>
          <CardTitle className="text-xl">Your next steps</CardTitle>
        </CardHeader>
        <CardContent>
          <NarrativeList items={narrative.nextSteps} accent="gold" />
        </CardContent>
      </Card>

      {showAgentShare ? (
        <div className="deal-analyzer-no-print">
          <AgentShareBox
            message={narrative.agentShareMessage}
            clientName={clientName}
          />
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risks to pressure-test</CardTitle>
          </CardHeader>
          <CardContent>
            <NarrativeList items={narrative.risks} accent="amber" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <NarrativeList items={narrative.opportunities} accent="purple" />
          </CardContent>
        </Card>
      </div>

      {showFooterCta ? (
        <Card className="border-[#c9a227]/30 bg-gradient-to-br from-[#c9a227]/10 to-[#7c3aed]/10 text-center">
          <CardContent className="space-y-5 py-10">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
              Next step
            </p>
            <h2 className="text-2xl font-medium text-white">
              Book a Strategy Call with Chris
            </h2>
            <p className="mx-auto max-w-lg text-sm text-zinc-400">
              Walk through this scenario with a licensed loan advisor—structure,
              timing, and program fit tailored to your deal. Estimates here are
              educational only.
            </p>
            <Link
              href={STRATEGY_CALL_URL}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#c9a227] to-[#e8c547] px-8 font-mono text-[11px] tracking-[0.16em] text-black uppercase hover:brightness-110"
            >
              Book a Strategy Call with Chris
            </Link>
          </CardContent>
        </Card>
      ) : null}
      </>
      ) : null}
    </>
  );
}
