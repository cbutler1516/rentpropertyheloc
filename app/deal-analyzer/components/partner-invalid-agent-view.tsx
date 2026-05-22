import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

type PartnerInvalidAgentViewProps = {
  agentSlug: string;
};

export function PartnerInvalidAgentView({ agentSlug }: PartnerInvalidAgentViewProps) {
  return (
    <div className="mx-auto max-w-lg py-12">
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <p className="font-mono text-[10px] tracking-[0.28em] text-amber-200/80 uppercase">
            Partner link
          </p>
          <CardTitle className="text-xl">This partner page isn&apos;t available</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-400">
            We couldn&apos;t find an active partner profile for{" "}
            <span className="font-mono text-zinc-300">{agentSlug}</span>. The link may
            be outdated, or the agent hasn&apos;t been set up yet.
          </p>
          <p className="text-sm text-zinc-500">
            You can still use the public Deal Analyzer with financing strategy from
            Chris Butler at Broadview Lending.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/deal-analyzer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#c9a227] to-[#e8c547] px-6 font-mono text-[10px] tracking-[0.16em] text-black uppercase"
            >
              Open Deal Analyzer
            </Link>
            <Link
              href="/partners"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-6 font-mono text-[10px] tracking-[0.16em] text-zinc-400 uppercase hover:border-zinc-500"
            >
              View partners
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
