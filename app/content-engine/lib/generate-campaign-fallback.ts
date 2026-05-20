import type { BrandVoiceId } from "./brand-voices";
import { getBrandVoice } from "./brand-voices";
import type { CampaignOutputs } from "./types";
import { CAMPAIGN_OUTPUT_TAB_KEYS } from "./types";

function emptyCampaignOutputs(): CampaignOutputs {
  return CAMPAIGN_OUTPUT_TAB_KEYS.reduce(
    (acc, key) => {
      acc[key] = "";
      return acc;
    },
    {} as CampaignOutputs,
  );
}

export function generateDemoCampaign(
  topic: string,
  brandVoiceId: BrandVoiceId,
): CampaignOutputs {
  const trimmed = topic.trim();
  if (!trimmed) return emptyCampaignOutputs();

  const voice = getBrandVoice(brandVoiceId);
  const cta = voice.preferred_ctas[0] ?? "Know the move before you make it.";

  return {
    shortFormVideoIdeas: `1. "The ${trimmed} play in 20 seconds" — whiteboard + city b-roll; open on headline chaos, cut to calm strategy.
2. "What your agent wishes you knew about ${trimmed}" — talking head, subtitle hooks every 3 sec.
3. "Rate noise vs. real decision" — split screen: red news ticker / blue playbook notes.
4. "Buyer POV: before the offer" — walk-through mock kitchen, voiceover on payment clarity.
5. "7-day challenge teaser" — countdown graphic; tease full campaign. CTA: ${cta}`,

    hooks: `1. Everyone's yelling about ${trimmed}. Here's the actual play.
2. Stop making this decision from a screenshot.
3. Your agent can forward this in one tap.
4. The headline changed. Your timeline might not need to.
5. Save this before your next showing.`,

    socialPosts: `Post 1 (LinkedIn):
Quick playbook on ${trimmed}.

Three moves:
→ Separate noise from your payment path
→ Align structure with your 12-month plan
→ Give your agent one forwardable paragraph

${cta}
#MortgageStrategy #TheLoanPlaybook

Post 2 (Facebook):
Real talk on ${trimmed} — what's hype vs. what affects your offer?

If you're buying: get clear on your number before the portal.
If you own: ask if this changes your year, not just this month.

Comment BUYER or HOMEOWNER and I'll point you to the right guide.

Post 3 (LinkedIn):
Agents — need language for ${trimmed} without rate bait?

I'll send a one-pager you can paste into buyer consults. DM PLAYBOOK.

Post 4 (Facebook):
${trimmed} got you stressed?

You're allowed to move slow and think clearly. Strategy beats panic.

Post 5 (LinkedIn):
The Loan Playbook take on ${trimmed}: educate, don't advertise.

Watch the Day 1 video in the carousel. Link in comments.`,

    emailSubjectLines: `1. Subject: ${trimmed} — your 7-day playbook
   Preview: One topic, seven posts, zero rate spam.

2. Subject: What changed (and what didn't) on ${trimmed}
   Preview: A calm read before you text your agent.

3. Subject: Forward this before your next showing
   Preview: Agent-friendly talking points inside.`,

    seoBlogIdea: `Working title: ${trimmed}: A Borrower-Friendly Playbook (Without the Headline Panic)

Target keyword: ${trimmed.toLowerCase()} mortgage strategy

Angle: Translate news into decisions — payment, timeline, equity, and agent conversations.

H2 sections:
- What actually changed
- Who feels it first (buyers vs. homeowners vs. investors)
- Three questions for your lender
- Agent-forwardable summary
- What to watch next week
- Next step: strategy review`,

    soraPromptIdeas: `1. 16:9, 18 sec: Modern condo at golden hour; educator at glass whiteboard labeled "${trimmed}"; slow dolly-in; navy + gold accents; calm premium mood.
2. 9:16, 15 sec: Vertical split — chaotic news headlines top, calm checklist bottom; hand checks boxes; upbeat subtle music.
3. 16:9, 22 sec: Seattle skyline timelapse → coffee shop → laptop with "PLAYBOOK" folder; voiceover-ready pacing; end card The Loan Playbook.`,

    heygenPromptIdeas: `1. [SCENE] Office nook, soft key light.
[ON CAMERA] "Day 1 of our ${trimmed} campaign — here's the one thing I'd tell a client after a showing."
[B-ROLL] Three bullet graphics. CTA: ${cta}

2. [SCENE] Standing near whiteboard.
[ON CAMERA] "Agents, steal this line for buyer consults on ${trimmed}…"
[END] Lower-third NMLS • Educational only

3. [SCENE] Casual, stadium-light rim.
[ON CAMERA] "Homeowners: before you refinance because of a headline, run this 60-second check…"`,

    postingSchedule: `Day 1 (Mon) — TikTok/Reels: Short-form video idea #1 — 9:00 AM
Day 2 (Tue) — LinkedIn: Post 1 — 8:30 AM
Day 3 (Wed) — Email: Subject line #1 campaign send — 10:00 AM
Day 4 (Thu) — Facebook: Post 2 — 12:00 PM
Day 5 (Fri) — TikTok/Reels: Hook #3 filmed — 4:00 PM
Day 6 (Sat) — LinkedIn carousel: SEO blog angle teaser — 10:00 AM
Day 7 (Sun) — YouTube Short + blog publish: "${trimmed} playbook" — 11:00 AM`,
  };
}
