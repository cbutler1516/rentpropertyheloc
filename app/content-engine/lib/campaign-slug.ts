const RESERVED_SLUGS = new Set([
  "preview",
  "api",
  "admin",
  "_next",
  "campaigns",
  "content-engine",
  "deal-analyzer",
]);

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugifyCampaignTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function validateCampaignSlug(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  if (normalized.length < 3) {
    return "Slug must be at least 3 characters.";
  }
  if (normalized.length > 80) {
    return "Slug must be 80 characters or fewer.";
  }
  if (!SLUG_PATTERN.test(normalized)) {
    return "Use lowercase letters, numbers, and hyphens only.";
  }
  if (RESERVED_SLUGS.has(normalized)) {
    return "This slug is reserved. Choose another.";
  }
  return null;
}

export function normalizeCampaignSlug(slug: string): string {
  return slug.trim().toLowerCase();
}
