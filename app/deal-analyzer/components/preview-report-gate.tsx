"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { dealPathMeta } from "../lib/constants";
import { getPreviewTeasers } from "../lib/preview-content";
import { useDealAnalyzer } from "./deal-analyzer-provider";
import {
  useDealAnalyzerBasePath,
  usePartnerAgent,
} from "./partner-agent-provider";

const MASK = "••••••";

const PLACEHOLDER_METRICS = [
  { label: "Est. monthly payment", mask: "$•••,•••" },
  { label: "Loan amount", mask: "$•••,•••" },
  { label: "LTV", mask: "••%" },
  { label: "Down / equity", mask: "$•••,•••" },
];

function LockedOverlay({ label }: { label: string }) {
  return (
    <div className="playbook-preview-locked__overlay">
      <span className="font-mono text-[9px] tracking-[0.22em] text-[#c9a227] uppercase">
        Locked
      </span>
      <span className="text-xs text-zinc-400">{label}</span>
    </div>
  );
}

function BlurredChartPlaceholder({ title }: { title: string }) {
  return (
    <Card className="border-white/[0.06]">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="playbook-preview-locked h-48">
          <div className="playbook-preview-locked__content flex h-full items-end justify-center gap-3 px-6 pb-4">
            {[40, 65, 50, 80, 55].map((h, i) => (
              <div
                key={i}
                className="w-10 rounded-t-md bg-gradient-to-t from-[#7c3aed]/40 to-[#c9a227]/30"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <LockedOverlay label="Unlock to view chart values" />
        </div>
      </CardContent>
    </Card>
  );
}

export function PreviewReportGate() {
  const router = useRouter();
  const basePath = useDealAnalyzerBasePath();
  const partner = usePartnerAgent();
  const { inputs, analysis } = useDealAnalyzer();

  if (!inputs || !analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Build your scenario first</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="gold" onClick={() => router.push(`${basePath}/analyze`)}>
            Back to analyzer
          </Button>
        </CardContent>
      </Card>
    );
  }

  const teasers = getPreviewTeasers(inputs, analysis);
  const pathMeta = dealPathMeta[inputs.path];

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-2xl border border-[#c9a227]/25 bg-gradient-to-br from-[#7c3aed]/20 via-zinc-950 to-[#c9a227]/15 p-8 md:p-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#c9a227]/20 blur-3xl"
          aria-hidden
        />
        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">Playbook Report Preview</Badge>
            <Badge variant="purple">{pathMeta.eyebrow}</Badge>
          </div>
          {partner?.agent ? (
            <p className="text-sm text-zinc-400">
              Financing strategy by Chris Butler · shared via{" "}
              <span className="text-white">{partner.agent.name}</span>
            </p>
          ) : null}
          <p className="font-mono text-[10px] tracking-[0.24em] text-[#c9a227] uppercase">
            {teasers.shortLabel} · Strategy snapshot
          </p>
          <h1 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
            Your {teasers.pathLabel} Playbook is ready
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-300">
            We modeled your scenario. Unlock the full report to see payments, charts,
            Coach&apos;s Notes, risks, and your personalized next steps.
          </p>
        </div>
      </header>

      <section className="space-y-4">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Strategy headlines
        </p>
        <ul className="space-y-3">
          {teasers.headlines.map((line) => (
            <li
              key={line}
              className="rounded-xl border border-white/[0.08] bg-zinc-950/60 px-5 py-4 text-sm leading-relaxed text-zinc-200"
            >
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
          Deal snapshot — key metrics
        </p>
        <div className="playbook-preview-locked rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-4">
          <div className="playbook-preview-locked__content grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PLACEHOLDER_METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3"
              >
                <p className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">
                  {m.label}
                </p>
                <p className="playbook-preview-mask mt-1 text-2xl font-medium">
                  {m.mask}
                </p>
              </div>
            ))}
          </div>
          <LockedOverlay label="Unlock to see your numbers" />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <BlurredChartPlaceholder title="Payment composition" />
        <BlurredChartPlaceholder title="Cash flow view" />
      </div>

      <section className="playbook-preview-locked rounded-2xl border border-[#c9a227]/20 bg-gradient-to-b from-[#c9a227]/10 to-transparent p-6 md:p-8">
        <div className="playbook-preview-locked__content space-y-3">
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
            Coach&apos;s Notes
          </p>
          {[1, 2, 3].map((i) => (
            <p key={i} className="text-sm text-zinc-400">
              {MASK} {MASK} {MASK} {MASK} {MASK} {MASK} {MASK}
            </p>
          ))}
        </div>
        <LockedOverlay label="Chris Butler's personalized read" />
      </section>

      <Card className="border-[#c9a227]/40 bg-gradient-to-br from-[#c9a227]/15 via-zinc-950 to-[#7c3aed]/15">
        <CardContent className="space-y-5 py-8 text-center md:py-10">
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
            Full Playbook Report
          </p>
          <h2 className="text-2xl font-medium text-white md:text-3xl">
            Unlock Your Full Playbook Report
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-zinc-400">
            {teasers.trustLine}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              variant="gold"
              size="lg"
              onClick={() => router.push(`${basePath}/analyze?step=lead`)}
            >
              Unlock My Full Playbook
            </Button>
            <Link
              href={`${basePath}/analyze`}
              className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase hover:text-zinc-300"
            >
              Edit scenario
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
