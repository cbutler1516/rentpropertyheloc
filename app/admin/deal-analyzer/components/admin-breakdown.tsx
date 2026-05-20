import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import type { DealAnalyzerDashboardStats } from "@/app/deal-analyzer/lib/admin/types";

type AdminBreakdownProps = {
  stats: DealAnalyzerDashboardStats;
};

export function AdminBreakdown({ stats }: AdminBreakdownProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-white/[0.06] bg-zinc-950/50">
        <CardHeader>
          <CardTitle className="text-base">Lead type breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {stats.leadTypeBreakdown.length === 0 ? (
            <p className="text-sm text-zinc-500">No leads yet.</p>
          ) : (
            stats.leadTypeBreakdown.map((row) => (
              <div
                key={row.role}
                className="flex items-center justify-between rounded-lg border border-white/[0.04] px-3 py-2"
              >
                <span className="text-sm text-zinc-300">{row.role}</span>
                <span className="font-mono text-sm text-[#c9a227]">{row.count}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border-white/[0.06] bg-zinc-950/50">
        <CardHeader>
          <CardTitle className="text-base">Deal type breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {stats.dealTypeBreakdown.every((d) => d.count === 0) ? (
            <p className="text-sm text-zinc-500">No scenarios yet.</p>
          ) : (
            stats.dealTypeBreakdown.map((row) => (
              <div
                key={row.dealType}
                className="flex items-center justify-between rounded-lg border border-white/[0.04] px-3 py-2"
              >
                <span className="text-sm text-zinc-300">{row.label}</span>
                <span className="font-mono text-sm text-[#7c3aed]">{row.count}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
