export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidPhone(value: string): boolean {
  const digits = normalizePhoneDigits(value);
  return digits.length >= 10 && digits.length <= 15;
}

/** US display format: (206) 487-1728 */
export function formatPhoneDisplay(value: string): string {
  let digits = normalizePhoneDigits(value);
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  const us = digits.slice(0, 10);
  const extra = digits.slice(10);

  if (!us && !extra) return "";

  let formatted = "";
  if (us.length <= 3) {
    formatted = us.length ? `(${us}` : "";
  } else if (us.length <= 6) {
    formatted = `(${us.slice(0, 3)}) ${us.slice(3)}`;
  } else {
    formatted = `(${us.slice(0, 3)}) ${us.slice(3, 6)}-${us.slice(6)}`;
  }

  return extra ? `${formatted}${formatted ? " " : ""}${extra}` : formatted;
}

/** Digits only for API, HubSpot, and validation (10–15 digits) */
export function normalizePhoneForStorage(value: string): string {
  let digits = normalizePhoneDigits(value);
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  return digits;
}

export function parsePhoneInput(raw: string, maxDigits = 15): string {
  return normalizePhoneDigits(raw).slice(0, maxDigits);
}
