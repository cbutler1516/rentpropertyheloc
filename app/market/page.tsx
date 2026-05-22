import type { Metadata } from "next";
import { FooterBrand } from "@/app/components/brand";
import { ComplianceFooter } from "@/app/components/compliance-footer";
import { FooterSocialLinks } from "@/app/components/footer-social-links";
import { SiteNav } from "@/app/components/site-nav";
import { getLatestMarketUpdateSync } from "@/app/lib/market-center";
import { buildPageMetadata } from "@/app/lib/site-seo";
import { AgentTalkingPoints } from "./components/agent-talking-points";
import { CommercialCorner } from "./components/commercial-corner";
import { FeaturedCommentary } from "./components/featured-commentary";
import { MarketEmailSignup } from "./components/market-email-signup";
import { MarketHero } from "./components/market-hero";
import { MarketPulseGrid } from "./components/market-pulse-grid";
import { RefiHelocWatch } from "./components/refi-heloc-watch";
import { SeattleSnapshotSection } from "./components/seattle-snapshot";
import { TodaysPlay } from "./components/todays-play";

export const metadata: Metadata = buildPageMetadata({
  title: "Market Center for Real Estate Agents",
  description:
    "Daily mortgage market commentary, rate pulse, Seattle snapshot, and agent talking points—premium briefing for modern real estate professionals.",
  path: "/market",
});

export default function MarketCenterPage() {
  const update = getLatestMarketUpdateSync();

  return (
    <div className="market-center relative min-h-screen overflow-x-hidden bg-[#f4f4f2] text-zinc-900">
      <SiteNav />

      <main className="relative z-10 pb-20">
        <MarketHero update={update} />
        <FeaturedCommentary update={update} />
        <TodaysPlay update={update} />
        <MarketPulseGrid update={update} />
        <SeattleSnapshotSection update={update} />
        <AgentTalkingPoints update={update} />
        <RefiHelocWatch update={update} />
        <CommercialCorner update={update} />
        <MarketEmailSignup />
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
