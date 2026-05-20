import { NextResponse } from "next/server";
import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
} from "@/app/content-engine/lib/brand-voices";
import { defaultFieldConfigs } from "@/app/content-engine/lib/lead-capture-fields";
import { generateDemoLeadCapture } from "@/app/content-engine/lib/generate-lead-capture-fallback";
import { isLeadCapturePreset } from "@/app/content-engine/lib/lead-capture-presets";
import { parseLeadCaptureAiPayload } from "@/app/content-engine/lib/lead-capture-parse";
import {
  buildLeadCaptureSystemPrompt,
  buildLeadCaptureUserPrompt,
} from "@/app/content-engine/lib/lead-capture-prompt";
import { modelUsedFromMode } from "@/app/content-engine/lib/metadata";
import type { GenerateLeadCaptureRequest } from "@/app/content-engine/lib/types";

async function generateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
  preset: GenerateLeadCaptureRequest["preset"],
): Promise<ReturnType<typeof parseLeadCaptureAiPayload>> {
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
      temperature: 0.68,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    console.error("OpenAI lead capture error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return parseLeadCaptureAiPayload(JSON.parse(content), preset);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: GenerateLeadCaptureRequest;
  try {
    body = (await request.json()) as GenerateLeadCaptureRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isLeadCapturePreset(body.preset)) {
    return NextResponse.json({ error: "Invalid lead capture preset." }, { status: 400 });
  }

  const sourceInput = body.sourceInput?.trim() ?? "";
  if (sourceInput.length < 8) {
    return NextResponse.json(
      { error: "Source material is required to build lead capture." },
      { status: 400 },
    );
  }

  const brandVoiceId = isBrandVoiceId(body.brandVoiceId ?? "")
    ? body.brandVoiceId!
    : DEFAULT_BRAND_VOICE_ID;

  const landingSummary = body.landingPage
    ? `Headline: ${body.landingPage.sections.heroHeadline}\nCTA: ${body.landingPage.sections.primaryCta}`
    : undefined;

  const launchSummary = body.launchHub
    ? `Campaign: ${body.launchHub.fields.campaignName}\nCTA: ${body.launchHub.fields.primaryCta}\nCRM tag: ${body.launchHub.fields.crmTag}`
    : undefined;

  const userPrompt = buildLeadCaptureUserPrompt({
    preset: body.preset,
    topic: body.topic ?? sourceInput,
    title: body.title ?? "Content package",
    sourceInput,
    landingSummary,
    launchSummary,
  });

  const parsedAi = await generateWithOpenAI(
    buildLeadCaptureSystemPrompt(brandVoiceId),
    userPrompt,
    body.preset,
  );

  const mode = parsedAi ? "ai" : "demo";
  const demo = generateDemoLeadCapture({
    preset: body.preset,
    sourceInput,
    topic: body.topic ?? sourceInput,
    title: body.title ?? "Content package",
    brandVoiceId,
    landingPage: body.landingPage,
    launchHub: body.launchHub,
  });

  const leadCapture = parsedAi
    ? {
        preset: body.preset,
        fields: defaultFieldConfigs(body.preset),
        crmSequence: parsedAi.crmSequence,
        consent: parsedAi.consent,
        generatedAt: new Date().toISOString(),
        modelUsed: modelUsedFromMode("ai", undefined, process.env.OPENAI_MODEL),
      }
    : demo;

  return NextResponse.json({ leadCapture, mode });
}
