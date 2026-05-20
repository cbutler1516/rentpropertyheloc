import type { ContentOutputs } from "./types";
import { OUTPUT_TAB_KEYS } from "./types";

function excerpt(input: string, max = 120) {
  const clean = input.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}

function theme(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes("fed") || lower.includes("fomc") || lower.includes("powell"))
    return "Fed & rate policy";
  if (lower.includes("refinanc")) return "Refinance timing";
  if (lower.includes("jumbo")) return "Jumbo & high-balance";
  if (lower.includes("agent") || lower.includes("realtor"))
    return "Agent partnership";
  if (lower.includes("investor") || lower.includes("dscr"))
    return "Investor strategy";
  if (lower.includes("buy") || lower.includes("offer"))
    return "Buyer playbook";
  return "Mortgage strategy";
}

function emptyOutputs(): ContentOutputs {
  return OUTPUT_TAB_KEYS.reduce(
    (acc, key) => {
      acc[key] = "";
      return acc;
    },
    {} as ContentOutputs,
  );
}

export function generateDemoPackage(input: string): ContentOutputs {
  const trimmed = input.trim();
  if (!trimmed) return emptyOutputs();

  const topic = theme(trimmed);
  const hook = excerpt(trimmed, 90);

  return {
    tiktokHooks: `1. Stop scrolling — here's the ${topic.toLowerCase()} play nobody's running on camera.
2. "${hook}" — and that's only half the game.
3. Most borrowers are watching rates. Winners are watching this instead.
4. If your agent hasn't sent you this yet, show them slide 4.
5. Save this before your next offer conversation — you'll want the playbook.
6. POV: you finally understand the move before you make it.
7. Comment PLAYBOOK if you want the full breakdown without the rate spam.`,

    youtubeTitles: `1. ${topic}: The Move Before You Make It
2. What ${topic} Means for Your Next Mortgage Decision
3. Mortgage Strategy > Rate Noise (${topic})
4. The Loan Playbook: ${topic} Explained in 60 Seconds
5. Stop Guessing — ${topic} for Buyers & Homeowners`,

    linkedinPost: `Everyone's reacting to the headline. Few are running the actual play.

${hook}

Here's how I'm framing it for clients this week:

→ Separate the noise from the decision that actually moves the file
→ Lead with payment structure and timeline — not a rate quote in a caption
→ Give agents language they can forward without rewriting your compliance brain

${topic} isn't a content moment. It's a coaching moment.

If you're an LO who educates instead of advertises, you already know: trust compounds faster than impressions.

What's the one question your buyers keep asking about this? Drop it below — I'll answer the top ones in Stories.

#MortgageStrategy #LoanOfficer #RealEstate #TheLoanPlaybook #HomeFinancing`,

    facebookCaption: `Quick playbook check-in 👇

${hook}

Whether you're buying, refinancing, or just trying to make sense of the headlines — the goal is the same: know the move before you make it.

No rate spam. No panic posts. Just clear strategy you can actually use in a conversation this week.

Who's navigating ${topic.toLowerCase()} right now? Tell me buyer or homeowner in the comments — I'll point you to the right next step.`,

    emailNewsletter: `Subject: ${topic} — your playbook for the week
Preview: Clear strategy, zero rate-bait.

---

Hey —

${hook}

This week I'm keeping it simple: one theme, three moves, zero fluff.

THE SITUATION
${topic} is in the feed again. Your clients are asking. Your agent partners are forwarding screenshots. You need language that educates — not advertises.

THE PLAY
1. Anchor the conversation on structure (payment, timeline, equity), not a single number on a graphic.
2. Give one borrower-friendly takeaway and one agent-forwardable line.
3. End every touch with a clear next step — review, call, or guide — not "DM me for rates."

WHAT TO WATCH
If the story shifts mid-week, I'll send a short update. Until then, use the hooks and carousel copy in your content folder.

Talk soon,
The Loan Playbook`,

    seoBlogOutline: `H1: ${topic}: A Borrower-Friendly Playbook (Without the Rate Noise)

Meta description: Clear mortgage strategy on ${topic.toLowerCase()} — what it means for buyers and homeowners, questions to ask, and next steps.

Target keyword: ${topic.toLowerCase()} mortgage strategy

## H2: What changed (and what didn't)
- Headline vs. actual impact on payments and buying power
- Why "wait for rates" is often the wrong default play

## H2: Who this affects most
- First-time buyers vs. move-up homeowners
- Jumbo / high-balance considerations (if relevant)

## H2: The three questions to ask your lender
- Structure, timeline, and tradeoffs — not just APR

## H2: Agent angle: how to bring this into showings
- One sentence for buyer consults
- One sentence for listing conversations

## H2: Next step on The Loan Playbook
- Strategy review CTA
- Related guides and video

## H2: FAQ
- 4–5 common borrower questions with plain answers`,

    instagramCarousel: `Slide 1: ${topic.toUpperCase()}
Headline: Know the move before you make it.
Sub: The Loan Playbook — modern mortgage education.

Slide 2: THE HEADLINE
${hook}

Slide 3: WHAT MOST PEOPLE DO
Watch rate posts. Freeze. Wait for a magic number.

Slide 4: THE ACTUAL PLAY
Focus on structure: payment, timeline, equity, and your next 12 months.

Slide 5: BUYER CHECK
Can you explain your number before Zillow? That's the win.

Slide 6: HOMEOWNER CHECK
Does refinance / HELOC / hold still fit your 3-year plan?

Slide 7: AGENT ANGLE
Forwardable language > another rate screenshot.

Slide 8: NEXT STEP
Save this. Share with your agent. Book a strategy review when you're ready to move.`,

    soraPrompt: `Cinematic 16:9, 20 seconds. Early morning light through floor-to-ceiling windows in a modern Seattle condo. A confident mortgage educator in business-casual stands beside a glass whiteboard with simple diagrams — no rate numbers visible. Camera: slow dolly-in from wide to medium. Mood: calm, premium, strategic — like a pre-game locker room, not a bank branch. Subtle purple and gold accent lighting on the whiteboard edge. B-roll cutaways: hands placing a "PLAYBOOK" folder on a table, coffee steam, city skyline soft focus. Tone: "${topic}" explained with clarity. End frame: The Loan Playbook wordmark, tagline "Know the move before you make it."`,

    heygenPrompt: `[SCENE] Office nook, soft key light, bookshelf with muted finance titles, small desk flag or playbook prop.

[ON CAMERA]
"Quick playbook on ${topic.toLowerCase()}. Here's the headline everyone's sharing — and here's what I'd actually tell a client in the car after a showing."

[B-ROLL] Cut to graphic: three bullets — Structure / Timeline / Next step.

[ON CAMERA]
"Most content chases the rate. Strategy chases the decision. If you're a buyer, get clear on your number before the portal. If you're a homeowner, ask whether this changes your 12-month plan — not just this month's payment."

[B-ROLL] Text overlay: Know the move before you make it.

[ON CAMERA]
"Agents — I'll send you one paragraph you can forward. Borrowers — link in bio for the full guide. I'm [Name] with The Loan Playbook."

[END] Smile, nod, lower-third: NMLS # • Licensed states • Educational only`,

    thumbnailIdeas: `1. TEXT: "${topic.split(" ")[0]?.toUpperCase() ?? "PLAYBOOK"} PLAY" | Face: confident half-smile, pointing at whiteboard | Colors: navy bg, gold accent text
2. TEXT: "RATE NOISE vs. STRATEGY" | Split frame: blurred red headline / crisp blue playbook side | High contrast
3. TEXT: "KNOW THE MOVE" | Arms crossed, stadium-light rim light | Purple edge glow
4. TEXT: "BEFORE YOU MAKE IT" | Close-up, serious-coach expression | Minimal text, large face
5. TEXT: "AGENT FORWARD THIS" | Holding phone toward camera, agent-friendly vibe | Green check icon sticker`,

    agentVersion: `AGENT PLAYBOOK — ${topic}

• Forwardable hook: "${hook}"
• Use in buyer consults: "Let's separate the headline from your actual payment path this spring."
• Use in listing convos: "Sellers care that your buyer has a plan — not just a pre-approval letter."
• Shareable line: "My lender educates — they don't rate-spam. Want the one-pager?"
• Offer: Happy to join a 10-minute Zoom for your team — no pitch deck, just talking points.
• Compliance note: Educational only; every file is different — verify with LO for specific scenarios.`,

    consumerVersion: `Here's the simple version:

${hook}

What this means for you:
• Don't make a huge decision based on a social post or a scary headline alone.
• Focus on your monthly payment comfort, how long you'll keep the loan, and your moving timeline.
• Ask your lender to explain the tradeoffs in plain English — not just the lowest rate on a screen.

If you're buying: get clear on your number before you fall in love with a kitchen.
If you own already: ask whether this changes your plan for the next year — refinance, HELOC, or stay put.

Want a second opinion without the sales pressure? That's what a strategy review is for.`,
  };
}
