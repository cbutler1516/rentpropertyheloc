import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("23456789abcdefghjkmnpqrstuvwxyz", 12);

export function generateReportSlug(): string {
  return `pb-${nanoid()}`;
}
