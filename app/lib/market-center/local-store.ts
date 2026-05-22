import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { MOCK_DAILY_MARKET_UPDATE } from "./mock-data";
import { normalizeDailyMarketUpdate } from "./normalize";
import type {
  DailyMarketUpdate,
  MarketCenterEdition,
  MarketCenterStoreSnapshot,
  MarketUpdateStatus,
} from "./types";

const STORE_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(STORE_DIR, "market-center.json");

function defaultPublishedEdition(): MarketCenterEdition {
  const now = new Date().toISOString();
  return {
    ...normalizeDailyMarketUpdate(MOCK_DAILY_MARKET_UPDATE),
    status: "published",
    savedAt: now,
  };
}

function wrapEdition(
  update: DailyMarketUpdate,
  status: MarketUpdateStatus,
): MarketCenterEdition {
  return {
    ...normalizeDailyMarketUpdate(update),
    status,
    savedAt: new Date().toISOString(),
  };
}

function normalizeEdition(
  edition: MarketCenterEdition | null,
): MarketCenterEdition | null {
  if (!edition) return null;
  return {
    ...normalizeDailyMarketUpdate(edition),
    status: edition.status,
    savedAt: edition.savedAt,
  };
}

function readStoreFile(): MarketCenterStoreSnapshot {
  try {
    const raw = readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as MarketCenterStoreSnapshot;
    return {
      draft: normalizeEdition(parsed.draft ?? null),
      published: normalizeEdition(parsed.published ?? null),
    };
  } catch {
    return { draft: null, published: null };
  }
}

function writeStoreFile(snapshot: MarketCenterStoreSnapshot): void {
  mkdirSync(STORE_DIR, { recursive: true });
  writeFileSync(STORE_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
}

/** Future: swap implementation for Supabase repository */
export function loadMarketCenterStore(): MarketCenterStoreSnapshot {
  const snapshot = readStoreFile();
  if (!snapshot.published) {
    const published = defaultPublishedEdition();
    writeStoreFile({ ...snapshot, published });
    return { draft: snapshot.draft, published };
  }
  return snapshot;
}

export function getPublishedEditionSync(): MarketCenterEdition | null {
  return loadMarketCenterStore().published;
}

export function getPublishedUpdateSync(): DailyMarketUpdate | null {
  const edition = getPublishedEditionSync();
  return edition ? normalizeDailyMarketUpdate(edition) : null;
}

export function saveMarketCenterDraft(update: DailyMarketUpdate): MarketCenterEdition {
  const snapshot = loadMarketCenterStore();
  const draft = wrapEdition(update, "draft");
  writeStoreFile({ ...snapshot, draft });
  return draft;
}

export function publishMarketCenterEdition(
  update: DailyMarketUpdate,
): MarketCenterEdition {
  const snapshot = loadMarketCenterStore();
  const published = wrapEdition(
    { ...update, publishedAt: update.publishedAt || new Date().toISOString() },
    "published",
  );
  writeStoreFile({ draft: snapshot.draft, published });
  return published;
}

export function publishMarketCenterDraft(): MarketCenterEdition | null {
  const snapshot = loadMarketCenterStore();
  if (!snapshot.draft) return null;
  const published = wrapEdition(snapshot.draft, "published");
  writeStoreFile({ draft: snapshot.draft, published });
  return published;
}
