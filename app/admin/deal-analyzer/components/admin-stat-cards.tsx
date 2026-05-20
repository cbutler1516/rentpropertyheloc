import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import type { DealAnalyzerDashboardStats } from "@/app/deal-analyzer/lib/admin/types";

type AdminStatCardsProps = {
  stats: DealAnalyzerDashboardStats;
};

export function AdminStatCards({ stats }: AdminStatCardsProps) {
  const cards = [
    {
      label: "Total reports",
      value: stats.totalReports.toLocaleString(),
      sub: "All Playbook reports saved",
    },
    {
      label: "New this week",
      value: stats.newLeadsThisWeek.toLocaleString(),
      sub: "Reports since Monday",
    },
    {
      label: "Agent-sourced",
      value: stats.agentSourcedCount.toLocaleString(),
      sub: "Agent role or referral",
    },
    {
      label: "Missing contact",
      value: stats.missingContactCount.toLocaleString(),
      sub: "Needs email or phone cleanup",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="border-white/[0.06] bg-zinc-950/50">
          <CardHeader className="pb-2">
            <CardTitle className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              {card.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-medium text-white">{card.value}</p>
            <p className="mt-1 text-xs text-zinc-500">{card.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
