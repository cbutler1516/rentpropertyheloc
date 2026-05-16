import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnArticleTemplate } from "../../components/learn-article-template";
import { getLearnArticle, learnArticles } from "../../lib/learn-articles";

type LearnArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return learnArticles.map((article) => ({
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
