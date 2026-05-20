import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/app/lib/site-seo";
import { fetchReportMetaForOg } from "../../lib/fetch-report-meta-server";
import { ReportSlugView } from "./report-slug-view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await fetchReportMetaForOg(slug);

  if (!meta) {
    return buildPageMetadata({
      title: "Playbook Report",
      description:
        "Mortgage strategy Playbook Report from The Loan Playbook. Educational estimates only—not a loan estimate or commitment.",
      path: `/deal-analyzer/report/${slug}`,
      noIndex: true,
    });
  }

  const ogTitle = meta.clientName
    ? `Playbook Report for ${meta.clientName}`
    : meta.title;

  return {
    ...buildPageMetadata({
      title: ogTitle,
      description: meta.description,
      path: `/deal-analyzer/report/${meta.slug}`,
      noIndex: true,
    }),
    openGraph: {
      title: `${ogTitle} | The Loan Playbook`,
      description: meta.description,
      url: `${SITE_URL}/deal-analyzer/report/${meta.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: meta.description,
    },
  };
}

export default async function PlaybookReportBySlugPage({ params }: PageProps) {
  const { slug } = await params;
  return <ReportSlugView slug={slug} />;
}
