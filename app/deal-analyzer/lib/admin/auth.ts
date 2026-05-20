import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "lp_da_admin";

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_DEAL_ANALYZER_PASSWORD?.trim());
}

export function getAdminSessionToken(): string {
  const password = process.env.ADMIN_DEAL_ANALYZER_PASSWORD?.trim();
  if (!password) return "";
  return createHash("sha256").update(`lp-da-admin-v5:${password}`).digest("hex");
}

export function verifyAdminPassword(candidate: string): boolean {
  const password = process.env.ADMIN_DEAL_ANALYZER_PASSWORD?.trim();
  if (!password || !candidate) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(candidate);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!isAdminPasswordConfigured()) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const expected = getAdminSessionToken();
  if (!token || !expected) return false;

  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function setAdminSessionCookie(): Promise<void> {
  const token = getAdminSessionToken();
  if (!token) return;

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
