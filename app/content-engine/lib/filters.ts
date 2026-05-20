import type { ContentPackage, DateFilterPreset, PackageFilters } from "./types";

function matchesDatePreset(createdAt: string, preset: DateFilterPreset): boolean {
  if (preset === "all") return true;
  const days = preset === "7d" ? 7 : preset === "30d" ? 30 : 90;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return new Date(createdAt).getTime() >= cutoff;
}

export function filterPackages(
  packages: ContentPackage[],
  filters: PackageFilters,
): ContentPackage[] {
  const query = filters.search.trim().toLowerCase();

  return packages.filter((pkg) => {
    if (filters.audience !== "all" && pkg.audience !== filters.audience) {
      return false;
    }
    if (filters.topic !== "all" && pkg.topic !== filters.topic) {
      return false;
    }
    if (!matchesDatePreset(pkg.createdAt, filters.datePreset)) {
      return false;
    }
    if (!query) return true;

    const haystack = [
      pkg.title,
      pkg.sourceInput,
      pkg.topic,
      pkg.tone,
      pkg.audience,
      ...pkg.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function uniqueTopics(packages: ContentPackage[]): string[] {
  return [...new Set(packages.map((pkg) => pkg.topic))].sort();
}
