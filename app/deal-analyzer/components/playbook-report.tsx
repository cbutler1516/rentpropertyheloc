"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { dealPathMeta, STRATEGY_CALL_URL } from "../lib/constants";
import {
  generateStaticNarrative,
  type PlaybookNarrative,
} from "../lib/report-content";
import { normalizeStoredNarrative } from "../lib/generate-narrative";
import type { DealAnalysisResult, DealInputs, LeadCapture } from "../lib/types";
import { AgentShareBox } from "./agent-share-box";
import { MetricTile } from "./metric-tile";
import {
  CashFlowChart,
  PaymentBreakdownChart,
  RefinanceComparisonChart,
} from "./report-charts";

export type ReportMeta = {
  slug?: string;
  createdAt?: string;
  lead?: LeadCapture;
  agentName?: string | null;
  referralSource?: string | null;
  isSharedView?: boolean;
};

type PlaybookReportProps = {
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative?: PlaybookNarrative | unknown;
  reportMeta?: ReportMeta;
  showFooterCta?: boolean;
};

function resolveNarrative(
  narrativeProp: PlaybookNarrative | unknown | undefined,
  inputs: DealInputs,
  analysis: DealAnalysisResult,
  reportMeta?: ReportMeta,
): PlaybookNarrative {
  if (narrativeProp && typeof narrativeProp === "object") {
    return normalizeStoredNarrative(narrativeProp, inputs, analysis, {
      leadRole: reportMeta?.lead?.role,
      leadName: reportMeta?.lead?.name,
      agentName: reportMeta?.agentName ?? reportMeta?.lead?.agentName,
    });
  }
  return generateStaticNarrative(inputs, analysis, {
    leadRole: reportMeta?.lead?.role,
    leadName: reportMeta?.lead?.name,
    agentName: reportMeta?.agentName ?? reportMeta?.lead?.agentName,
  });
}

export function PlaybookReport({
  inputs,
  analysis,
  narrative: narrativeProp,
  reportMeta,
  showFooterCta = true,
}: PlaybookReportProps) {
  const pathMeta = dealPathMeta[inputs.path];
  const narrative = resolveNarrative(
    narrativeProp,
    inputs,
    analysis,
    reportMeta,
  );

  const clientName = reportMeta?.lead?.name;
  const agentName =
    reportMeta?.agentName || reportMeta?.lead?.agentName || null;
  const isAgentContext =
    reportMeta?.lead?.role === "Agent" || Boolean(agentName);
  const showAgentShare =
    isAgentContext || Boolean(narrative.agentShareMessage?.trim());

  return (
    <div className="space-y-10">
      <header className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#7c3aed]/15 via-zinc-950 to-[#c9a227]/10 p-8 md:p-10">
        <motionBg />
      </header>
    </motionBg>
  );
}

function motionBg() {
  return null;
}
