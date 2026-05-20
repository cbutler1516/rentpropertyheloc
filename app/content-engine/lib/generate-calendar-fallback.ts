import { getBrandVoice, type BrandVoiceId } from "./brand-voices";
import type {
  CalendarDayEntry,
  ContentCalendarRecord,
  LandingPageRecord,
} from "./types";
import { CALENDAR_DAY_COUNT } from "./types";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type DayTemplate = Omit<CalendarDayEntry, "dayIndex" | "dayLabel" | "status">;

function excerpt(text: string, max = 80) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

function buildDayTemplates(
  topic: string,
  hook: string,
  cta: string,
  landingTieIn: string,
): DayTemplate[] {
  return [
    {
      platform: "tiktok-reels",
      postType: "Short-form explainer",
      audienceLens: "consumer",
      hook: `Everyone's yelling about ${topic}. Here's the actual play.`,
      caption: `${hook}\n\n3 moves:\n→ Separate noise from your payment path\n→ Align structure with your 12-month plan\n→ Know your number before the next showing\n\n${cta}`,
      cta,
      suggestedVisual:
        "9:16 whiteboard clip — headline chaos → calm checklist; navy + gold lower-third.",
      videoPrompt: `9:16, 18 sec: Educator at glass whiteboard labeled "${topic}"; chaotic news ticker dissolves to calm checklist; navy and gold accents; premium calm mood; end card The Loan Playbook.`,
      landingPageTieIn: landingTieIn,
    },
    {
      platform: "linkedin",
      postType: "Agent-forwardable insight",
      audienceLens: "agent",
      hook: `Agents: need language for ${topic} without rate bait?`,
      caption: `Quick playbook your buyers can actually use on ${topic}.\n\n• What's hype vs. what changes their payment path\n• One paragraph you can paste into consult notes\n• When to loop in the LO before the offer\n\n${cta}\n\n#MortgageStrategy #TheLoanPlaybook`,
      cta,
      suggestedVisual:
        "Carousel slide 1: bold headline; slides 2–4: three bullet plays; slide 5: CTA.",
      videoPrompt: "",
      landingPageTieIn: landingTieIn,
    },
    {
      platform: "facebook",
      postType: "Community Q&A",
      audienceLens: "consumer",
      hook: `Real talk on ${topic} — what's hype vs. what affects your offer?`,
      caption: `If you're buying: get clear on your comfortable payment before the portal.\nIf you own: ask whether this changes your year—not just this month.\n\nComment BUYER or HOMEOWNER and I'll point you to the right guide.\n\n${cta}`,
      cta,
      suggestedVisual:
        "Square graphic — split headline / checklist; warm lifestyle b-roll optional.",
      videoPrompt: "",
      landingPageTieIn: landingTieIn,
    },
    {
      platform: "email",
      postType: "Newsletter segment",
      audienceLens: "consumer",
      hook: `Subject: ${topic} — your 7-day playbook`,
      caption: `Preview: One topic, seven posts, zero rate spam.\n\n---\n\nHi —\n\nHere's what changed on ${topic} and what didn't for your timeline.\n\nInside this week:\n• The headline vs. your payment path\n• Agent language you can forward\n• One next step that fits your goals\n\n${cta}`,
      cta,
      suggestedVisual: "Simple header image — navy background, gold accent line, topic title.",
      videoPrompt: "",
      landingPageTieIn: landingTieIn,
    },
    {
      platform: "blog",
      postType: "SEO article",
      audienceLens: "consumer",
      hook: `${topic}: A Borrower-Friendly Playbook (Without the Headline Panic)`,
      caption: `Working title for blog publish.\n\nH2 outline:\n• What actually changed\n• Who feels it first (buyers vs. homeowners)\n• Three questions for your lender\n• Agent-forwardable summary\n• What to watch next week\n\nTarget keyword: ${topic.toLowerCase()} mortgage strategy\n\n${cta}`,
      cta,
      suggestedVisual:
        "Featured image — city skyline + notebook; alt text includes topic keyword.",
      videoPrompt: "",
      landingPageTieIn: landingTieIn,
    },
    {
      platform: "tiktok-reels",
      postType: "Myth vs. playbook",
      audienceLens: "agent",
      hook: `Stop sending clients rate screenshots on ${topic}.`,
      caption: `Send this instead:\n→ One sentence on what changed\n→ One sentence on what didn't\n→ One CTA: strategy review before the offer\n\nSave for your next buyer consult.\n\n${cta}`,
      cta,
      suggestedVisual:
        "Talking head + on-screen text myth/reality; subtitle every 3 seconds.",
      videoPrompt: `9:16, 15 sec: Split screen — red "MYTH" ticker top, green "PLAYBOOK" checklist bottom; hand checks boxes; upbeat subtle music; end card The Loan Playbook.`,
      landingPageTieIn: landingTieIn,
    },
    {
      platform: "linkedin",
      postType: "Week wrap / CTA",
      audienceLens: "consumer",
      hook: `Week in review: ${topic} without the panic posts.`,
      caption: `We covered ${topic} across seven channels this week—strategy over headlines.\n\nMissed a day? Start with the Day 1 Reel, then grab the playbook brief.\n\n${cta}\n\nKnow the move before you make it.`,
      cta,
      suggestedVisual:
        "Static recap graphic — 7-day grid with platform icons; link in first comment.",
      videoPrompt: "",
      landingPageTieIn: landingTieIn,
    },
  ];
}

export function generateDemoCalendar(input: {
  sourceInput: string;
  topic: string;
  title: string;
  brandVoiceId: BrandVoiceId;
  landingPage?: LandingPageRecord;
}): ContentCalendarRecord {
  const voice = getBrandVoice(input.brandVoiceId);
  const cta = voice.preferred_ctas[0] ?? "Book your strategy review — know the move first.";
  const topic = input.topic || excerpt(input.sourceInput, 60);
  const hook = excerpt(input.sourceInput, 120);
  const landingTieIn = input.landingPage
    ? `Drive to landing page: "${input.landingPage.sections.heroHeadline}" — ${input.landingPage.sections.primaryCta}`
    : `Drive to strategy review / playbook brief on ${topic}.`;

  const templates = buildDayTemplates(topic, hook, cta, landingTieIn);
  const days: CalendarDayEntry[] = templates.map((template, index) => ({
    ...template,
    dayIndex: index + 1,
    dayLabel: `${WEEKDAYS[index]} — Day ${index + 1}`,
    status: "draft" as const,
  }));

  return {
    weekTheme: `${topic} — 7-day Loan Playbook publishing plan`,
    days: days.slice(0, CALENDAR_DAY_COUNT),
    generatedAt: new Date().toISOString(),
    modelUsed: "demo",
  };
}

export function generateDemoCalendarDay(input: {
  dayIndex: number;
  sourceInput: string;
  topic: string;
  brandVoiceId: BrandVoiceId;
  landingPage?: LandingPageRecord;
}): CalendarDayEntry {
  const full = generateDemoCalendar({
    sourceInput: input.sourceInput,
    topic: input.topic,
    title: "Regenerate",
    brandVoiceId: input.brandVoiceId,
    landingPage: input.landingPage,
  });
  const existing = full.days.find((d) => d.dayIndex === input.dayIndex);
  if (existing) return { ...existing, status: "draft" };

  const voice = getBrandVoice(input.brandVoiceId);
  const cta = voice.preferred_ctas[0] ?? "Book your strategy review.";
  const topic = input.topic || excerpt(input.sourceInput, 60);
  const idx = Math.min(Math.max(input.dayIndex, 1), CALENDAR_DAY_COUNT) - 1;

  return {
    dayIndex: input.dayIndex,
    dayLabel: `${WEEKDAYS[idx]} — Day ${input.dayIndex}`,
    platform: "linkedin",
    postType: "Bonus post",
    audienceLens: "consumer",
    hook: `Fresh angle on ${topic} for day ${input.dayIndex}.`,
    caption: `${excerpt(input.sourceInput, 200)}\n\n${cta}`,
    cta,
    suggestedVisual: "Simple branded graphic with topic headline.",
    videoPrompt: "",
    landingPageTieIn: `Strategy review CTA for ${topic}.`,
    status: "draft",
  };
}
