import { notFound } from "next/navigation";
import { DealAnalyzerSeoLanding } from "../components/deal-analyzer-seo-landing";
import { fetchAgentBySlug } from "./supabase/agents";
import {
  buildPartnerSeoLandingMetadata,
  getSeoLandingContent,
  isSeoLandingSlug,
  type SeoLandingSlug,
} from "./seo-landing-content";

export function createPartnerSeoLandingPage(calculatorSlug: SeoLandingSlug) {
  return async function PartnerSeoLandingPage({
    params,
  }: {
    params: Promise<{ agentSlug: string }>;
  }) {
    const { agentSlug } = await params;
    const agent = await fetchAgentBySlug(agentSlug);

    if (!agent || "error" in agent) {
      notFound();
    }

    return (
      <DealAnalyzerSeoLanding
        content={getSeoLandingContent(calculatorSlug)}
        partner={{ agent, agentSlug }}
      />
    );
  };
}

export function createPartnerSeoLandingGenerateMetadata(
  calculatorSlug: SeoLandingSlug,
) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ agentSlug: string }>;
  }) {
    const { agentSlug } = await params;
    const agent = await fetchAgentBySlug(agentSlug);

    if (!agent || "error" in agent) {
      return { title: "Calculator | The Loan Playbook" };
    }

    return buildPartnerSeoLandingMetadata(calculatorSlug, agent.name);
  };
}

export function parsePartnerCalculatorSlug(
  value: string,
): SeoLandingSlug | null {
  return isSeoLandingSlug(value) ? value : null;
}
