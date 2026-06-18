import { randomBytes } from "crypto";

export function generateReportSlug(): string {
  const token = randomBytes(9).toString("base64url").toLowerCase().replace(/[^a-z0-9]/g, "");
  const suffix = token.slice(0, 12) || Date.now().toString(36);
  return `pb-${suffix}`;
}
