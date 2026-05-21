import { NextResponse } from "next/server";
import { parseAnalyticsRecommendPayload } from "@/app/content-engine/lib/analytics-recommend-parse";
import {
  buildAnalyticsRecommendSystemPrompt,
  buildAnalyticsRecommendUserPrompt,
} from "@/app/content-engine/lib/analytics-recommend-prompt";
import {
  buildAnalyticsInsights,
  computeAnalyticsMetrics,
} from "@/app/content-engine/lib/analytics-compute";
import { generateDemoAnalyticsRecommend } from "@/app/content-engine/lib/generate-analytics-recommend-fallback";
import { modelUsedFromMode } from "@/app/content-engine/lib/metadata";
import type { AnalyticsRecommendRequest } from "@/app/content-engine/lib/types";

async function generateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
): Promise<ReturnType<typeof parseAnalyticsRecommendPayload>> {
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
      temperature: 0.55,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    console.error("OpenAI analytics recommend error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return parseAnalyticsRecommendPayload(JSON.parse(content));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: AnalyticsRecommendRequest;
  try {
    body = (await request.json()) as AnalyticsRecommendRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.title?.trim() || !body.analytics?.metrics) {
    return NextResponse.json(
      { error: "Title and analytics metrics are required." },
      { status: 400 },
    );
  }

  const computed = computeAnalyticsMetrics(body.analytics.metrics);
  const baseInsights = buildAnalyticsInsights({
    metrics: body.analytics.metrics,
    computed,
    crmSummary: body.analytics.crmSummary,
  });

  const systemPrompt = buildAnalyticsRecommendSystemPrompt();
  const userPrompt = buildAnalyticsRecommendUserPrompt(body);
  const parsedAi = await generateWithOpenAI(systemPrompt, userPrompt);

  const mode = parsedAi ? "ai" : "demo";
  const aiInsights = parsedAi ?? generateDemoAnalyticsRecommend(body);

  const insights = {
    ...baseInsights,
    bestPerformingAssetNotes: aiInsights.bestPerformingAssetNotes,
    nextRecommendedAction: aiInsights.nextRecommendedAction,
    roiSummary: aiInsights.roiSummary,
  };

  return NextResponse.json({
    insights,
    mode,
    modelUsed: modelUsedFromMode(mode),
  });
}
