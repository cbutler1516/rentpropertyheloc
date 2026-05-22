import type { Metadata } from "next";
import { FooterBrand } from "@/app/components/brand";
import { ComplianceFooter } from "@/app/components/compliance-footer";
import { FooterSocialLinks } from "@/app/components/footer-social-links";
import { SiteNav } from "@/app/components/site-nav";
import { getLatestMarketUpdateSync } from "@/app/lib/market-center";
import { buildPageMetadata } from "@/app/lib/site-seo";
import { AgentScriptsSection } from "./components/agent-scripts-section";
import { BigThreeSection } from "./components/big-three-section";
import { BondFedWatchSection } from "./components/bond-fed-watch-section";
import { BriefHero } from "./components/brief-hero";
import { NewsletterBriefCta } from "./components/newsletter-brief-cta";
import { RateMovementVisual } from "./components/rate-movement-visual";
import { RealEstatePulseSection } from "./components/real-estate-pulse-section";
import { TodaysPlaySection } from "./components/todays-play-section";

export const metadata: Metadata = buildPageMetadata({
  title: "Daily Market Briefing for Real Estate Agents",
  description:
    "A simple daily visual read on rates, bonds, Fed narrative, housing pulse, and what to say to buyers and sellers today.",
  path: "/market",
});

export default function MarketBriefingPage() {
  const update = getLatestMarketUpdateSync();

  return (
    <div className="market-center relative min-h-screen overflow-x-hidden bg-[#f4f4f2] text-zinc-900">
      <SiteNav />

      <main className="relative z-10 pb-20">
        <BriefHero update={update} />
        <BigThreeSection update={update} />
        <RateMovementVisual update={update} />
        <BondFedWatchSection update={update} />
        <RealEstatePulseSection update={update} />
        <AgentScriptsSection update={update} />
        <TodaysPlaySection update={update} />
        <NewsletterBriefCta update={update} />
      </main>

      <footer className="market-footer relative z-10 border-t border-zinc-200/80 bg-[#ececea] px-6 py-16 md:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <FooterBrand />
          <FooterSocialLinks />
        </div>
        <div className="mx-auto mt-12 max-w-7xl">
          <ComplianceFooter />
        </div>
      </footer>
    </div>
  );
}
