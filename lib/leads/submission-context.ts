export type LeadSubmissionContext = {
  ipAddress?: string | null;
  userAgent?: string | null;
  landingPage?: string | null;
  referrer?: string | null;
};

export function extractLeadSubmissionContext(
  request: Request,
  sourceUrl?: string,
): LeadSubmissionContext {
  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress =
    forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;
  const userAgent = request.headers.get("user-agent") || null;
  const referrer = request.headers.get("referer") || null;
  const landingPage = sourceUrl?.trim() || referrer || null;

  return {
    ipAddress,
    userAgent,
    landingPage,
    referrer,
  };
}
