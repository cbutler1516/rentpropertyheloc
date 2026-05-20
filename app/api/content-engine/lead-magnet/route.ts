import { NextResponse } from "next/server";
import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
} from "@/app/content-engine/lib/brand-voices";
import { generateDemoLeadMagnet } from "@/app/content-engine/lib/generate-lead-magnet-fallback";
import { isLeadMagnetType } from "@/app/content-engine/lib/lead-magnet-types";
import {
  buildLeadMagnetSystemPrompt,
  buildLeadMagnetUserPrompt,
} from "@/app/content-engine/lib/lead-magnet-prompt";
import { parseLeadMagnetSections } from "@/app/content-engine/lib/lead-magnet-parse";
import { modelUsedFromMode } from "@/app/content-engine/lib/metadata";
import type { GenerateLeadMagnetRequest } from "@/app/content-engine/lib/types";

function summarizePackageContext(body: GenerateLeadMagnetRequest): string {
  const parts: string[] = [];
  if (body.outputs?.consumerVersion) {
    parts.push(`Consumer: ${body.outputs.consumerVersion.slice(0, 400)}`);
  }
  if (body.outputs?.agentVersion) {
    parts.push(`Agent: ${body.outputs.agentVersion.slice(0, 300)}`);
  }
  if (body.campaignOutputs?.hooks) {
    parts.push(`Hooks: ${body.campaignOutputs.hooks.slice(0, 300)}`);
  }
  if (body.campaignOutputs?.seoBlogIdea) {
    parts.push(`SEO: ${body.campaignOutputs.seoBlogIdea.slice(0, 300)}`);
  }
  return parts.join("\n");
}

function summarizeLanding(body: GenerateLeadMagnetRequest): string | undefined {
  if (!body.landingPage) return undefined;
  const { sections } = body.landingPage;
  return [
    `Headline: ${sections.heroHeadline}`,
    `Summary: ${sections.problemSection.slice(0, 300)}`,
    `Benefits: ${sections.keyBenefits.slice(0, 200)}`,
  ].join("\n");
}

function summarizeCalendar(body: GenerateLeadMagnetRequest): string | undefined {
  if (!body.calendar) return undefined;
  return [
    `Theme: ${body.calendar.weekTheme}`,
    ...body.calendar.days.slice(0, 3).map(
      (d) => `Day ${d.dayIndex} (${d.platform}): ${d.hook.slice(0, 80)}`,
    ),
  ].join("\n");
}

async function generateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
): Promise<ReturnType<typeof parseLeadMagnetSections>> {
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
    console.error("OpenAI lead magnet error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return parseLeadMagnetSections(JSON.parse(content));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: GenerateLeadMagnetRequest;
  try {
    body = (await request.json()) as GenerateLeadMagnetRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isLeadMagnetType(body.type)) {
    return NextResponse.json({ error: "Invalid lead magnet type." }, { status: 400 });
  }

  const sourceInput = body.sourceInput?.trim() ?? "";
  if (sourceInput.length < 8) {
    return NextResponse.json(
      { error: "Source material is required to build a lead magnet." },
      { status: 400 },
    );
  }

  const brandVoiceId = isBrandVoiceId(body.brandVoiceId ?? "")
    ? body.brandVoiceId!
    : DEFAULT_BRAND_VOICE_ID;

  const userPrompt = buildLeadMagnetUserPrompt({
    type: body.type,
    sourceInput,
    topic: body.topic ?? sourceInput,
    title: body.title ?? "Content package",
    contentSummary: summarizePackageContext(body),
    landingSummary: summarizeLanding(body),
    calendarSummary: summarizeCalendar(body),
  });

  const aiSections = await generateWithOpenAI(
    buildLeadMagnetSystemPrompt(brandVoiceId),
    userPrompt,
  );

  const mode = aiSections ? "ai" : "demo";
  const demo = generateDemoLeadMagnet({
    type: body.type,
    sourceInput,
    topic: body.topic ?? sourceInput,
    title: body.title ?? "Content package",
    brandVoiceId,
    landingPage: body.landingPage,
    calendar: body.calendar,
  });

  const leadMagnet = aiSections
    ? {
        type: body.type,
        sections: aiSections,
        generatedAt: new Date().toISOString(),
        modelUsed: modelUsedFromMode("ai", undefined, process.env.OPENAI_MODEL),
      }
    : demo;

  return NextResponse.json({ leadMagnet, mode });
}
