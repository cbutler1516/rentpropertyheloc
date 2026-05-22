"use client";

import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { generateAgentLandingPageKit } from "@/app/deal-analyzer/lib/agent-landing-kit";
import type { PartnerLandingPageStat } from "@/app/deal-analyzer/lib/agent-types";

type AdminAgentLandingKitProps = {
  agent: { name: string; slug: string };
  siteUrl: string;
  landingPageStats?: PartnerLandingPageStat[];
};

export function AdminAgentLandingKit({
  agent,
  siteUrl,
  landingPageStats = [],
}: AdminAgentLandingKitProps) {
  const kit = useMemo(
    () => generateAgentLandingPageKit(agent, siteUrl),
    [agent, siteUrl],
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copyText(key: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2000);
  }

  const totalViews = landingPageStats.reduce((sum, row) => sum + row.views, 0);
  const totalLandingLeads = landingPageStats.reduce(
    (sum, row) => sum + row.leads,
    0,
  );

  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
            Branded calculator landing pages
          </p>
          <p className="text-sm text-zinc-400">
            {totalViews} views · {totalLandingLeads} leads from calculator pages
            (last 90 days)
          </p>
        </div>
        <Button
          type="button"
          variant="gold"
          size="sm"
          onClick={() => void copyText("fullLandingKit", kit.fullKit)}
        >
          {copiedKey === "fullLandingKit" ? "Copied" : "Copy full landing page kit"}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
              <th className="px-3 py-2">Calculator</th>
              <th className="px-3 py-2">Views</th>
              <th className="px-3 py-2">Leads</th>
              <th className="px-3 py-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {kit.calculatorLinks.map((link) => {
              const stat = landingPageStats.find((s) => s.slug === link.slug);
              return (
                <tr
                  key={link.slug}
                  className="border-b border-white/[0.04] text-zinc-400"
                >
                  <td className="px-3 py-2 text-zinc-200">{link.label}</td>
                  <td className="px-3 py-2">{stat?.views ?? 0}</td>
                  <td className="px-3 py-2">{stat?.leads ?? 0}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="font-mono text-[9px] tracking-[0.12em] text-[#c9a227] uppercase hover:text-[#e8c547]"
                      onClick={() => void copyText(link.slug, link.url)}
                    >
                      {copiedKey === link.slug ? "Copied" : "Copy"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
