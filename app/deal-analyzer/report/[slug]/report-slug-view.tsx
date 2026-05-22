"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { fetchDealReportBySlug } from "../../lib/persist-report";
import { normalizeStoredNarrative } from "../../lib/generate-narrative";
import type { StoredReportPayload } from "../../lib/supabase/types";
import { PlaybookReportDocument } from "../../components/playbook-report-document";
import { ReportLoadingSkeleton } from "../../components/deal-analyzer-skeleton";
import { ReportActions } from "../../components/report-actions";
import { useDealAnalyzer } from "../../components/deal-analyzer-provider";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string; notFound?: boolean }
  | { status: "ready"; data: StoredReportPayload };

export function ReportSlugView({ slug }: { slug: string }) {
  const { reset } = useDealAnalyzer();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ status: "loading" });
      const result = await fetchDealReportBySlug(slug);
      if (cancelled) return;

      if (!result.ok) {
        setState({
          status: "error",
          message: result.error,
        });
        return;
      }

      setState({ status: "ready", data: result.data });
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const readyData = state.status === "ready" ? state.data : null;

  const narrative = useMemo(() => {
    if (!readyData) return null;
    return normalizeStoredNarrative(
      readyData.narrative,
      readyData.inputs,
      readyData.analysis,
      {
        leadRole: readyData.lead.role,
        leadName: readyData.lead.name,
        agentName: readyData.agentName ?? readyData.lead.agentName,
        partnerAgentName: readyData.partnerAgentName ?? readyData.agentName ?? undefined,
      },
    );
  }, [readyData]);

  const reportTitle = useMemo(() => {
    if (!readyData) return undefined;
    const clientName = readyData.lead.name?.trim();
    return clientName
      ? `Playbook Report — ${clientName}`
      : `Playbook Report — ${slug}`;
  }, [readyData, slug]);

  if (state.status === "loading") {
    return <ReportLoadingSkeleton />;
  }

  if (state.status === "error") {
    const isNotFound = state.notFound ?? /not found/i.test(state.message);
    return (
      <Card className="mx-auto max-w-lg border-white/[0.08]">
        <CardHeader>
          <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
            {isNotFound ? "404" : "Error"}
          </p>
          <CardTitle>
            {isNotFound ? "This Playbook Report link isn’t available" : "Couldn’t load report"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-400">
            {isNotFound
              ? "The link may be mistyped, expired, or the report was never saved to the cloud. If you just completed the analyzer on this device, try unlocking the report again from the lead step."
              : state.message}
          </p>
          {slug ? (
            <p className="break-all font-mono text-[10px] text-zinc-600">
              Slug: {slug}
            </p>
          ) : null}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/deal-analyzer/analyze"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#c9a227] to-[#e8c547] px-6 font-mono text-[10px] tracking-[0.16em] text-black uppercase"
            >
              Start new analysis
            </Link>
            <Link
              href="/deal-analyzer"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-zinc-700 px-6 font-mono text-[10px] tracking-[0.16em] text-zinc-400 uppercase"
            >
              Deal Analyzer home
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { data } = state;

  return (
    <div className="space-y-6 md:space-y-8">
      <Card className="deal-analyzer-no-print border-[#7c3aed]/20 bg-[#7c3aed]/5">
        <CardContent className="py-4 sm:py-5">
          <ReportActions
            slug={slug}
            dealType={data.inputs.path}
            reportTitle={reportTitle}
            agentShareMessage={narrative?.agentShareMessage}
            onNewAnalysis={() => {
              reset();
            }}
          />
        </CardContent>
      </Card>

      <PlaybookReportDocument
        slug={data.slug}
        inputs={data.inputs}
        analysis={data.analysis}
        narrative={data.narrative}
        lead={data.lead}
        createdAt={data.createdAt}
        agentName={data.partnerAgentName ?? data.agentName}
        referralSource={data.referralSource}
        partnerBranding={data.partnerBranding ?? null}
      />
    </div>
  );
}
