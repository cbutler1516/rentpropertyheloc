import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignPublicView } from "@/app/content-engine/components/campaign-public-view";
import { getPackagePreviewDraft } from "@/app/content-engine/lib/published-pages";

type PageProps = {
  params: Promise<{ packageId: string }>;
};

export const metadata: Metadata = {
  title: "Campaign preview | The Loan Playbook",
  robots: { index: false, follow: false },
};

export default async function CampaignPreviewPage({ params }: PageProps) {
  const { packageId } = await params;
  const page = await getPackagePreviewDraft(packageId);
  if (!page) notFound();

  return <CampaignPublicView page={page} previewMode />;
}
