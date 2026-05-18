import type { Metadata } from "next";
import Link from "next/link";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { ExternalArticleCard } from "../components/external-article-card";
import {
  ArticleCard,
  CTASection,
  FeatureCard,
  PageHero,
  SectionHeader,
} from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { broadviewArticles } from "../lib/content-sources";
import { learnArticles } from "../lib/learn-articles";

export const metadata: Metadata = {
  title: "Learn | The Loan Playbook",
  description:
    "Mortgage education, SEO article hubs, buyer strategy guides, and Broadview Lending article import placeholders from The Loan Playbook.",
};

const featuredPlaybooks = [
  {
    label: "Buyer Playbook",
    title: "First-time buyer strategy",
    body: "Readiness, payment clarity, cash planning, and offer confidence.",
  },
  {
    label: "Offer Strategy",
    title: "Seller concessions and buydowns",
    body: "Credits, buydowns, closing costs, and payment tradeoffs.",
  },
  {
    label: "Loan Structure",
    title: "Choosing the right loan lane",
    body: "FHA, VA, conventional, jumbo, DSCR, refinance, HELOC, and commercial.",
  },
];

const latestArticles = [
  {
    label: "Guide",
    title: "How seller concessions change buyer strategy",
    excerpt:
      "A practical look at credits, cash-to-close, payment design, and negotiation tradeoffs.",
    href: "/learn/seller-concessions",
  },
  {
    label: "Explainer",
    title: "What a 2-1 buydown actually solves",
    excerpt:
      "When temporary payment relief helps, when it distracts, and how buyers should evaluate it.",
    href: "/learn/2-1-buydowns",
  },
  {
    label: "Framework",
    title: "Refinance timing is a strategy decision",
    excerpt:
      "Rate movement matters, but so do break-even periods, cash flow, debt goals, and future flexibility.",
    href: "/learn/refinance-timing",
  },
];

export default function LearnPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <div
        className="playbook-grid pointer-events-none fixed inset-0 z-0 opacity-30"
        aria-hidden
      />
      <div
        className="vignette pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
      <div
        className="ambient-drift pointer-events-none fixed top-[-12rem] right-[-8rem] z-[1] h-[36rem] w-[36rem] rounded-full bg-[#5b21b6]/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-[-12rem] left-[-10rem] z-[1] h-[30rem] w-[30rem] rounded-full bg-[#4c1d95]/10 blur-[110px]"
        aria-hidden
      />

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Education Hub"
          title="Mortgage, translated."
          lead="Guides and videos for clearer lending decisions."
          focusLabel="Start"
          focus="Read the move before you make it."
          visual="multi-strategy"
          videoSrc="/videos/loan-playbook-learn-film-room.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#featured-playbooks"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Explore Playbooks
            </a>
          </div>
        </PageHero>

        <section
          id="featured-playbooks"
          className="section-flow section-matte relative border-y border-zinc-900/40"
        >
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Featured Playbooks"
              title="Start with the decision."
              lead="Choose the decision first."
            />

            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={130}
            >
              {featuredPlaybooks.map((playbook) => (
                <FeatureCard
                  key={playbook.label}
                  label={playbook.label}
                  title={playbook.title}
                  body={playbook.body}
                  className="card-lift border border-zinc-900/80"
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Popular Topics"
              title="Topics, organized."
              lead="Search-ready. Buyer-friendly."
            />

            <RevealGroup
              className="mt-14 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2 lg:grid-cols-5"
              stagger={60}
            >
              {learnArticles.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/learn/${topic.slug}`}
                  className="reveal-item group bg-[#050505] p-6 transition-colors duration-[var(--duration-hover)] hover:bg-[#0a0a0a]"
                >
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                    Guide
                  </p>
                  <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-white">
                    {topic.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-600 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-500">
                    {topic.description}
                  </p>
                  <div
                    className="mt-6 h-px w-8 bg-zinc-800 transition-all duration-[var(--duration-hover)] group-hover:w-full group-hover:bg-[#7c3aed]/40"
                    aria-hidden
                  />
                </Link>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Latest Articles"
              title="First guides in the library."
              lead="Start here, then go deeper."
            />

            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={130}
            >
              {latestArticles.map((article) => (
                <ArticleCard
                  key={article.title}
                  label={article.label}
                  title={article.title}
                  excerpt={article.excerpt}
                  href={article.href}
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="From Broadview Lending"
              title="Related external resources."
              lead="Educational only."
            />
            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-2 lg:grid-cols-3"
              stagger={120}
            >
              {broadviewArticles.map((article) => (
                <ExternalArticleCard key={article.title} article={article} />
              ))}
            </RevealGroup>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="https://www.broadviewlending.com/blog"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
              >
                Visit Broadview Blog
              </a>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <CTASection
          eyebrow="Build Your Loan Playbook"
          title="Turn information into action."
          body="Read first. Move when ready."
          actions={[
            {
              href: "/buyers",
              label: "Build Your Loan Playbook",
              variant: "primary",
            },
          ]}
        />
      </main>

      <footer className="relative z-10 border-t border-zinc-900/60 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <ComplianceFooter />
      </footer>
    </div>
  );
}
