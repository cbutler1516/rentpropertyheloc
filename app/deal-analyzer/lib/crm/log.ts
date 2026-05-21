type CrmLogMeta = Record<string, string | number | boolean | null | undefined>;

function redactMessage(message: string): string {
  return message
    .replace(/https?:\/\/[^\s]+/gi, "[url-redacted]")
    .replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
    .slice(0, 500);
}

export function logCrmPush(
  level: "info" | "warn" | "error",
  event: string,
  meta?: CrmLogMeta,
): void {
  const safeMeta: Record<string, string | number | boolean> = {};
  if (meta) {
    for (const [key, value] of Object.entries(meta)) {
      if (value === undefined || value === null) continue;
      if (typeof value === "string") {
        safeMeta[key] = redactMessage(value);
      } else {
        safeMeta[key] = value;
      }
    }
  }

  const line = `[deal-analyzer-crm] ${event}`;
  if (level === "error") {
    console.error(line, safeMeta);
  } else if (level === "warn") {
    console.warn(line, safeMeta);
  } else {
    console.info(line, safeMeta);
  }
}
