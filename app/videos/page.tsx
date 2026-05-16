import type { Metadata } from "next";
import Link from "next/link";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import {
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
  title: "Videos | The Loan Playbook",
  description:
    "Short-form mortgage strategy videos, market updates, explainers, and social content from The Loan Playbook.",
};

type VideoCard = {
  category: string;
  title: string;
  platform: string;
  description: string;
};

const featuredVideos: VideoCard[] = [
  {
    category: "Featured Play",
    title: "What buyers misunderstand about pre-approval",
    platform: "YouTube Shorts",
    description:
      "A concise breakdown of why readiness is more than a letter and how buyers can prepare earlier.",
  },
  {
    category: "Market Explainer",
    title: "Seller concessions vs. price reductions",
    platform: "Instagram",
    description:
      "A side-by-side explanation of how credits can change cash-to-close, payment design, and offer strategy.",
  },
  {
    category: "Agent Education",
    title: "How to talk about buydowns without overselling them",
    platform: "TikTok",
    description:
      "A clean framework agents can use to explain temporary payment relief with the right context.",
  },
];

const shortFormPlays: VideoCard[] = [
  {
    category: "Mortgage Play",
    title: "2-1 buydown in under 60 seconds",
    platform: "TikTok",
    description:
      "Simple explanation of how the payment steps down, who funds it, and when it belongs in the strategy.",
  },
  {
    category: "Mortgage Play",
    title: "Seller credit or lower price?",
    platform: "Instagram",
    description:
      "Short tactical comparison for buyers weighing cash, payment, and negotiation leverage.",
  },
  {
    category: "Mortgage Play",
    title: "FHA does not mean weak buyer",
    platform: "Facebook Reels",
    description:
      "A direct myth-busting clip built for buyer education and agent reposting.",
  },
];

const marketUpdates: VideoCard[] = [
  {
    category: "Market Update",
    title: "Rates moved. What actually changes?",
    platform: "YouTube Shorts",
    description:
      "A calm explanation of payment movement, buyer psychology, and what should be recalculated.",
  },
  {
    category: "Market Update",
    title: "Inventory and financing strategy",
    platform: "Instagram",
    description:
      "How available homes, seller motivation, and financing terms can shift offer strategy.",
  },
  {
    category: "Market Update",
    title: "Refinance timing watchlist",
    platform: "Long-form explainers",
    description:
      "A deeper future video format for tracking break-even, cash flow, and rate opportunity.",
  },
];

const agentEducation: VideoCard[] = [
  {
    category: "Agent Education",
    title: "The financing questions to ask before showings",
    platform: "Instagram",
    description:
      "A practical content format agents can use to improve buyer conversations early.",
  },
  {
    category: "Agent Education",
    title: "How credits affect offer conversations",
    platform: "Facebook Reels",
    description:
      "A clear explainer for agents who want to connect negotiation terms to financing outcomes.",
  },
  {
    category: "Agent Education",
    title: "Pre-approval quality signals",
    platform: "TikTok",
    description:
      "Short checklist-style video for recognizing what makes a buyer file feel prepared.",
  },
];

const buyerEducation: VideoCard[] = [
  {
    category: "Buyer Education",
    title: "Your payment is not just the rate",
    platform: "YouTube Shorts",
    description:
      "A buyer-facing breakdown of taxes, insurance, loan structure, credits, and timing.",
  },
  {
    category: "Buyer Education",
    title: "Cash-to-close explained cleanly",
    platform: "Instagram",
    description:
      "A visual script for down payment, closing costs, reserves, and seller credits.",
  },
  {
    category: "Buyer Education",
    title: "When to start preparing for a loan",
    platform: "TikTok",
    description:
      "A simple readiness timeline for buyers who want to avoid scrambling later.",
  },
];

const creativeExperiments: VideoCard[] = [
  {
    category: "AI / Sora",
    title: "Strategy board motion tests",
    platform: "Long-form explainers",
    description:
      "Future cinematic experiments translating loan strategy into premium sports-board visuals.",
  },
  {
    category: "AI / Sora",
    title: "Market pressure as a film-room concept",
    platform: "YouTube Shorts",
    description:
      "Conceptual short-form visuals that explain timing, leverage, and borrower decision-making.",
  },
  {
    category: "AI / Sora",
    title: "Loan routes and decision trees",
    platform: "Instagram",
    description:
      "Creative tests for turning mortgage pathways into elegant route diagrams and editorial clips.",
  },
];

const platforms = [
  "TikTok",
  "Instagram",
  "Facebook Reels",
  "YouTube Shorts",
  "Long-form explainers",
];

function VideoCard({ video }: { video: VideoCard }) {
  return (
    <article className="reveal-item card-lift group relative flex h-full flex-col overflow-hidden border border-zinc-900/80 bg-[#050505]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/0 via-transparent to-transparent opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-hover:from-[#5b21b6]/[0.08]"
        aria-hidden
      />
      <div className="relative aspect-[9/14] border-b border-zinc-900/80 bg-[#080808] p-5">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background:
              "linear-gradient(135deg, rgba(124, 58, 237, 0.18), transparent 45%), repeating-linear-gradient(0deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px)",
          }}
          aria-hidden
        />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
            <span>{video.category}</span>
            <span className="text-zinc-600">Draft</span>
          </div>
          <div>
            <div className="mb-5 h-12 w-12 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10" />
            <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
              Future embed / link area
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col p-7">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          {video.platform}
        </p>
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-white">
          {video.title}
        </h3>
        <p className="mt-5 flex-1 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
          {video.description}
        </p>
      </div>
    </article>
  );
}

function VideoGrid({ videos }: { videos: VideoCard[] }) {
  return (
    <RevealGroup
      className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
      stagger={130}
    >
      {videos.map((video) => (
        <VideoCard key={`${video.platform}-${video.title}`} video={video} />
      ))}
    </RevealGroup>
  );
}

export default function VideosPage() {
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
          eyebrow="Video + Social Hub"
          title="Watch the playbook in motion."
          lead="A premium media hub for short-form mortgage plays, educational explainers, market updates, social content, and future long-form strategy videos."
          focusLabel="Content System"
          focus="The video hub turns mortgage education into repeatable formats for TikTok, Instagram, Facebook Reels, YouTube Shorts, and future long-form editorial breakdowns."
          visual="basketball-agents"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#featured-videos"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              View Featured Videos
            </a>
            <Link
              href="/learn"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Explore Learn Hub
            </Link>
          </div>
          <StatRow
            className="reveal-item mt-20"
            stats={[
              { value: "5", label: "Platforms" },
              { value: "6", label: "Content lanes" },
              { value: "0", label: "Live APIs yet" },
            ]}
          />
        </PageHero>

        <section
          id="featured-videos"
          className="section-flow section-matte relative border-y border-zinc-900/40"
        >
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Featured Videos"
              title="The core video formats for The Loan Playbook."
              lead="Placeholder cards establish the editorial system now. Each slot can later connect to embeds, published links, or platform-specific posts."
            />
            <VideoGrid videos={featuredVideos} />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Short-Form Mortgage Plays"
              title="Fast, tactical explanations built for social feeds."
              lead="Short-form plays translate one lending idea at a time: credits, buydowns, FHA, cash-to-close, payment design, or readiness."
            />
            <VideoGrid videos={shortFormPlays} />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Market Updates"
              title="Market context without panic or noise."
              lead="These formats turn rate movement, inventory shifts, affordability pressure, and refinance timing into useful strategy."
            />
            <VideoGrid videos={marketUpdates} />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Agent Education"
              title="Videos agents can use to create better buyer conversations."
              lead="Agent-facing content should be practical, clear, and repostable without sounding like generic mortgage marketing."
            />
            <VideoGrid videos={agentEducation} />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Buyer Education"
              title="Buyer-ready explainers that reduce confusion early."
              lead="These videos help borrowers understand the decisions behind the loan before urgency, emotion, and deadlines take over."
            />
            <VideoGrid videos={buyerEducation} />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="AI / Sora Creative Experiments"
              title="Cinematic strategy visuals for future content systems."
              lead="Experimental concepts for turning lending strategy into premium visual language without sports logos, generic mortgage imagery, or salesy content."
            />
            <VideoGrid videos={creativeExperiments} />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Platform Categories"
              title="Built for social distribution now and deeper video later."
              lead="The structure is ready for native embeds, links, production status, scripts, captions, and future long-form publishing."
            />

            <RevealGroup
              className="mt-14 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2 lg:grid-cols-5"
              stagger={70}
            >
              {platforms.map((platform) => (
                <FeatureCard
                  key={platform}
                  label="Platform"
                  title={platform}
                  body="Placeholder category for future embeds, links, scripts, and content planning."
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <CTASection
          eyebrow="Turn Content Into Strategy"
          title="Build a media system around the questions buyers actually ask."
          body="Use the video hub to organize short-form plays, social content, explainers, market updates, agent education, and creative experiments into one premium strategy engine."
          actions={[
            {
              href: "/learn",
              label: "Turn Content Into Strategy",
              variant: "primary",
            },
            { href: "/agents", label: "Agent Platform" },
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
