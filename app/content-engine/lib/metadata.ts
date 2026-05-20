import type { ContentAudience, ContentTone } from "./types";

export function inferAudience(input: string): ContentAudience {
  const lower = input.toLowerCase();
  if (
    lower.includes("realtor") ||
    lower.includes("agent partner") ||
    lower.includes("listing")
  ) {
    return "agent";
  }
  if (
    lower.includes("investor") ||
    lower.includes("dscr") ||
    lower.includes("commercial")
  ) {
    return "commercial";
  }
  if (
    lower.includes("refinanc") ||
    lower.includes("heloc") ||
    lower.includes("equity") ||
    lower.includes("homeowner")
  ) {
    return "homeowner";
  }
  if (
    lower.includes("buyer") ||
    lower.includes("pre-approv") ||
    lower.includes("offer") ||
    lower.includes("first-time")
  ) {
    return "buyer";
  }
  return "general";
}

export function inferTopic(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("fed") || lower.includes("fomc") || lower.includes("powell"))
    return "Fed & rate policy";
  if (lower.includes("refinanc")) return "Refinance timing";
  if (lower.includes("jumbo")) return "Jumbo financing";
  if (lower.includes("buy-before-sell") || lower.includes("bridge"))
    return "Buy before you sell";
  if (lower.includes("inventory") || lower.includes("spring market"))
    return "Market inventory";
  if (lower.includes("concession")) return "Seller concessions";
  if (lower.includes("self-employed") || lower.includes("1099"))
    return "Self-employed borrowers";
  if (lower.includes("condo")) return "Condo financing";
  return "Mortgage strategy";
}

export function inferTone(input: string): ContentTone {
  const lower = input.toLowerCase();
  if (lower.includes("urgent") || lower.includes("asap") || lower.includes("deadline"))
    return "urgent";
  if (lower.includes("funny") || lower.includes("witty") || lower.includes("humor"))
    return "witty";
  if (lower.includes("explain") || lower.includes("guide") || lower.includes("how to"))
    return "educational";
  return "strategic";
}

export function inferTags(input: string, topic: string, audience: ContentAudience): string[] {
  const tags = new Set<string>([
    audience,
    topic.toLowerCase().replace(/\s+/g, "-"),
  ]);
  const lower = input.toLowerCase();
  if (lower.includes("fed")) tags.add("fed");
  if (lower.includes("seattle") || lower.includes("puget")) tags.add("puget-sound");
  if (lower.includes("rate")) tags.add("rates");
  if (lower.includes("video") || lower.includes("transcript")) tags.add("video");
  return [...tags].slice(0, 8);
}

export function packageTitleFromInput(input: string) {
  const line = input.trim().split(/\n/)[0] ?? "Untitled package";
  return line.length > 56 ? `${line.slice(0, 53)}…` : line;
}

export function modelUsedFromMode(
  mode: "ai" | "demo",
  model?: string,
  envModel?: string,
) {
  if (mode === "demo") return "demo";
  return model ?? envModel ?? "gpt-4o-mini";
}
