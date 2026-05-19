import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  createMoneyFunnelMetadata,
  MoneyFunnelPage,
} from "../../components/money-funnel-page";
import {
  getScenarioFunnel,
  hostedScenarioSlugs,
} from "../../lib/scenario-registry";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return hostedScenarioSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const funnel = getScenarioFunnel(slug);

  if (!funnel) {
    return { title: "Financing Guide | The Loan Playbook" };
  }

  return createMoneyFunnelMetadata(funnel);
}

export default async function GuideHostedPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const funnel = getScenarioFunnel(slug);

  if (!funnel || !hostedScenarioSlugs.includes(slug)) {
    notFound();
  }

  return <MoneyFunnelPage funnel={funnel} />;
}
