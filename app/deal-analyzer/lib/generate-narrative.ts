import { dealPathMeta } from "./constants";
import { buildNarrativeSystemPrompt, buildNarrativeUserPrompt } from "./narrative-prompt";
import {
  isCompleteNarrative,
  isLegacyNarrative,
  parseAiNarrative,
  upgradeLegacyNarrative,
} from "./narrative-parse";
import type { PlaybookNarrative } from "./narrative-types";
import { generateStaticNarrative } from "./report-content";
import type { DealAnalysisResult, DealInputs } from "./types";

export type NarrativeContext = {
  dealType: string;
  leadRole: string;
  leadName?: string;
  referralSource?: string;
  agentName?: string;
  partnerAgentName?: string;
  notes?: string;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
};

function getOpenAiConfig() {
  return {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  };
}

export async function generateAiNarrative(
  ctx: NarrativeContext,
): Promise<PlaybookNarrative | null> {
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
      temperature: 0.65,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildNarrativeSystemPrompt() },
        {
          role: "user",
          content: buildNarrativeUserPrompt({
            dealType: ctx.dealType,
            leadRole: ctx.leadRole,
            leadName: ctx.leadName,
            referralSource: ctx.referralSource,
            agentName: ctx.agentName,
            notes: ctx.notes,
            inputs: ctx.inputs,
            analysis: ctx.analysis,
          }),
        },
      ],
    }),
  });

  if (!response.ok) {
    console.error("[deal-analyzer] OpenAI error", await response.text());
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return parseAiNarrative(JSON.parse(content));
  } catch {
    return null;
  }
}

export async function resolveReportNarrative(
  ctx: NarrativeContext,
): Promise<PlaybookNarrative> {
  const staticNarrative = generateStaticNarrative(ctx.inputs, ctx.analysis, {
    leadRole: ctx.leadRole,
    leadName: ctx.leadName,
    agentName: ctx.agentName,
    partnerAgentName: ctx.partnerAgentName,
  });

  try {
    const ai = await generateAiNarrative(ctx);
    if (ai) return ai;
  } catch (err) {
    console.error("[deal-analyzer] narrative generation failed", err);
  }

  return staticNarrative;
}

export function normalizeStoredNarrative(
  raw: unknown,
  inputs: DealInputs,
  analysis: DealAnalysisResult,
  meta?: {
    leadRole?: string;
    leadName?: string;
    agentName?: string;
    partnerAgentName?: string;
  },
): PlaybookNarrative {
  if (isCompleteNarrative(raw)) {
    return raw;
  }

  const staticFallback = generateStaticNarrative(inputs, analysis, {
    leadRole: meta?.leadRole,
    leadName: meta?.leadName,
    agentName: meta?.agentName,
    partnerAgentName: meta?.partnerAgentName,
  });

  if (isLegacyNarrative(raw)) {
    return upgradeLegacyNarrative(raw as Record<string, unknown>, staticFallback);
  }

  return staticFallback;
}

/** @deprecated Use PlaybookNarrative */
export type ReportNarrative = PlaybookNarrative;
