import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { DealAnalyzerReportRow } from "@/app/deal-analyzer/lib/admin/types";
type AdminHighlightsProps = {
  topOpportunities: DealAnalyzerReportRow[];
  agentSourced: DealAnalyzerReportRow[];
  missingContact: DealAnalyzerReportRow[];
};

function scoreBadgeVariant(
  label: DealAnalyzerReportRow["leadScoreLabel"],
): "gold" | "purple" | "default" | "warning" {
  if (label === "Hot") return "gold";
  if (label === "Warm") return "purple";
  if (label === "Standard") return "default";
  return "warning";
}

function HighlightList({
  title,
  items,
  emptyMessage,
}: {
  title: string;
  items: DealAnalyzerReportRow[];
  emptyMessage: string;
}) {
  return (
    <Card className="border-white/[0.06] bg-zinc-950/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">{emptyMessage}</p>
        ) : (
          items.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-white/[0.05] bg-black/20 p-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link
                    href={`/deal-analyzer/report/${row.slug}`}
                    className="font-medium text-white hover:text-[#c4b5fd]"
                  >
                    {row.leadName}
                  </Link>
                  <p className="text-xs text-zinc-500">
                    {row.dealTypeLabel} · {formatCurrency(row.loanAmount)}
                  </p>
                </div>
                <Badge variant={scoreBadgeVariant(row.leadScoreLabel)}>
                  {row.leadScoreLabel} · {row.leadScore}
                </Badge>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                {row.suggestedFollowUp}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function AdminHighlights({
  topOpportunities,
  agentSourced,
  missingContact,
}: AdminHighlightsProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <HighlightList
        title="Highest-value opportunities"
        items={topOpportunities}
        emptyMessage="No scored reports yet."
      />
      <HighlightList
        title="Agent-sourced leads"
        items={agentSourced}
        emptyMessage="No agent referrals yet."
      />
      <HighlightList
        title="Missing contact info"
        items={missingContact}
        emptyMessage="All leads have email and phone."
      />
    </div>
  );
}
