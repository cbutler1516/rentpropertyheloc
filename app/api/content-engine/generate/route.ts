import { NextResponse } from "next/server";
import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
} from "@/app/content-engine/lib/brand-voices";
import { generateDemoCampaign } from "@/app/content-engine/lib/generate-campaign-fallback";
import { generateDemoPackage } from "@/app/content-engine/lib/generate-fallback";
import {
  inferAudience,
  inferTopic,
  modelUsedFromMode,
  packageTitleFromInput,
} from "@/app/content-engine/lib/metadata";
import {
  buildCampaignSystemPrompt,
  buildCampaignUserPrompt,
  buildSystemPrompt,
  buildUserPrompt,
} from "@/app/content-engine/lib/prompt";
import {
  CAMPAIGN_OUTPUT_TAB_KEYS,
  OUTPUT_TAB_KEYS,
  type CampaignOutputs,
  type ContentOutputs,
  type GenerateRequest,
} from "@/app/content-engine/lib/types";

const MIN_SINGLE_INPUT = 24;
const MIN_CAMPAIGN_TOPIC = 8;

function parseSingleOutputs(raw: unknown): ContentOutputs | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const outputs = {} as ContentOutputs;
  for (const key of OUTPUT_TAB_KEYS) {
    const value = record[key];
    if (typeof value !== "string" || !value.trim()) return null;
    outputs[key] = value.trim();
  }
  return outputs;
}

function parseCampaignOutputs(raw: unknown): CampaignOutputs | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const outputs = {} as CampaignOutputs;
  for (const key of CAMPAIGN_OUTPUT_TAB_KEYS) {
    const value = record[key];
    if (typeof value !== "string" || !value.trim()) return null;
    outputs[key] = value.trim();
  }
  return outputs;
}

async function generateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
): Promise<unknown | null> {
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
      temperature: 0.72,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    console.error("OpenAI error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: GenerateRequest;
  try {
    body = (await request.json()) as GenerateRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const input = body.input?.trim() ?? "";
  const generationMode = body.mode === "campaign" ? "campaign" : "single";
  const brandVoiceId = isBrandVoiceId(body.brandVoiceId ?? "")
    ? body.brandVoiceId!
    : DEFAULT_BRAND_VOICE_ID;

  if (generationMode === "campaign") {
    if (input.length < MIN_CAMPAIGN_TOPIC) {
      return NextResponse.json(
        {
          error: `Enter at least ${MIN_CAMPAIGN_TOPIC} characters for your campaign topic.`,
        },
        { status: 400 },
      );
    }

    const raw = await generateWithOpenAI(
      buildCampaignSystemPrompt(brandVoiceId),
      buildCampaignUserPrompt(input),
    );
    const aiCampaign = raw ? parseCampaignOutputs(raw) : null;
    const mode = aiCampaign ? "ai" : "demo";
    const campaignOutputs =
      aiCampaign ?? generateDemoCampaign(input, brandVoiceId);

    return NextResponse.json({
      generationMode: "campaign",
      brandVoiceId,
      campaignOutputs,
      mode,
      modelUsed: modelUsedFromMode(mode, undefined, process.env.OPENAI_MODEL),
      title: `Campaign: ${input.slice(0, 48)}${input.length > 48 ? "…" : ""}`,
      topic: input,
      audience: inferAudience(input),
    });
  }

  if (input.length < MIN_SINGLE_INPUT) {
    return NextResponse.json(
      {
        error: `Add at least ${MIN_SINGLE_INPUT} characters of source material to generate a package.`,
      },
      { status: 400 },
    );
  }

  const raw = await generateWithOpenAI(
    buildSystemPrompt(brandVoiceId),
    buildUserPrompt(input),
  );
  const aiOutputs = raw ? parseSingleOutputs(raw) : null;
  const mode = aiOutputs ? "ai" : "demo";
  const outputs = aiOutputs ?? generateDemoPackage(input);

  return NextResponse.json({
    generationMode: "single",
    brandVoiceId,
    outputs,
    mode,
    modelUsed: modelUsedFromMode(mode, undefined, process.env.OPENAI_MODEL),
    title: packageTitleFromInput(input),
    topic: inferTopic(input),
    audience: inferAudience(input),
  });
}
