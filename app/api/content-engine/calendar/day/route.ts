import { NextResponse } from "next/server";
import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
} from "@/app/content-engine/lib/brand-voices";
import { parseCalendarDayResponse } from "@/app/content-engine/lib/calendar-parse";
import {
  buildRegenerateDaySystemPrompt,
  buildRegenerateDayUserPrompt,
} from "@/app/content-engine/lib/calendar-prompt";
import { generateDemoCalendarDay } from "@/app/content-engine/lib/generate-calendar-fallback";
import { modelUsedFromMode } from "@/app/content-engine/lib/metadata";
import type { RegenerateCalendarDayRequest } from "@/app/content-engine/lib/types";
import { CALENDAR_DAY_COUNT } from "@/app/content-engine/lib/types";

function siblingSummary(
  calendar: RegenerateCalendarDayRequest["calendar"],
  dayIndex: number,
): string {
  return calendar.days
    .filter((d) => d.dayIndex !== dayIndex)
    .map(
      (d) =>
        `Day ${d.dayIndex} (${d.platform}): ${d.hook.slice(0, 80)}…`,
    )
    .join("\n");
}

async function regenerateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
): Promise<ReturnType<typeof parseCalendarDayResponse>> {
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
      temperature: 0.78,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    console.error("OpenAI calendar day error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return parseCalendarDayResponse(JSON.parse(content));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: RegenerateCalendarDayRequest;
  try {
    body = (await request.json()) as RegenerateCalendarDayRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const dayIndex = body.dayIndex;
  if (
    typeof dayIndex !== "number" ||
    dayIndex < 1 ||
    dayIndex > CALENDAR_DAY_COUNT
  ) {
    return NextResponse.json({ error: "Invalid day index." }, { status: 400 });
  }

  const sourceInput = body.sourceInput?.trim() ?? "";
  if (sourceInput.length < 8 || !body.calendar?.days?.length) {
    return NextResponse.json(
      { error: "Calendar and source material are required." },
      { status: 400 },
    );
  }

  const brandVoiceId = isBrandVoiceId(body.brandVoiceId ?? "")
    ? body.brandVoiceId!
    : DEFAULT_BRAND_VOICE_ID;

  const userPrompt = buildRegenerateDayUserPrompt({
    dayIndex,
    sourceInput,
    topic: body.topic ?? sourceInput,
    title: body.title ?? "Content package",
    weekTheme: body.calendar.weekTheme,
    siblingSummary: siblingSummary(body.calendar, dayIndex),
  });

  const aiDay = await regenerateWithOpenAI(
    buildRegenerateDaySystemPrompt(brandVoiceId),
    userPrompt,
  );

  const mode = aiDay ? "ai" : "demo";
  const existing = body.calendar.days.find((d) => d.dayIndex === dayIndex);
  const day = aiDay
    ? {
        ...aiDay,
        dayIndex,
        status: existing?.status ?? ("draft" as const),
      }
    : generateDemoCalendarDay({
        dayIndex,
        sourceInput,
        topic: body.topic ?? sourceInput,
        brandVoiceId,
        landingPage: body.landingPage,
      });

  if (mode === "ai") {
    void modelUsedFromMode("ai", undefined, process.env.OPENAI_MODEL);
  }

  return NextResponse.json({ day, mode });
}
