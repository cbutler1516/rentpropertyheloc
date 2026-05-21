import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignPublicView } from "@/app/content-engine/components/campaign-public-view";
import { getPublishedPageBySlug } from "@/app/content-engine/lib/published-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);
  if (!page) {
    return { title: "Campaign not found | The Loan Playbook" };
  }
  return {
    title: `${page.landingPage.sections.heroHeadline} | The Loan Playbook`,
    description: page.landingPage.sections.heroSubheadline,
    robots: { index: true, follow: true },
  };
}

export default async function CampaignPublicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);
  if (!page) notFound();

  return <CampaignPublicView page={page} />;
}
