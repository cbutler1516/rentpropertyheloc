import { NextResponse } from "next/server";
import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
  type BrandVoiceId,
} from "@/app/content-engine/lib/brand-voices";
import {
  buildLaunchHubFromPackage,
  mergeLaunchHub,
} from "@/app/content-engine/lib/build-launch-hub";
import {
  buildLaunchHubSystemPrompt,
  buildLaunchHubUserPrompt,
} from "@/app/content-engine/lib/launch-hub-prompt";
import { modelUsedFromMode } from "@/app/content-engine/lib/metadata";
import type { SyncLaunchHubRequest } from "@/app/content-engine/lib/types";

async function enrichWithOpenAI(
  brandVoiceId: BrandVoiceId,
  userPrompt: string,
): Promise<{ followUpSequenceIdea: string; crmFollowUpPlan: string } | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.65,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildLaunchHubSystemPrompt(brandVoiceId) },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    console.error("OpenAI launch hub error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    const parsed = JSON.parse(content) as Record<string, unknown>;
    if (
      typeof parsed.followUpSequenceIdea === "string" &&
      typeof parsed.crmFollowUpPlan === "string"
    ) {
      return {
        followUpSequenceIdea: parsed.followUpSequenceIdea.trim(),
        crmFollowUpPlan: parsed.crmFollowUpPlan.trim(),
      };
    }
  } catch {
    return null;
  }
  return null;
}

export async function POST(request: Request) {
  let body: SyncLaunchHubRequest;
  try {
    body = (await request.json()) as SyncLaunchHubRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const brandVoiceId = isBrandVoiceId(body.brandVoiceId ?? "")
    ? body.brandVoiceId!
    : DEFAULT_BRAND_VOICE_ID;

  const fresh = buildLaunchHubFromPackage({
    title: body.title,
    topic: body.topic,
    audience: body.audience,
    brandVoiceId,
    generationMode: body.generationMode,
    hasContentOutputs: body.hasContentOutputs,
    outputs: body.outputs,
    campaignOutputs: body.campaignOutputs,
    landingPage: body.landingPage,
    calendar: body.calendar,
    leadMagnet: body.leadMagnet,
  });

  let launchHub = mergeLaunchHub(body.existingLaunchHub ?? null, fresh);

  const ai = await enrichWithOpenAI(
    brandVoiceId,
    buildLaunchHubUserPrompt({
      topic: body.topic,
      audience: body.audience,
      campaignName: launchHub.fields.campaignName,
      campaignGoal: launchHub.fields.campaignGoal,
      primaryOffer: launchHub.summary.primaryOffer,
      funnelSummary: [
        `Platforms: ${launchHub.summary.bestPlatforms}`,
        `Weekly plan: ${launchHub.summary.weeklyPublishingPlan.slice(0, 400)}`,
        `Landing: ${launchHub.summary.landingPageIntent}`,
        `Lead magnet: ${launchHub.summary.leadMagnetType}`,
      ].join("\n"),
    }),
  );

  const mode = ai ? "ai" : "demo";
  if (ai) {
    launchHub = {
      ...launchHub,
      summary: {
        ...launchHub.summary,
        followUpSequenceIdea: ai.followUpSequenceIdea,
      },
      crmFollowUpPlan: ai.crmFollowUpPlan,
      modelUsed: modelUsedFromMode("ai", undefined, process.env.OPENAI_MODEL),
      updatedAt: new Date().toISOString(),
    };
  }

  return NextResponse.json({ launchHub, mode });
}
