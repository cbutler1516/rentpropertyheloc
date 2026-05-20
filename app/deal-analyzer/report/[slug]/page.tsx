import { ReportSlugView } from "./report-slug-view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PlaybookReportBySlugPage({ params }: PageProps) {
  const { slug } = await params;
  return <ReportSlugView slug={slug} />;
}
