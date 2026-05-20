import { redirect } from "next/navigation";
import { partnerDealAnalyzerBase } from "@/app/deal-analyzer/lib/agent-types";

type PageProps = {
  params: Promise<{ agentSlug: string }>;
};

export default async function PartnerDealAnalyzerIndexPage({ params }: PageProps) {
  const { agentSlug } = await params;
  redirect(`${partnerDealAnalyzerBase(agentSlug)}/analyze`);
}
