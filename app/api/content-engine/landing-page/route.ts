import { NextResponse } from "next/server";
import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
} from "@/app/content-engine/lib/brand-voices";
import { generateDemoLandingPage } from "@/app/content-engine/lib/generate-landing-fallback";
import { isLandingPageIntent } from "@/app/content-engine/lib/landing-page-intents";
import {
  buildLandingPageSystemPrompt,
  buildLandingPageUserPrompt,
} from "@/app/content-engine/lib/landing-page-prompt";
import { modelUsedFromMode } from "@/app/content-engine/lib/metadata";
import {
  LANDING_PAGE_SECTION_KEYS,
  type GenerateLandingPageRequest,
  type LandingPageOutputs,
  type LandingPageRecord,
} from "@/app/content-engine/lib/types";

function summarizePackageContext(body: GenerateLandingPageRequest): string {
  const parts: string[] = [];
  if (body.outputs?.consumerVersion) {
    parts.push(`Consumer angle: ${body.outputs.consumerVersion.slice(0, 400)}`);
  }
  if (body.outputs?.linkedinPost) {
    parts.push(`LinkedIn: ${body.outputs.linkedinPost.slice(0, 300)}`);
  }
  if (body.campaignOutputs?.hooks) {
    parts.push(`Campaign hooks: ${body.campaignOutputs.hooks.slice(0, 300)}`);
  }
  return parts.join("\n");
}

function parseLandingSections(raw: unknown): LandingPageOutputs | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const sections = {} as LandingPageOutputs;
  for (const key of LANDING_PAGE_SECTION_KEYS) {
    const value = record[key];
    if (typeof value !== "string" || !value.trim()) return null;
    sections[key] = value.trim();
  }
  return sections;
}

async function generateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
): Promise<LandingPageOutputs | null> {
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
    console.error("OpenAI landing page error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return parseLandingSections(JSON.parse(content));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: GenerateLandingPageRequest;
  try {
    body = (await request.json()) as GenerateLandingPageRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isLandingPageIntent(body.intent)) {
    return NextResponse.json({ error: "Invalid landing page intent." }, { status: 400 });
  }

  const sourceInput = body.sourceInput?.trim() ?? "";
  if (sourceInput.length < 8) {
    return NextResponse.json(
      { error: "Source material is required to build a landing page." },
      { status: 400 },
    );
  }

  const brandVoiceId = isBrandVoiceId(body.brandVoiceId ?? "")
    ? body.brandVoiceId!
    : DEFAULT_BRAND_VOICE_ID;

  const userPrompt = buildLandingPageUserPrompt({
    intent: body.intent,
    sourceInput,
    topic: body.topic ?? sourceInput,
    title: body.title ?? "Content package",
    contentSummary: summarizePackageContext(body),
  });

  const aiSections = await generateWithOpenAI(
    buildLandingPageSystemPrompt(brandVoiceId),
    userPrompt,
  );

  const mode = aiSections ? "ai" : "demo";
  const demo = generateDemoLandingPage({
    intent: body.intent,
    sourceInput,
    topic: body.topic ?? sourceInput,
    title: body.title ?? "Content package",
  });

  const landingPage: LandingPageRecord = aiSections
    ? {
        intent: body.intent,
        sections: aiSections,
        generatedAt: new Date().toISOString(),
        modelUsed: modelUsedFromMode("ai", undefined, process.env.OPENAI_MODEL),
      }
    : demo;

  return NextResponse.json({ landingPage, mode });
}
