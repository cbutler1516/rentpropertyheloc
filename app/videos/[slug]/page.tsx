import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoLandingPage } from "../../components/video-landing-page";
import { getHeroVideoBySlug, heroVideos } from "../../lib/hero-videos";

type VideoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return heroVideos.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getHeroVideoBySlug(slug);

  if (!post) {
    return { title: "Video | The Loan Playbook" };
  }

  return {
    title: `${post.title} | The Loan Playbook`,
    description: post.expandedSummary,
    openGraph: {
      title: post.title,
      description: post.expandedSummary,
      url: `/videos/${post.slug}`,
      type: "video.other",
    },
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const post = getHeroVideoBySlug(slug);

  if (!post) notFound();

  return <VideoLandingPage post={post} />;
}
