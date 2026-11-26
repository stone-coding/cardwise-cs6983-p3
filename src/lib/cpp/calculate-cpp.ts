import type { CppInput, CppResult } from "./types";

export function calculateCpp(input: CppInput): CppResult {
  const netCashCents = Math.round(input.cashPrice * 100) - Math.round(input.taxesFees * 100);
  const cppHundredths = Math.round((netCashCents * 100) / input.pointsRequired);
  return { ok: true, netCashCents, cpp: cppHundredths / 100 };
}
