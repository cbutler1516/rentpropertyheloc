import { getBrandVoice, type BrandVoiceId } from "./brand-voices";
import { getLeadMagnetType, type LeadMagnetType } from "./lead-magnet-types";
import type {
  ContentCalendarRecord,
  LandingPageRecord,
  LeadMagnetOutputs,
  LeadMagnetRecord,
} from "./types";

function excerpt(text: string, max = 100) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

function typeTitle(type: LeadMagnetType, topic: string): string {
  const config = getLeadMagnetType(type);
  switch (type) {
    case "buyer-guide":
      return `The ${topic} Buyer Playbook`;
    case "refinance-guide":
      return `The ${topic} Refinance Decision Guide`;
    case "agent-cheat-sheet":
      return `Agent Cheat Sheet: ${topic}`;
    case "commercial-lending-brief":
      return `Commercial Lending Brief — ${topic}`;
    case "jumbo-borrower-guide":
      return `Jumbo Borrower Guide: ${topic}`;
    case "market-update-report":
      return `Market Update Report — ${topic}`;
    case "seller-concession-playbook":
      return `Seller Concession Playbook — ${topic}`;
    case "first-time-buyer-checklist":
      return `First-Time Buyer Checklist — ${topic}`;
    default:
      return `${config.label}: ${topic}`;
  }
}

export function generateDemoLeadMagnet(input: {
  type: LeadMagnetType;
  sourceInput: string;
  topic: string;
  title: string;
  brandVoiceId: BrandVoiceId;
  landingPage?: LandingPageRecord;
  calendar?: ContentCalendarRecord;
}): LeadMagnetRecord {
  const voice = getBrandVoice(input.brandVoiceId);
  const cta = voice.preferred_ctas[0] ?? "Book your strategy review — know the move first.";
  const topic = input.topic || excerpt(input.sourceInput, 60);
  const hook = excerpt(input.sourceInput, 200);
  const typeConfig = getLeadMagnetType(input.type);
  const cover = typeTitle(input.type, topic);

  const landingHook = input.landingPage?.sections.heroHeadline;
  const calendarTheme = input.calendar?.weekTheme;

  const sections: LeadMagnetOutputs = {
    coverTitle: cover,
    subtitle: `A Loan Playbook ${typeConfig.label.toLowerCase()} — strategy over headlines on ${topic}`,
    executiveSummary: `This report distills ${topic} into clear next steps—without rate spam or panic posts.

${hook}

Whether you are buying, refinancing, partnering as an agent, or investing, the goal is the same: understand your structure and timeline before emotions take over.

Use this guide as education first. When you are ready for a personalized review, ${cta.toLowerCase()}.`,
    whyItMattersNow: `Markets, inventory, and policy headlines do not move in lockstep. Waiting for a "perfect" headline often means losing the home or plan you wanted.

${calendarTheme ? `This week’s publishing theme: ${calendarTheme}. ` : ""}The borrowers who win are not the ones refreshing rate tables—they are the ones who know their comfortable payment, their must-move-by date, and the language their agent can forward.`,
    keyTakeaways: `• Separate headline noise from the decision that actually moves your file
• Know your comfortable payment range before the portal or showing
• Align loan structure with a 12-month plan—not a single news cycle
• Give your agent one forwardable paragraph (no rate bait required)
• Ask three lender questions before you change course on ${topic}
• Treat seller credits, buydowns, and concessions as tools—not gimmicks
• Book a strategy review before you sign anything you do not understand`,
    mainEducationalSection: `## What changed (and what did not)

${hook}

Not every headline changes your payment path. Start with: Does this affect my timeline, my structure, or my offer strategy?

## The Loan Playbook framework

1. **Clarity** — Payment and structure before property emotion
2. **Timeline** — Must-move-by date vs. nice-to-have upgrades
3. **Language** — Words your agent and partner can repeat without compliance stress

## ${typeConfig.label} in practice

${input.type === "agent-cheat-sheet"
  ? "Agents: use the one-pager on the next page in buyer consults. Lead with education, not a rate quote in disguise."
  : input.type === "commercial-lending-brief"
    ? "Investors: map DSCR, reserves, and exit strategy before you chase the lowest rate printout."
    : input.type === "first-time-buyer-checklist"
      ? "First-time buyers: budget → pre-approval → showing discipline → offer structure. Skip the step where you fall in love before the number."
      : `Borrowers focused on ${topic}: document your target payment, your tradeoffs, and your next question for a licensed LO.`}

${landingHook ? `\n## Landing page alignment\n\nYour lead magnet pairs with: "${landingHook}"` : ""}`,
    mistakesToAvoid: `1. **Making decisions from screenshots** — Headlines rarely include your credit, property, or timeline.
2. **Chasing the lowest rate without structure** — Payment, MI, concessions, and term matter together.
3. **Skipping the agent alignment call** — One shared financing story beats three conflicting texts.
4. **Waiting for certainty that never arrives** — Perfect timing is a myth; prepared timing is a plan.
5. **Treating pre-approval like pre-qualified** — Know what is verified vs. assumed.
6. **Ignoring compliance-safe language** — Forward education, not guarantees.`,
    actionChecklist: `☐ Write your target payment range (comfortable, not stretch-only)
☐ List your must-move-by date and nice-to-have date
☐ Save three questions for your lender about ${topic}
☐ Share one paragraph with your agent (use the cheat sheet section)
☐ Review seller concession / buydown options if applicable
☐ Schedule a 20-minute strategy review
☐ Download your pre-approval letter only when structure fits your plan`,
    faq: `Q: Is this a rate quote or loan approval?
A: No. This is educational content. Any formal quote requires an application and underwriting.

Q: Will you tell me to buy or refi right now?
A: We map tradeoffs for your situation. Every file is different.

Q: How long does a strategy review take?
A: About 20 minutes—clarity, not a sales ambush.

Q: Do you work with my agent?
A: Yes. We can join a brief call so everyone shares the same story.

Q: Are you licensed in my state?
A: We confirm licensing and program fit during your review.`,
    ctaPage: `## Ready for your next move?

You have the framework. The next step is a personalized strategy review—${cta}

**What you will leave with:**
→ Clearer payment and structure context
→ Plain language for your agent or partner
→ A next step only if it fits your goals

${landingHook ? `**Continue from:** ${landingHook}` : ""}

Schedule your review. Know the move before you make it.`,
    complianceDisclaimer: `Educational content only. Not a commitment to lend. All loans subject to credit approval, program availability, and underwriting guidelines. Rates, payments, and terms vary by borrower, property, and market conditions. NMLS # [Your NMLS] | Equal Housing Lender. The Loan Playbook does not provide tax, legal, or investment advice.`,
  };

  return {
    type: input.type,
    sections,
    generatedAt: new Date().toISOString(),
    modelUsed: "demo",
  };
}
