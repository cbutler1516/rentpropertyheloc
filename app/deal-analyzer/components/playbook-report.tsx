"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { dealPathMeta } from "../lib/constants";
import { normalizeStoredNarrative } from "../lib/generate-narrative";
import {
  generateStaticNarrative,
  type PlaybookNarrative,
} from "../lib/report-content";
import type { DealAnalysisResult, DealInputs, LeadCapture } from "../lib/types";
import { MetricTile } from "./metric-tile";
import { ReportNarrativeSections } from "./report-narrative-sections";
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
      <ReportNarrativeSections
        narrative={narrative}
        pathLabel={pathMeta.label}
        clientName={clientName}
        agentName={agentName}
        createdAt={reportMeta?.createdAt}
        showAgentShare={showAgentShare}
        isAi={narrative.source === "ai"}
        showFooterCta={false}
        part="header"
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile
          label="Est. monthly payment"
          value={formatCurrency(analysis.payment.total)}
          highlight="purple"
        />
        <MetricTile
          label="Loan amount"
          value={formatCurrency(analysis.loanAmount)}
        />
        <MetricTile label="LTV" value={formatPercent(analysis.ltv, 1)} />
        <MetricTile
          label="Down / equity"
          value={formatCurrency(analysis.downPaymentAmount)}
          highlight="gold"
        />
      </section>

      {analysis.investor ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricTile
            label="DSCR"
            value={`${formatNumber(analysis.investor.dscr, 2)}x`}
            highlight="purple"
          />
          <MetricTile
            label="Cap rate"
            value={formatPercent(analysis.investor.capRate, 2)}
          />
          <MetricTile
            label="Monthly cash flow"
            value={formatCurrency(analysis.investor.monthlyCashFlow)}
            highlight="gold"
          />
          <MetricTile
            label="Annual NOI (est.)"
            value={formatCurrency(analysis.investor.noi)}
          />
        </section>
      ) : null}

      {analysis.commercial ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricTile
            label="DSCR"
            value={`${formatNumber(analysis.commercial.dscr, 2)}x`}
            highlight="purple"
          />
          <MetricTile
            label="Cap rate"
            value={formatPercent(analysis.commercial.capRate, 2)}
          />
          <MetricTile
            label="Debt yield"
            value={formatPercent(analysis.commercial.debtYield, 2)}
          />
          <MetricTile
            label="Monthly cash flow"
            value={formatCurrency(analysis.commercial.monthlyCashFlow)}
            highlight="gold"
          />
        </section>
      ) : null}

      {analysis.refinance ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricTile
            label="Current payment"
            value={formatCurrency(analysis.refinance.currentPayment)}
          />
          <MetricTile
            label="Proposed payment"
            value={formatCurrency(analysis.refinance.newPayment)}
            highlight="purple"
          />
          <MetricTile
            label="Break-even"
            value={
              analysis.refinance.breakEvenMonths
                ? `${analysis.refinance.breakEvenMonths} mo`
                : "—"
            }
            sub={
              analysis.refinance.monthlySavings >= 0
                ? `${formatCurrency(analysis.refinance.monthlySavings)}/mo savings`
                : "No monthly savings at these inputs"
            }
            highlight="gold"
          />
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment composition</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentBreakdownChart analysis={analysis} />
          </CardContent>
        </Card>

        {(analysis.chartData.cashFlowSeries?.length ?? 0) > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Cash flow view</CardTitle>
            </CardHeader>
            <CardContent>
              <CashFlowChart analysis={analysis} />
            </CardContent>
          </Card>
        ) : null}

        {(analysis.chartData.refinanceSeries?.length ?? 0) > 0 ? (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Refinance comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <RefinanceComparisonChart analysis={analysis} />
            </CardContent>
          </Card>
        ) : null}
      </div>

      {analysis.buydown && analysis.buydown.type !== "none" ? (
        <Card>
          <CardHeader>
            <CardTitle>Buydown impact (illustrative)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <MetricTile
              label="Year 1 payment"
              value={formatCurrency(analysis.buydown.yearOnePayment)}
            />
            <MetricTile
              label="Year 2 payment"
              value={formatCurrency(analysis.buydown.yearTwoPayment)}
            />
            <MetricTile
              label="2-year savings"
              value={formatCurrency(analysis.buydown.totalTwoYearSavings)}
              highlight="gold"
            />
          </CardContent>
        </Card>
      ) : null}

      {analysis.sellerConcession ? (
        <Card>
          <CardHeader>
            <CardTitle>Seller concession impact</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <MetricTile
              label="Est. cash to close (before)"
              value={formatCurrency(
                analysis.sellerConcession.estimatedCashToCloseBefore,
              )}
            />
            <MetricTile
              label="Est. cash to close (after)"
              value={formatCurrency(
                analysis.sellerConcession.estimatedCashToCloseAfter,
              )}
              highlight="gold"
            />
          </CardContent>
        </Card>
      ) : null}

      <ReportNarrativeSections
        narrative={narrative}
        pathLabel={pathMeta.label}
        clientName={clientName}
        agentName={agentName}
        createdAt={reportMeta?.createdAt}
        showAgentShare={showAgentShare}
        isAi={narrative.source === "ai"}
        showFooterCta={showFooterCta}
        part="body"
      />
    </div>
  );
}
