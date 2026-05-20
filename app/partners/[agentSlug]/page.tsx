import type { Metadata } from "next";
import { PartnerLandingView } from "@/app/deal-analyzer/components/partner-landing-view";
import { fetchAgentBySlug } from "@/app/deal-analyzer/lib/supabase/agents";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ agentSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { agentSlug } = await params;
  const agent = await fetchAgentBySlug(agentSlug);
  if (!agent || "error" in agent) {
    return { title: "Partner | The Loan Playbook" };
  }

  return {
    title: `${agent.name} — Financing Playbook | The Loan Playbook`,
    description: `Get a custom financing playbook from ${agent.name} and Chris Butler at Broadview Lending.`,
  };
}

export default async function PartnerAgentLandingPage({ params }: PageProps) {
  const { agentSlug } = await params;
  const result = await fetchAgentBySlug(agentSlug);

  if (!result || "error" in result) {
    redirect("/deal-analyzer");
  }

  return <PartnerLandingView agent={result} />;
}
