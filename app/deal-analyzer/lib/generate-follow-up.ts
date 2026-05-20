import {
  buildFollowUpSystemPrompt,
  buildFollowUpUserPrompt,
} from "./follow-up-prompt";
import { parseGeneratedFollowUp } from "./follow-up-parse";
import { generateStaticFollowUp } from "./follow-up-content";
import type { GeneratedFollowUp } from "./follow-up-types";
import type { DealAnalysisResult, DealInputs, LeadCapture } from "./types";
import type { PlaybookNarrative } from "./narrative-types";

export type FollowUpContext = {
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative?: PlaybookNarrative | null;
  reportSlug: string;
  siteUrl: string;
};

function getOpenAiConfig() {
  return {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  };
}

export async function generateAiFollowUp(
  ctx: FollowUpContext,
): Promise<GeneratedFollowUp | null> {
  const { apiKey, model } = getOpenAiConfig();
  if (!apiKey) return null;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildFollowUpSystemPrompt() },
        { role: "user", content: buildFollowUpUserPrompt(ctx) },
      ],
    }),
  });

  if (!response.ok) {
    console.error("[deal-analyzer] follow-up OpenAI error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return parseGeneratedFollowUp(JSON.parse(content));
  } catch {
    return null;
  }
}

export async function resolveFollowUpContent(
  ctx: FollowUpContext,
): Promise<{ followUp: GeneratedFollowUp; source: "ai" | "static" }> {
  const staticFollowUp = generateStaticFollowUp(ctx);

  try {
    const ai = await generateAiFollowUp(ctx);
    if (ai) return { followUp: ai, source: "ai" };
  } catch (err) {
    console.error("[deal-analyzer] follow-up generation failed", err);
  }

  return { followUp: staticFollowUp, source: "static" };
}
