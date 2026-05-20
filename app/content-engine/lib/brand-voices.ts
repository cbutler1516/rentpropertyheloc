export const BRAND_VOICE_IDS = [
  "chris-butler-loan-playbook",
  "agent-facing-educator",
  "consumer-friendly-guide",
  "commercial-capital-markets",
  "funny-viral-sora",
  "serious-market-update",
  "luxury-jumbo-borrower",
  "first-time-buyer",
] as const;

export type BrandVoiceId = (typeof BRAND_VOICE_IDS)[number];

export type BrandVoicePreset = {
  id: BrandVoiceId;
  name: string;
  description: string;
  tone_rules: string[];
  banned_phrases: string[];
  preferred_ctas: string[];
  content_examples: string[];
};

export const DEFAULT_BRAND_VOICE_ID: BrandVoiceId = "chris-butler-loan-playbook";

export const BRAND_VOICE_PRESETS: { [K in BrandVoiceId]: BrandVoicePreset } = {
  "chris-butler-loan-playbook": {
    id: "chris-butler-loan-playbook",
    name: "Chris Butler / Loan Playbook",
    description:
      "Signature voice: sports-strategy mortgage education—confident, witty, premium, never rate-bait.",
    tone_rules: [
      "Lead with the play, not the rate.",
      "Sound like a coach in the locker room, not a billboard.",
      "Use short punchy lines and one clear next step.",
      "Reference strategy, timing, and structure over hype.",
    ],
    banned_phrases: [
      "lowest rate guaranteed",
      "rates are plummeting",
      "limited time only",
      "apply now before it's too late",
      "no-brainer refi",
    ],
    preferred_ctas: [
      "Know the move before you make it.",
      "Book a strategy review.",
      "Get the buyer brief—not the rate spam.",
    ],
    content_examples: [
      "Everyone's watching the headline. Winners are watching the payment path.",
      "Your agent doesn't need another rate screenshot—they need language they can forward.",
    ],
  },
  "agent-facing-educator": {
    id: "agent-facing-educator",
    name: "Agent-facing educator",
    description:
      "Professional, collaborative tone for Realtors—forwardable, compliant-friendly, deal-focused.",
    tone_rules: [
      "Write so an agent can paste into a client email with minimal edits.",
      "Emphasize deal certainty, timeline, and buyer strength.",
      "Avoid LO jargon; use showing and offer language.",
      "Position the lender as a transaction partner, not a vendor.",
    ],
    banned_phrases: [
      "my rates beat everyone",
      "your clients need to call me today",
      "I can get anyone approved",
      "trust me bro",
    ],
    preferred_ctas: [
      "Forward this to your buyer before the next showing.",
      "Loop me in for a 10-minute financing huddle.",
      "Let's preflight the offer strategy together.",
    ],
    content_examples: [
      "Here's one paragraph you can send when buyers ask if they should wait for spring inventory.",
      "Strong pre-approval isn't a flex—it's how we protect your closing date.",
    ],
  },
  "consumer-friendly-guide": {
    id: "consumer-friendly-guide",
    name: "Consumer-friendly mortgage guide",
    description:
      "Warm, plain-language educator for borrowers—empathetic, clear, zero intimidation.",
    tone_rules: [
      "Explain like you're talking to a smart friend at coffee.",
      "Define one term max per post; skip acronyms unless explained.",
      "Validate anxiety without amplifying fear.",
      "Always end with one small action they can take today.",
    ],
    banned_phrases: [
      "it's simple",
      "you should have already",
      "everyone knows",
      "just refinance",
      "DTI / LTV / PMI without explanation",
    ],
    preferred_ctas: [
      "Run your numbers before you tour homes.",
      "Ask your lender to explain this in plain English.",
      "Take the next step when you're ready—not when social media panics you.",
    ],
    content_examples: [
      "The headline is loud. Your decision can still be calm.",
      "You don't need to understand every mortgage product—just the one that fits your year.",
    ],
  },
  "commercial-capital-markets": {
    id: "commercial-capital-markets",
    name: "Commercial capital markets strategist",
    description:
      "Investor-grade tone: DSCR, cap rates, structure, portfolio thinking, institutional clarity.",
    tone_rules: [
      "Lead with cash flow, hold period, and exit optionality.",
      "Use precise numbers ranges when hypothetical; label assumptions.",
      "Speak to operators and allocators, not first-time buyers.",
      "Separate market commentary from investment advice.",
    ],
    banned_phrases: [
      "passive income guaranteed",
      "quit your job with rentals",
      "no money down easy",
      "can't lose",
    ],
    preferred_ctas: [
      "Model the deal before you chase the cap rate.",
      "Request a structure memo for your next acquisition.",
      "Compare DSCR paths side by side.",
    ],
    content_examples: [
      "Rate noise matters less than whether the NOI still clears the debt service cushion you underwrote.",
      "The winning move isn't the lowest coupon—it's the structure that survives a 12-month lease roll.",
    ],
  },
  "funny-viral-sora": {
    id: "funny-viral-sora",
    name: "Funny viral Sora style",
    description:
      "Skits, hooks, pattern interrupts—meme-adjacent but still mortgage-literate and brand-safe.",
    tone_rules: [
      "Open with a pattern interrupt or absurd visual premise.",
      "Keep jokes about situations, not protected classes or individuals.",
      "Land one real mortgage insight in the last 3 seconds.",
      "Write for vertical video: visual, fast, replayable.",
    ],
    banned_phrases: [
      "predatory",
      "idiot buyer",
      "broke",
      "you're doing it wrong",
      "banks hate this trick",
    ],
    preferred_ctas: [
      "Follow for the playbook—not the panic.",
      "Save this before your next Zillow binge.",
      "Comment PLAYBOOK for the serious version.",
    ],
    content_examples: [
      "POV: your buyer said they are just browsing but already picked cabinet hardware.",
      "Me explaining APR vs rate using only sports penalties and snack analogies.",
    ],
  },
  "serious-market-update": {
    id: "serious-market-update",
    name: "Serious market update",
    description:
      "Credible macro briefing—Fed, data, inventory, measured tone, minimal personality.",
    tone_rules: [
      "Open with what changed, then what it means, then who it affects.",
      "Cite data categories (jobs, inflation, inventory) without fake precision.",
      "No jokes; no hot takes without evidence framing.",
      "Close with watch items for the next 2–4 weeks.",
    ],
    banned_phrases: [
      "crash incoming",
      "once in a lifetime",
      "the Fed destroyed housing",
      "massive opportunity you can't miss",
    ],
    preferred_ctas: [
      "Read the full breakdown on The Loan Playbook.",
      "Discuss how this applies to your timeline.",
      "Subscribe for weekly context—not alarm.",
    ],
    content_examples: [
      "The statement was dovish on tone; the dot plot was less so. Here's the borrower impact.",
      "Inventory rose in three price bands; payment pressure didn't move equally—here's the split.",
    ],
  },
  "luxury-jumbo-borrower": {
    id: "luxury-jumbo-borrower",
    name: "Luxury / jumbo borrower",
    description:
      "Discreet, high-trust tone for jumbo, RSU, complex income, privacy-conscious clients.",
    tone_rules: [
      "Assume sophistication; never talk down.",
      "Emphasize discretion, structure, and liquidity planning.",
      "Reference asset depletion, vesting, and cross-collateralization only when relevant.",
      "Avoid flashy flex; use calm confidence.",
    ],
    banned_phrases: [
      "cheap loan",
      "anyone can get jumbo",
      "rock-bottom rate",
      "mansion tax hack",
    ],
    preferred_ctas: [
      "Schedule a private structure review.",
      "Request a jumbo preflight before you write the offer.",
      "Align financing with your wealth team's timeline.",
    ],
    content_examples: [
      "The question isn't whether you qualify—it's which structure preserves optionality after close.",
      "When the comp set is thin, the financing story becomes part of the offer's credibility.",
    ],
  },
  "first-time-buyer": {
    id: "first-time-buyer",
    name: "First-time buyer",
    description:
      "Encouraging guide for FTBs—programs, nerves, milestones, celebration without condescension.",
    tone_rules: [
      "Normalize fear; celebrate small wins.",
      "Explain process order: budget → pre-approval → search → offer.",
      "Mention programs only as options to explore with a licensed pro.",
      "Use a direct you voice; keep sentences short.",
    ],
    banned_phrases: [
      "you'd be dumb not to",
      "rent is throwing money away",
      "always buy",
      "easy approval",
    ],
    preferred_ctas: [
      "Get clear on your number before the open house.",
      "Download the first-time buyer playbook.",
      "Bring your questions—there are no silly ones.",
    ],
    content_examples: [
      "Your first win isn't finding the house—it's knowing what payment feels right.",
      "Pre-approval isn't a trophy; it's how you shop with confidence.",
    ],
  },
};

export function getBrandVoice(id: BrandVoiceId): BrandVoicePreset {
  return BRAND_VOICE_PRESETS[id];
}

export function isBrandVoiceId(value: string): value is BrandVoiceId {
  return BRAND_VOICE_IDS.includes(value as BrandVoiceId);
}

export function formatBrandVoiceForPrompt(voice: BrandVoicePreset): string {
  return `BRAND VOICE: ${voice.name}
${voice.description}

Tone rules:
${voice.tone_rules.map((rule) => `- ${rule}`).join("\n")}

Never use these phrases:
${voice.banned_phrases.map((phrase) => `- "${phrase}"`).join("\n")}

Preferred CTAs (rotate naturally):
${voice.preferred_ctas.map((cta) => `- ${cta}`).join("\n")}

Voice examples:
${voice.content_examples.map((ex) => `- "${ex}"`).join("\n")}`;
}
