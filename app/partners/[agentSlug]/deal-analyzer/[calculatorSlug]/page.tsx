import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DealAnalyzerSeoLanding } from "@/app/deal-analyzer/components/deal-analyzer-seo-landing";
import { partnerDealAnalyzerBase } from "@/app/deal-analyzer/lib/agent-types";
import {
  parsePartnerCalculatorSlug,
} from "@/app/deal-analyzer/lib/partner-seo-landing-route";
import {
  buildPartnerSeoLandingMetadata,
  getSeoLandingContent,
} from "@/app/deal-analyzer/lib/seo-landing-content";
import { fetchAgentBySlug } from "@/app/deal-analyzer/lib/supabase/agents";

type PageProps = {
  params: Promise<{ agentSlug: string; calculatorSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { agentSlug, calculatorSlug } = await params;
  const slug = parsePartnerCalculatorSlug(calculatorSlug);
  if (!slug) {
    return { title: "Deal Analyzer | The Loan Playbook" };
  }

  const agent = await fetchAgentBySlug(agentSlug);
  if (!agent || "error" in agent) {
    return { title: "Deal Analyzer | The Loan Playbook" };
  }

  return buildPartnerSeoLandingMetadata(slug, agent.name);
}

export default async function PartnerCalculatorLandingPage({ params }: PageProps) {
  const { agentSlug, calculatorSlug } = await params;
  const slug = parsePartnerCalculatorSlug(calculatorSlug);

  if (!slug) {
    redirect(`${partnerDealAnalyzerBase(agentSlug)}/analyze`);
  }

  const agent = await fetchAgentBySlug(agentSlug);
  if (!agent || "error" in agent) {
    notFound();
  }

  return (
    <DealAnalyzerSeoLanding
      content={getSeoLandingContent(slug)}
      partner={{ agent, agentSlug }}
    />
  );
}
