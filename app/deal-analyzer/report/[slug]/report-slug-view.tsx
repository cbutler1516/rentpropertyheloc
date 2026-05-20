"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { fetchDealReportBySlug } from "../../lib/persist-report";
import type { StoredReportPayload } from "../../lib/supabase/types";
import { PlaybookReport } from "../../components/playbook-report";
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

  if (state.status === "loading") {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-[#7c3aed] border-t-transparent"
          aria-hidden
        />
        <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
          Loading Playbook Report…
        </p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Report not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-zinc-400">{state.message}</p>
          <Link
            href="/deal-analyzer/analyze"
            className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#c9a227] to-[#e8c547] px-6 font-mono text-[10px] tracking-[0.16em] text-black uppercase"
          >
            Start a new analysis
          </Link>
        </CardContent>
      </Card>
    );
  }

  const { data } = state;
  const isSharedView = true;

  return (
    <div className="space-y-8">
      <Card className="border-[#7c3aed]/20 bg-[#7c3aed]/5">
        <CardContent className="py-5">
          <ReportActions
            slug={slug}
            onNewAnalysis={() => {
              reset();
            }}
          />
        </CardContent>
      </Card>

      <PlaybookReport
        inputs={data.inputs}
        analysis={data.analysis}
        narrative={data.narrative}
        reportMeta={{
          slug: data.slug,
          createdAt: data.createdAt,
          lead: data.lead,
          agentName: data.agentName,
          referralSource: data.referralSource,
          isSharedView,
        }}
        showFooterCta
      />
    </div>
  );
}
