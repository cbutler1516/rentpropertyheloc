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

type ScenarioPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return hostedScenarioSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ScenarioPageProps): Promise<Metadata> {
  const { slug } = await params;
  const funnel = getScenarioFunnel(slug);

  if (!funnel) {
    return { title: "Scenario | The Loan Playbook" };
  }

  return createMoneyFunnelMetadata(funnel);
}

export default async function ScenarioHostedPage({ params }: ScenarioPageProps) {
  const { slug } = await params;
  const funnel = getScenarioFunnel(slug);

  if (!funnel || !hostedScenarioSlugs.includes(slug)) {
    notFound();
  }

  return <MoneyFunnelPage funnel={funnel} />;
}
