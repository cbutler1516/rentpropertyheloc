import { normalizeLegacyPackage } from "./mappers";
import type { ContentPackage } from "./types";

const STORAGE_KEY = "tlp-content-engine-packages";
const MAX_PACKAGES = 40;

export function loadLocalPackages(): ContentPackage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeLegacyPackage)
      .filter((pkg): pkg is ContentPackage => Boolean(pkg));
  } catch {
    return [];
  }
}

export function saveLocalPackages(packages: ContentPackage[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(packages.slice(0, MAX_PACKAGES)),
  );
}

export function upsertLocalPackage(
  packages: ContentPackage[],
  next: ContentPackage,
): ContentPackage[] {
  const filtered = packages.filter((pkg) => pkg.id !== next.id);
  return [next, ...filtered].slice(0, MAX_PACKAGES);
}

export function deleteLocalPackage(
  packages: ContentPackage[],
  id: string,
): ContentPackage[] {
  return packages.filter((pkg) => pkg.id !== id);
}
