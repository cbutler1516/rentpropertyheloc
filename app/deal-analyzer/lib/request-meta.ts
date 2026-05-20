export function getClientIpFromHeaders(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return null;
}

export function getUserAgentFromHeaders(headers: Headers): string | null {
  const ua = headers.get("user-agent")?.trim();
  return ua || null;
}
