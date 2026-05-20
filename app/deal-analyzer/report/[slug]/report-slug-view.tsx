"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { fetchDealReportBySlug } from "../../lib/persist-report";
import { normalizeStoredNarrative } from "../../lib/generate-narrative";
import type { StoredReportPayload } from "../../lib/supabase/types";
import { PlaybookReportDocument } from "../../components/playbook-report-document";
import { ReportActions } from "../../components/report-actions";
import { useDealAnalyzer } from "../../components/deal-analyzer-provider";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
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
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-[#7c3aed] border-t-transparent"
          aria-hidden
        />
        <p className="text-center font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
          Loading Playbook Report…
        </p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>Report not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-zinc-400">{state.message}</p>
          <Link
            href="/deal-analyzer/analyze"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#c9a227] to-[#e8c547] px-6 font-mono text-[10px] tracking-[0.16em] text-black uppercase sm:w-auto"
          >
            Start a new analysis
          </Link>
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
        agentName={data.agentName}
        referralSource={data.referralSource}
      />
    </div>
  );
}
