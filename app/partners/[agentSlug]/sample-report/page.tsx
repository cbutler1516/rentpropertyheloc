import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PlaybookReportDocument } from "@/app/deal-analyzer/components/playbook-report-document";
import { buildSampleReportForAgent } from "@/app/deal-analyzer/lib/agent-sample-report";
import { fetchAgentBySlug } from "@/app/deal-analyzer/lib/supabase/agents";

type PageProps = {
  params: Promise<{ agentSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { agentSlug } = await params;
  const agent = await fetchAgentBySlug(agentSlug);
  if (!agent || "error" in agent) {
    return { title: "Sample Report | The Loan Playbook" };
  }
  return {
    title: `Sample Playbook — ${agent.name}`,
    description: `Preview co-branded Playbook Report for ${agent.name}.`,
  };
}

export default async function PartnerSampleReportPage({ params }: PageProps) {
  const { agentSlug } = await params;
  const result = await fetchAgentBySlug(agentSlug);

  if (!result || "error" in result) {
    redirect("/deal-analyzer");
  }

  const sample = buildSampleReportForAgent(result);

  return (
    <div className="min-h-screen bg-[#030712] px-4 py-10 text-white md:px-8">
      <p className="mx-auto mb-6 max-w-4xl font-mono text-[9px] tracking-[0.2em] text-amber-400/90 uppercase">
        Sample report preview — branding only · not a live client report
      </p>
      <div className="mx-auto max-w-4xl">
        <PlaybookReportDocument
          slug={sample.slug}
          inputs={sample.inputs}
          analysis={sample.analysis}
          narrative={sample.narrative}
          lead={sample.lead}
          createdAt={sample.createdAt}
          agentName={sample.agentName}
          referralSource={sample.referralSource}
          partnerBranding={result}
        />
      </div>
    </div>
  );
}
