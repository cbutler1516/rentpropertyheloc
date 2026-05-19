/**
 * Curated TikTok inventory for future site publishing.
 * Source files live in content-library/tiktok (not served from /public).
 * Full inventory: content-library/metadata/video-metadata.csv
 */

export type VideoLibraryAudience =
  | "buyer"
  | "homeowner"
  | "market"
  | "agent"
  | "commercial"
  | "general";

export type VideoLibraryStatus =
  | "library"
  | "curated"
  | "published"
  | "planned";

export type VideoLibraryEntry = {
  slug: string;
  title: string;
  audience: VideoLibraryAudience;
  topic: string;
  market?: string;
  hook: string;
  cta: string;
  sourceFilename: string;
  recommendedUrl: string;
  status: VideoLibraryStatus;
  notes?: string;
};

export const videoLibrary: VideoLibraryEntry[] = [
  {
    slug: "buyer-preapproval-first-step",
    title: "Pre-approval is the first step",
    audience: "buyer",
    topic: "buyer readiness",
    hook: "Pre-approval should come before the search.",
    cta: "Start buyer strategy",
    sourceFilename: "buyer-preapproval-first-step.mp4",
    recommendedUrl: "/learn/buyer-readiness",
    status: "published",
    notes: "Hero landing: /videos/buyer-preapproval-first-step",
  },
  {
    slug: "buyer-prequalified-vs-preapproved",
    title: "Pre-qualified vs pre-approved",
    audience: "buyer",
    topic: "buyer readiness",
    hook: "Pre-qualified is not the same as pre-approved.",
    cta: "Get buyer-ready",
    sourceFilename: "buyer-prequalified-vs-preapproved.mp4",
    recommendedUrl: "/learn/buyer-readiness",
    status: "published",
  },
  {
    slug: "buyer-shop-with-preapproval",
    title: "Shop with pre-approval first",
    audience: "buyer",
    topic: "buyer readiness",
    hook: "Do not shop listings without pre-approval.",
    cta: "Start buyer strategy",
    sourceFilename: "buyer-shop-with-preapproval.mp4",
    recommendedUrl: "/learn/buyer-readiness",
    status: "curated",
  },
  {
    slug: "buyer-great-mortgage-preparation",
    title: "Great mortgages are prepared",
    audience: "buyer",
    topic: "buyer readiness",
    hook: "Strong purchases start with preparation—not luck.",
    cta: "Start buyer strategy",
    sourceFilename: "buyer-great-mortgage-preparation.mp4",
    recommendedUrl: "/learn/buyer-readiness",
    status: "curated",
  },
  {
    slug: "buyer-down-payment-myth",
    title: "The down payment myth",
    audience: "buyer",
    topic: "down payment",
    hook: "You may not need as much down as you think.",
    cta: "Start buyer strategy",
    sourceFilename: "buyer-down-payment-myth.mp4",
    recommendedUrl: "/learn/buyer-readiness",
    status: "curated",
  },
  {
    slug: "buyer-rate-vs-payment-focus",
    title: "Rates do not pay the bills—payments do",
    audience: "buyer",
    topic: "payment strategy",
    hook: "Payments matter more than the rate headline.",
    cta: "Clarify your number",
    sourceFilename: "buyer-rate-vs-payment-focus.mp4",
    recommendedUrl: "/learn/buyer-readiness",
    status: "curated",
  },
  {
    slug: "buyer-when-to-lock-rate",
    title: "When to lock your rate",
    audience: "buyer",
    topic: "rate lock timing",
    hook: "When locking matters more than waiting.",
    cta: "Talk through timing",
    sourceFilename: "buyer-when-to-lock-rate.mp4",
    recommendedUrl: "/learn/buyer-readiness",
    status: "curated",
  },
  {
    slug: "buyer-jumbo-loan-myths",
    title: "Jumbo loan myths buyers believe",
    audience: "buyer",
    topic: "jumbo financing",
    market: "Washington",
    hook: "Common jumbo myths before you tour Eastside or Seattle inventory.",
    cta: "Review jumbo strategy",
    sourceFilename: "buyer-jumbo-loan-myths.mp4",
    recommendedUrl: "/learn/jumbo-loans",
    status: "published",
    notes: "Hero landing: /videos/buyer-jumbo-loan-myths",
  },
  {
    slug: "buyer-physician-loan-no-down-payment",
    title: "Physician loans and down payment context",
    audience: "buyer",
    topic: "physician loans",
    hook: "Physician loan paths are not one-size-fits-all.",
    cta: "Physician loan guide",
    sourceFilename: "buyer-physician-loan-no-down-payment.mp4",
    recommendedUrl: "/guides/physician-loans",
    status: "curated",
  },
  {
    slug: "buyer-power-seller-concessions-spring",
    title: "Seller concessions in a spring market",
    audience: "buyer",
    topic: "seller concessions",
    market: "Washington",
    hook: "Seller concessions in a spring market—what actually moves the needle.",
    cta: "Read concessions guide",
    sourceFilename: "buyer-power-seller-concessions-spring.mp4",
    recommendedUrl: "/learn/seller-concessions",
    status: "published",
  },
  {
    slug: "buyer-buydown-and-arm-options",
    title: "Buydown and ARM options explained",
    audience: "buyer",
    topic: "buydowns",
    hook: "Buydown and ARM options in plain language.",
    cta: "Explore buydown guide",
    sourceFilename: "buyer-buydown-and-arm-options.mp4",
    recommendedUrl: "/learn/2-1-buydowns",
    status: "published",
  },
  {
    slug: "homeowner-refinance-break-even-roi",
    title: "Refinance break-even and ROI",
    audience: "homeowner",
    topic: "refinance timing",
    hook: "Refinance break-even and ROI framing—not rate panic.",
    cta: "Review refinance timing",
    sourceFilename: "homeowner-refinance-break-even-roi.mp4",
    recommendedUrl: "/learn/refinance-timing",
    status: "published",
  },
  {
    slug: "homeowner-refinance-opportunity-update",
    title: "Refinance opportunity update",
    audience: "homeowner",
    topic: "refinance timing",
    hook: "When refinance opportunity actually shows up.",
    cta: "Review timing",
    sourceFilename: "homeowner-refinance-opportunity-update.mp4",
    recommendedUrl: "/learn/refinance-timing",
    status: "curated",
  },
  {
    slug: "homeowner-buy-before-sell-program",
    title: "Buy before you sell program",
    audience: "homeowner",
    topic: "buy before sell",
    market: "Washington",
    hook: "Buy before you sell sequencing for move-up households.",
    cta: "Buy-before-sell guide",
    sourceFilename: "homeowner-buy-before-sell-program.mp4",
    recommendedUrl: "/guides/buy-before-sell",
    status: "published",
    notes: "Hero landing: /videos/homeowner-buy-before-sell-program",
  },
  {
    slug: "homeowner-12-month-mortgage-review",
    title: "12-month mortgage review",
    audience: "homeowner",
    topic: "mortgage review",
    hook: "Annual mortgage review for homeowners who have not looked in a year.",
    cta: "Homeowner strategy review",
    sourceFilename: "homeowner-12-month-mortgage-review.mp4",
    recommendedUrl: "/learn/refinance-timing",
    status: "curated",
  },
  {
    slug: "agent-free-1-0-buydown-program",
    title: "Free 2-1 buydown talking points for agents",
    audience: "agent",
    topic: "2-1 buydown",
    hook: "2-1 buydown language agents can use with buyers.",
    cta: "Agent playbook",
    sourceFilename: "agent-free-1-0-buydown-program.mp4",
    recommendedUrl: "/learn/2-1-buydowns",
    status: "curated",
  },
  {
    slug: "agent-negotiating-mortgage-skit",
    title: "Negotiating financing with clients",
    audience: "agent",
    topic: "agent financing",
    hook: "Financing negotiation in client conversations.",
    cta: "Agent resources",
    sourceFilename: "agent-negotiating-mortgage-skit.mp4",
    recommendedUrl: "/agents/financing-playbook",
    status: "curated",
  },
  {
    slug: "market-strategy-over-rate-noise",
    title: "Strategy over rate noise",
    audience: "market",
    topic: "market commentary",
    hook: "Strategy when rate noise gets loud.",
    cta: "Get market context",
    sourceFilename: "market-strategy-over-rate-noise.mp4",
    recommendedUrl: "/learn/refinance-timing",
    status: "published",
  },
  {
    slug: "market-seahawks-mortgage-preparation",
    title: "Seahawks season mortgage preparation",
    audience: "market",
    topic: "local market",
    market: "Washington",
    hook: "Seattle sports season angle for mortgage preparation.",
    cta: "Washington strategy",
    sourceFilename: "market-seahawks-mortgage-preparation.mp4",
    recommendedUrl: "/washington-mortgage",
    status: "curated",
    notes: "Local Seattle / Washington authority hook.",
  },
  {
    slug: "brand-chris-butler-intro-washington",
    title: "Chris Butler — Washington licensed advisor",
    audience: "general",
    topic: "founder trust",
    market: "Washington",
    hook: "Founder intro with Washington licensing context.",
    cta: "About the playbook",
    sourceFilename: "brand-chris-butler-intro-washington.mp4",
    recommendedUrl: "/about",
    status: "curated",
    notes: "Trust layer / about page hero candidate.",
  },
];

export function getVideoLibraryEntryBySlug(slug: string) {
  return videoLibrary.find((entry) => entry.slug === slug);
}

export function getCuratedVideoLibrary() {
  return videoLibrary.filter((entry) => entry.status === "curated");
}

export function getVideoLibraryByAudience(audience: VideoLibraryAudience) {
  return videoLibrary.filter((entry) => entry.audience === audience);
}

export function getVideoLibraryByMarket(market: string) {
  return videoLibrary.filter(
    (entry) => entry.market?.toLowerCase() === market.toLowerCase(),
  );
}
