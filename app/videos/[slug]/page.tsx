import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/json-ld";
import { VideoLandingPage } from "../../components/video-landing-page";
import { getHeroVideoBySlug, heroVideos } from "../../lib/hero-videos";
import {
  breadcrumbSchema,
  videoObjectSchema,
} from "../../lib/structured-data";
import { buildPageMetadata } from "../../lib/site-seo";

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

  return buildPageMetadata({
    title: post.title,
    description: post.shortSummary,
    path: `/videos/${post.slug}`,
    ogType: "article",
  });
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const post = getHeroVideoBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          videoObjectSchema({
            name: post.title,
            description: post.expandedSummary,
            slug: post.slug,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Videos", path: "/videos" },
            { name: post.title, path: `/videos/${post.slug}` },
          ]),
        ]}
      />
      <VideoLandingPage post={post} />
    </>
  );
}
