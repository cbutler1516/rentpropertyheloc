import fs from "node:fs";
import path from "node:path";

const TIKTOK_DIR = path.join("content-library", "tiktok");
const OUT_CSV = path.join("content-library", "metadata", "video-metadata.csv");

const pairings = {
  "buyer-preapproval-first-step": {
    url: "/learn/buyer-readiness",
    hook: "Pre-approval should come before the search.",
    cta: "Start buyer strategy",
  },
  "buyer-prequalified-vs-preapproved": {
    url: "/learn/buyer-readiness",
    hook: "Pre-qualified is not the same as pre-approved.",
    cta: "Get buyer-ready",
  },
  "buyer-shop-with-preapproval": {
    url: "/learn/buyer-readiness",
    hook: "Do not shop listings without pre-approval.",
    cta: "Start buyer strategy",
  },
  "buyer-great-mortgage-preparation": {
    url: "/learn/buyer-readiness",
    hook: "Strong purchases start with preparation.",
    cta: "Start buyer strategy",
  },
  "buyer-power-seller-concessions-spring": {
    url: "/learn/seller-concessions",
    hook: "Seller concessions in a spring market.",
    cta: "Read concessions guide",
  },
  "buyer-buydown-and-arm-options": {
    url: "/learn/2-1-buydowns",
    hook: "Buydown and ARM options in plain language.",
    cta: "Explore buydown guide",
  },
  "buyer-jumbo-loan-myths": {
    url: "/learn/jumbo-loans",
    hook: "Common jumbo myths before you tour.",
    cta: "Review jumbo strategy",
  },
  "buyer-physician-loan-no-down-payment": {
    url: "/guides/physician-loans",
    hook: "Physician loan down payment context.",
    cta: "Physician loan guide",
  },
  "buyer-when-to-lock-rate": {
    url: "/learn/buyer-readiness",
    hook: "When locking matters more than waiting.",
    cta: "Talk through timing",
  },
  "buyer-down-payment-myth": {
    url: "/learn/buyer-readiness",
    hook: "You may not need as much down as you think.",
    cta: "Start buyer strategy",
  },
  "buyer-rate-vs-payment-focus": {
    url: "/learn/buyer-readiness",
    hook: "Payments matter more than the rate headline.",
    cta: "Clarify your number",
  },
  "buyer-rate-vs-price-strategy": {
    url: "/learn/buyer-readiness",
    hook: "Rate vs price strategy for buyers.",
    cta: "Start buyer strategy",
  },
  "buyer-credit-score-game-plan": {
    url: "/learn/buyer-readiness",
    hook: "Credit strategy beats perfect credit myths.",
    cta: "Build your game plan",
  },
  "buyer-debt-to-income-ratio-myth": {
    url: "/learn/buyer-readiness",
    hook: "DTI myths that slow buyers down.",
    cta: "Review readiness",
  },
  "buyer-dont-panic-over-rate-number": {
    url: "/learn/buyer-readiness",
    hook: "One number should not drive the whole decision.",
    cta: "Get context first",
  },
  "buyer-rate-fear-bad-advice": {
    url: "/learn/buyer-readiness",
    hook: "Rate fear and bad advice in the market.",
    cta: "Start with strategy",
  },
  "buyer-stop-waiting-for-perfect-market": {
    url: "/learn/buyer-readiness",
    hook: "Waiting for the perfect market costs more.",
    cta: "Plan your move",
  },
  "buyer-waiting-for-rates-falling-behind": {
    url: "/learn/buyer-readiness",
    hook: "Waiting on rates can mean falling behind.",
    cta: "Talk through timing",
  },
  "buyer-waiting-to-save-costs-more": {
    url: "/learn/buyer-readiness",
    hook: "Saving longer can cost more than moving.",
    cta: "Review your timeline",
  },
  "buyer-frozen-waiting-rates-three-year-low": {
    url: "/learn/buyer-readiness",
    hook: "Frozen by rate headlines at cycle lows.",
    cta: "Get a clear plan",
  },
  "buyer-home-buying-feels-overwhelming": {
    url: "/buyers",
    hook: "When the process feels overwhelming.",
    cta: "Buyer guidance hub",
  },
  "buyer-renting-vs-owning-equity": {
    url: "/buyers",
    hook: "Renting vs owning through an equity lens.",
    cta: "Explore buyer paths",
  },
  "buyer-spring-market-real-talk": {
    url: "/washington-mortgage",
    hook: "Spring market reality for buyers.",
    cta: "Washington buyer context",
    market: "Washington",
  },
  "buyer-avoid-new-debt-before-closing": {
    url: "/learn/buyer-readiness",
    hook: "New debt before closing can break the file.",
    cta: "Protect your approval",
  },
  "homeowner-refinance-break-even-roi": {
    url: "/learn/refinance-timing",
    hook: "Refinance break-even and ROI framing.",
    cta: "Review refinance timing",
  },
  "homeowner-refinance-opportunity-update": {
    url: "/learn/refinance-timing",
    hook: "When refinance opportunity actually shows up.",
    cta: "Review timing",
  },
  "homeowner-buy-before-sell-program": {
    url: "/guides/buy-before-sell",
    hook: "Buy before you sell sequencing.",
    cta: "Buy-before-sell guide",
  },
  "homeowner-12-month-mortgage-review": {
    url: "/learn/refinance-timing",
    hook: "Annual mortgage review for homeowners.",
    cta: "Homeowner strategy review",
  },
  "homeowner-mortgage-checkup-grooming": {
    url: "/learn/heloc-strategy",
    hook: "Mortgage checkup as a routine.",
    cta: "Explore equity options",
  },
  "homeowner-locked-bad-rate-rescue": {
    url: "/learn/refinance-timing",
    hook: "Locked at the wrong time—what next.",
    cta: "Review options",
  },
  "homeowner-pay-off-mortgage-faster": {
    url: "/learn/refinance-timing",
    hook: "Payoff speed vs flexibility tradeoffs.",
    cta: "Homeowner guidance",
  },
  "homeowner-family-stability-mortgage-plan": {
    url: "/homeowners",
    hook: "Family stability and mortgage planning.",
    cta: "Homeowner hub",
  },
  "agent-free-1-0-buydown-program": {
    url: "/learn/2-1-buydowns",
    hook: "2-1 buydown talking points for agents.",
    cta: "Agent playbook",
  },
  "agent-negotiating-mortgage-skit": {
    url: "/agents/financing-playbook",
    hook: "Financing negotiation in client deals.",
    cta: "Agent resources",
  },
  "market-strategy-over-rate-noise": {
    url: "/learn/refinance-timing",
    hook: "Strategy when rate noise gets loud.",
    cta: "Get market context",
  },
  "market-fed-bond-buying-rates-explained": {
    url: "/videos",
    hook: "Fed and bond buying—what moves rates.",
    cta: "Watch more context",
  },
  "market-oil-prices-mortgage-rates": {
    url: "/videos",
    hook: "Oil headlines and mortgage rate context.",
    cta: "Market commentary",
  },
  "market-seahawks-mortgage-preparation": {
    url: "/washington-mortgage",
    hook: "Seattle sports season mortgage prep angle.",
    cta: "Washington strategy",
    market: "Washington",
  },
  "market-mortgage-chaos-countdown-day1": {
    url: "/videos",
    hook: "Market chaos series opener.",
    cta: "Follow the series",
  },
  "brand-chris-butler-intro-washington": {
    url: "/about",
    hook: "Founder intro—Washington licensed context.",
    cta: "About the playbook",
    market: "Washington",
  },
  "brand-loan-playbook-intro": {
    url: "/",
    hook: "What The Loan Playbook is building.",
    cta: "Explore the site",
  },
  "brand-wm-phoenix-open-mortgage-vibe": {
    url: "/washington-mortgage",
    hook: "Phoenix Open brand moment—Washington tie-in.",
    cta: "Local market context",
    market: "Washington",
  },
};

const featuredSlugs = new Set([
  "buyer-preapproval-first-step",
  "buyer-prequalified-vs-preapproved",
  "buyer-shop-with-preapproval",
  "buyer-great-mortgage-preparation",
  "buyer-power-seller-concessions-spring",
  "buyer-buydown-and-arm-options",
  "buyer-jumbo-loan-myths",
  "buyer-physician-loan-no-down-payment",
  "buyer-when-to-lock-rate",
  "buyer-down-payment-myth",
  "buyer-rate-vs-payment-focus",
  "homeowner-refinance-break-even-roi",
  "homeowner-buy-before-sell-program",
  "homeowner-12-month-mortgage-review",
  "homeowner-refinance-opportunity-update",
  "market-strategy-over-rate-noise",
  "market-seahawks-mortgage-preparation",
  "agent-free-1-0-buydown-program",
  "agent-negotiating-mortgage-skit",
  "brand-chris-butler-intro-washington",
]);

const titleOverrides = {
  "agent-free-1-0-buydown-program": "Free 2-1 buydown talking points for agents",
  "buyer-prequalified-vs-preapproved": "Pre-qualified vs pre-approved",
  "buyer-rate-vs-payment-focus": "Rates do not pay the bills—payments do",
  "buyer-jumbo-loan-myths": "Jumbo loan myths buyers believe",
  "buyer-physician-loan-no-down-payment": "Physician loans and down payment context",
  "buyer-power-seller-concessions-spring": "Seller concessions in a spring market",
  "buyer-buydown-and-arm-options": "Buydown and ARM options explained",
  "homeowner-refinance-break-even-roi": "Refinance break-even and ROI",
  "homeowner-buy-before-sell-program": "Buy before you sell program",
  "homeowner-12-month-mortgage-review": "12-month mortgage review",
  "market-strategy-over-rate-noise": "Strategy over rate noise",
  "market-seahawks-mortgage-preparation": "Seahawks season mortgage preparation",
  "brand-chris-butler-intro-washington": "Chris Butler — Washington licensed advisor",
  "buyer-when-to-lock-rate": "When to lock your rate",
  "buyer-down-payment-myth": "The down payment myth",
  "buyer-preapproval-first-step": "Pre-approval is the first step",
  "buyer-shop-with-preapproval": "Shop with pre-approval first",
  "buyer-great-mortgage-preparation": "Great mortgages are prepared",
};

function titleCase(words) {
  return words
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseFilename(filename) {
  const base = filename.replace(/\.mp4$/i, "");
  const [prefix, ...restParts] = base.split("-");
  const rest = restParts.join("-");

  let audience = "general";
  if (prefix === "buyer") audience = "buyer";
  else if (prefix === "homeowner") audience = "homeowner";
  else if (prefix === "market") audience = "market";
  else if (prefix === "agent") audience = "agent";

  const pairing = pairings[base] ?? {};
  const topic = titleCase(rest.replace(/-/g, " "));
  const title = titleOverrides[base] ?? topic;
  const market =
    pairing.market ??
    (base.includes("washington") || base.includes("seahawks") ? "Washington" : "");

  const defaultUrl =
    audience === "buyer"
      ? "/buyers"
      : audience === "homeowner"
        ? "/homeowners"
        : audience === "agent"
          ? "/agents"
          : audience === "market"
            ? "/markets"
            : "/";

  const isBrandSkit =
    prefix === "brand" &&
    !["brand-chris-butler-intro-washington", "brand-loan-playbook-intro"].includes(base);

  return {
    filename,
    title,
    audience,
    topic,
    market,
    hook: pairing.hook ?? `${title} — short-form strategy clip from the content library.`,
    cta: pairing.cta ?? "Start strategy conversation",
    recommended_url: pairing.url ?? defaultUrl,
    featured: featuredSlugs.has(base) ? "yes" : "no",
    status: "library",
    notes: isBrandSkit ? "Brand/skit; lower immediate SEO priority" : "",
    base,
  };
}

function csvEscape(value) {
  const v = String(value ?? "");
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

const files = fs.readdirSync(TIKTOK_DIR).filter((f) => f.endsWith(".mp4")).sort();
const rows = files.map(parseFilename);

fs.mkdirSync(path.dirname(OUT_CSV), { recursive: true });

const header =
  "filename,title,audience,topic,market,hook,cta,recommended_url,featured,status,notes";
const csv = [
  header,
  ...rows.map((r) =>
    [
      r.filename,
      r.title,
      r.audience,
      r.topic,
      r.market,
      r.hook,
      r.cta,
      r.recommended_url,
      r.featured,
      r.status,
      r.notes,
    ]
      .map(csvEscape)
      .join(","),
  ),
].join("\n");

fs.writeFileSync(OUT_CSV, csv, "utf8");
console.log(`Wrote ${rows.length} rows to ${OUT_CSV}`);
