import type { Metadata } from "next";
import Link from "next/link";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import {
  ArticleCard,
  CTASection,
  FeatureCard,
  PageHero,
  SectionHeader,
  StatRow,
} from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";

export const metadata: Metadata = {
  title: "Learn | The Loan Playbook",
  description:
    "Mortgage education, buyer strategy, loan program guides, and real estate finance content from The Loan Playbook.",
};

const featuredPlaybooks = [
  {
    label: "Buyer Playbook",
    title: "First-time buyer strategy",
    body: "A structured path for readiness, pre-approval quality, payment clarity, cash planning, and offer confidence before the search gets serious.",
  },
  {
    label: "Offer Strategy",
    title: "Seller concessions and buydowns",
    body: "How credits, temporary buydowns, closing costs, and payment strategy can change the economics of a purchase offer.",
  },
  {
    label: "Loan Structure",
    title: "Choosing the right loan lane",
    body: "A practical framework for FHA, VA, conventional, jumbo, DSCR, refinance, HELOC, and commercial lending decisions.",
  },
];

const popularTopics = [
  "Seller concessions",
  "2-1 buydowns",
  "FHA loans",
  "VA loans",
  "Jumbo loans",
  "Refinance timing",
  "HELOC strategy",
  "DSCR loans",
  "Commercial lending",
  "First-time buyer strategy",
];

const buyerStrategy = [
  {
    label: "Readiness",
    title: "Know the file before the lender does",
    body: "Income, credit, cash, debt, and timing all tell a story. Better buyers understand that story before the market creates pressure.",
  },
  {
    label: "Offer Prep",
    title: "Finance strategy affects negotiation",
    body: "Loan type, reserves, credits, contingencies, and timeline can all influence how strong an offer feels to the other side.",
  },
  {
    label: "Payment Design",
    title: "The monthly payment is engineered",
    body: "Rate, price, taxes, insurance, buydowns, credits, and down payment choices should be understood as one system.",
  },
];

const agentStrategy = [
  {
    label: "Client Education",
    title: "Better context creates calmer buyers",
    body: "Agents can use lending education to help clients understand readiness, constraints, payment movement, and transaction timing.",
  },
  {
    label: "Market Content",
    title: "Financing is now part of the media strategy",
    body: "Mortgage strategy topics give agents useful, practical content that supports trust without turning their feed into rate advertising.",
  },
  {
    label: "Transaction Flow",
    title: "Prepared buyers move cleaner",
    body: "Better financing expectations can reduce confusion between pre-approval, offer, underwriting, and closing.",
  },
];

const commercialStrategy = [
  {
    label: "Asset",
    title: "Read the collateral",
    body: "Commercial lending begins with the asset: income, use case, condition, market, tenant profile, and exit strategy.",
  },
  {
    label: "Sponsor",
    title: "Position the borrower story",
    body: "Liquidity, experience, reserves, guarantees, and operational strength help shape how a deal is understood.",
  },
  {
    label: "Structure",
    title: "Capital stack before speed",
    body: "Debt, equity, cash flow, timeline, and risk should be structured around the business plan, not forced after the fact.",
  },
];

const latestArticles = [
  {
    label: "Guide",
    title: "How seller concessions change buyer strategy",
    excerpt:
      "A practical look at credits, cash-to-close, payment design, and negotiation tradeoffs.",
  },
  {
    label: "Explainer",
    title: "What a 2-1 buydown actually solves",
    excerpt:
      "When temporary payment relief helps, when it distracts, and how buyers should evaluate it.",
  },
  {
    label: "Framework",
    title: "Refinance timing is a strategy decision",
    excerpt:
      "Rate movement matters, but so do break-even periods, cash flow, debt goals, and future flexibility.",
  },
];

export default function LearnPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <div
        className="playbook-grid playbook-grid-animated pointer-events-none fixed inset-0 z-0 opacity-30"
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
          title="Mortgage strategy, translated."
          lead="The Loan Playbook organizes lending education into clear playbooks, topic guides, articles, and social-content themes for buyers, agents, and partners."
          focusLabel="Editorial System"
          focus="This is the strategy library: loan programs, offer structure, buyer readiness, agent education, commercial finance, and market context translated into useful decisions."
          visual="multi-strategy"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#featured-playbooks"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Explore Playbooks
            </a>
            <Link
              href="/videos"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Watch Videos
            </Link>
          </div>
          <StatRow
            className="reveal-item mt-20"
            stats={[
              { value: "10", label: "Core topics" },
              { value: "3", label: "Strategy lanes" },
              { value: "1", label: "Learning hub" },
            ]}
          />
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
              title="Start with the strategy that shapes the decision."
              lead="Each playbook is designed to become a landing page, article cluster, video series, and buyer-facing explanation over time."
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
              title="High-intent mortgage topics, organized for search and clarity."
              lead="The hub is built to scale into SEO landing pages, social explainers, buyer guides, and advisor-ready content."
            />

            <RevealGroup
              className="mt-14 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2 lg:grid-cols-5"
              stagger={60}
            >
              {popularTopics.map((topic) => (
                <div
                  key={topic}
                  className="reveal-item group bg-[#050505] p-6 transition-colors duration-[var(--duration-hover)] hover:bg-[#0a0a0a]"
                >
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                    Topic
                  </p>
                  <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-white">
                    {topic}
                  </h2>
                  <div
                    className="mt-6 h-px w-8 bg-zinc-800 transition-all duration-[var(--duration-hover)] group-hover:w-full group-hover:bg-[#7c3aed]/40"
                    aria-hidden
                  />
                </div>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Buyer Strategy"
              title="Education for buyers who want to move before pressure arrives."
              lead="Buyer content should help people understand readiness, structure, payment, and timing before they are emotionally attached to a home."
            />

            <RevealGroup
              className="mt-16 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-20 md:grid-cols-3"
              stagger={120}
            >
              {buyerStrategy.map((item) => (
                <FeatureCard
                  key={item.label}
                  label={item.label}
                  title={item.title}
                  body={item.body}
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
              eyebrow="Agent Strategy"
              title="Content that helps agents educate without sounding generic."
              lead="Agent education topics translate lending complexity into clearer client conversations, social content, and transaction preparation."
            />

            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={130}
            >
              {agentStrategy.map((item) => (
                <FeatureCard
                  key={item.label}
                  label={item.label}
                  title={item.title}
                  body={item.body}
                  className="card-lift border border-zinc-900/80"
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5b21b6]/[0.03] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Commercial Strategy"
              title="Commercial finance education for structure-first decisions."
              lead="Commercial content should help operators, investors, and advisors understand the deal before chasing terms."
            />

            <RevealGroup
              className="mt-16 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-20 md:grid-cols-3"
              stagger={120}
            >
              {commercialStrategy.map((item) => (
                <FeatureCard
                  key={item.label}
                  label={item.label}
                  title={item.title}
                  body={item.body}
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
              eyebrow="Latest Articles"
              title="Editorial placeholders for the education engine."
              lead="These article slots establish the content system now and can become full posts, landing pages, or video scripts as the hub grows."
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
                  href="#"
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <CTASection
          eyebrow="Build Your Loan Playbook"
          title="Turn mortgage information into a strategy system."
          body="Start with the core playbooks, then build the buyer education, agent content, video topics, and commercial strategy pages around the decisions people actually need to make."
          actions={[
            {
              href: "/buyers",
              label: "Build Your Loan Playbook",
              variant: "primary",
            },
            { href: "/videos", label: "Explore Video Topics" },
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
