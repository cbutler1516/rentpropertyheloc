import { NextResponse } from "next/server";
import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
} from "@/app/content-engine/lib/brand-voices";
import { parseCalendarResponse } from "@/app/content-engine/lib/calendar-parse";
import {
  buildCalendarSystemPrompt,
  buildCalendarUserPrompt,
} from "@/app/content-engine/lib/calendar-prompt";
import { generateDemoCalendar } from "@/app/content-engine/lib/generate-calendar-fallback";
import { modelUsedFromMode } from "@/app/content-engine/lib/metadata";
import type { GenerateCalendarRequest } from "@/app/content-engine/lib/types";

function summarizePackageContext(body: GenerateCalendarRequest): string {
  const parts: string[] = [];
  if (body.outputs?.consumerVersion) {
    parts.push(`Consumer: ${body.outputs.consumerVersion.slice(0, 350)}`);
  }
  if (body.outputs?.tiktokHooks) {
    parts.push(`Hooks: ${body.outputs.tiktokHooks.slice(0, 250)}`);
  }
  if (body.campaignOutputs?.postingSchedule) {
    parts.push(`Schedule: ${body.campaignOutputs.postingSchedule.slice(0, 350)}`);
  }
  if (body.campaignOutputs?.hooks) {
    parts.push(`Campaign hooks: ${body.campaignOutputs.hooks.slice(0, 250)}`);
  }
  return parts.join("\n");
}

function summarizeLanding(body: GenerateCalendarRequest): string | undefined {
  if (!body.landingPage) return undefined;
  const { sections } = body.landingPage;
  return `Headline: ${sections.heroHeadline}\nPrimary CTA: ${sections.primaryCta}`;
}

async function generateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
): Promise<ReturnType<typeof parseCalendarResponse>> {
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
    console.error("OpenAI calendar error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return parseCalendarResponse(JSON.parse(content));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: GenerateCalendarRequest;
  try {
    body = (await request.json()) as GenerateCalendarRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const sourceInput = body.sourceInput?.trim() ?? "";
  if (sourceInput.length < 8) {
    return NextResponse.json(
      { error: "Source material is required to build a calendar." },
      { status: 400 },
    );
  }

  const brandVoiceId = isBrandVoiceId(body.brandVoiceId ?? "")
    ? body.brandVoiceId!
    : DEFAULT_BRAND_VOICE_ID;

  const userPrompt = buildCalendarUserPrompt({
    sourceInput,
    topic: body.topic ?? sourceInput,
    title: body.title ?? "Content package",
    contentSummary: summarizePackageContext(body),
    landingSummary: summarizeLanding(body),
  });

  const aiCalendar = await generateWithOpenAI(
    buildCalendarSystemPrompt(brandVoiceId),
    userPrompt,
  );

  const mode = aiCalendar ? "ai" : "demo";
  const calendar = aiCalendar
    ? {
        ...aiCalendar,
        modelUsed: modelUsedFromMode("ai", undefined, process.env.OPENAI_MODEL),
      }
    : generateDemoCalendar({
        sourceInput,
        topic: body.topic ?? sourceInput,
        title: body.title ?? "Content package",
        brandVoiceId,
        landingPage: body.landingPage,
      });

  return NextResponse.json({ calendar, mode });
}
