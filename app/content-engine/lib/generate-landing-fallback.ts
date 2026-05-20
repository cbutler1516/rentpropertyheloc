import { getLandingPageIntent, type LandingPageIntent } from "./landing-page-intents";
import type { LandingPageOutputs, LandingPageRecord } from "./types";
import { LANDING_PAGE_SECTION_KEYS } from "./types";

function excerpt(text: string, max = 100) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

export function generateDemoLandingPage(input: {
  intent: LandingPageIntent;
  sourceInput: string;
  topic: string;
  title: string;
}): LandingPageRecord {
  const intent = getLandingPageIntent(input.intent);
  const topic = input.topic || excerpt(input.sourceInput, 60);
  const hook = excerpt(input.sourceInput, 120);

  const sections = {
    heroHeadline: `Know the move before you make it on ${topic}`,
    heroSubheadline: `Clear mortgage strategy for ${intent.label.toLowerCase()}—without rate spam, panic posts, or generic advice that doesn't fit your timeline.`,
    primaryCta: "Book your strategy review — 20 minutes, zero pressure",
    secondaryCta: "Download the playbook brief — see the full breakdown",
    problemSection: `Most people try to make a ${topic.toLowerCase()} decision from headlines, screenshots, and social posts. That's how you end up chasing the wrong number.

${hook}

The real question isn't "what's the rate today?" It's whether your structure, timeline, and payment path still fit the next 12 months.`,
    whyItMattersNow: `Markets shift weekly. Inventory, policy headlines, and payment math don't move in lockstep—and waiting for a "perfect" moment often means losing the home or plan you actually wanted.

Acting with a playbook means you can move confidently when the right property or refinance window appears.`,
    loanPlaybookExplanation: `The Loan Playbook is modern mortgage education with a sports strategy mindset: know the play before you make it.

We don't lead with rate bait. We lead with clarity—payment structure, timeline, tradeoffs, and language you can share with your agent or partner. Whether you're buying, refinancing, or investing, you get context that holds up in real conversations.`,
    keyBenefits: `1. Payment clarity before the portal — Understand your comfortable range before emotions take over at the showing.
2. Agent-forwardable language — Share one paragraph your Realtor can send to clients without rewriting compliance brain.
3. Strategy over headlines — Separate Fed noise from the decision that actually moves your file.`,
    whoThisIsFor: `• ${intent.label} prospects researching their next move
• Borrowers tired of rate-ad spam who want a consultative LO
• Agents who want financing clarity they can forward
• Homeowners comparing refinance, HELOC, or hold strategies
• Anyone who wants education first, documents second`,
    faqSection: `Q: Is this a rate quote or application?
A: Neither to start. This is an educational strategy review—we'll discuss your timeline and structure before any formal application.

Q: Will you tell me to buy/refi right now?
A: We'll map tradeoffs for your situation. Every file is different; we don't give one-size-fits-all timing advice.

Q: How long does the strategy review take?
A: About 20 minutes. You'll leave with clearer next steps, not a sales ambush.

Q: Do you work with my agent?
A: Yes—we're happy to join a brief call so everyone shares the same financing story.

Q: Are you licensed in my state?
A: We'll confirm licensing and program fit during your review.`,
    complianceDisclaimer: `Educational content only. Not a commitment to lend. All loans subject to credit approval, program availability, and underwriting guidelines. Rates, payments, and terms vary by borrower, property, and market conditions. NMLS # [Your NMLS] | Equal Housing Lender. The Loan Playbook does not provide tax, legal, or investment advice.`,
    leadFormFields: `first_name — First name — Jordan
last_name — Last name — Smith
email — Email — you@email.com
phone — Phone — (555) 555-5555
timeline — When are you hoping to move? — 0–3 months / 3–6 / 6–12 / Just researching
notes — Anything we should know? — Optional context for your review`,
    thankYouPageCopy: `You're in — we'll be in touch shortly.

Thanks for requesting a strategy review. We received your info and will follow up with next steps (usually within one business day).

While you wait: jot down your target payment range and your must-move-by date. That makes our conversation twice as useful.`,
    followUpEmailCopy: `Subject: Your Loan Playbook strategy review — next steps

Hi —

Thanks for raising your hand on ${topic}. We got your request and you're on the list for a strategy review.

What to expect:
→ A short call focused on structure and timeline—not a rate quote in disguise
→ Plain-language answers you can repeat to your agent or partner
→ A clear next step only if it actually fits your goals

If you have a specific property or refinance scenario in mind, reply to this email with the basics and we'll come prepared.

Talk soon,
The Loan Playbook
Know the move before you make it.`,
  } satisfies LandingPageOutputs;

  for (const key of LANDING_PAGE_SECTION_KEYS) {
    if (!sections[key]) sections[key] = "";
  }

  return {
    intent: input.intent,
    sections,
    generatedAt: new Date().toISOString(),
    modelUsed: "demo",
  };
}
