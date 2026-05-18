import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnArticleTemplate } from "../../components/learn-article-template";
import { getLearnArticle, learnArticles } from "../../lib/learn-articles";

const staticFunnelSlugs = new Set([
  "seller-concessions",
  "2-1-buydowns",
  "refinance-timing",
  "heloc-strategy",
]);

type LearnArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return learnArticles
    .filter((article) => !staticFunnelSlugs.has(article.slug))
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({
  params,
}: LearnArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearnArticle(slug);

  if (!article) {
    return {
      title: "Learn | The Loan Playbook",
    };
  }

  return {
    title: `${article.title} | The Loan Playbook`,
    description: article.description,
    openGraph: {
      title: `${article.title} | The Loan Playbook`,
      description: article.description,
      type: "article",
    },
  };
}

export default async function LearnArticlePage({
  params,
}: LearnArticlePageProps) {
  const { slug } = await params;
  const article = getLearnArticle(slug);

  if (!article) notFound();

  return <LearnArticleTemplate article={article} />;
}
