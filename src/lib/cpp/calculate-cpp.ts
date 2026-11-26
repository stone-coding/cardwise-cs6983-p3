import { toCents, toNonNegativeCents } from "@/lib/money";
import type { CppInput, CppResult } from "./types";

export const MAX_POINTS = 10_000_000;

function isValidPoints(points: number): boolean {
  return Number.isInteger(points) && points > 0 && points <= MAX_POINTS;
}

export function calculateCpp(input: CppInput): CppResult {
  const cashCents = toCents(input.cashPrice);
  if (cashCents === null) return { ok: false, error: "INVALID_CASH_PRICE" };
  const feesCents = toNonNegativeCents(input.taxesFees);
  if (feesCents === null) return { ok: false, error: "INVALID_FEES" };
  if (!isValidPoints(input.pointsRequired)) return { ok: false, error: "INVALID_POINTS" };
  if (feesCents >= cashCents) return { ok: false, error: "FEES_EXCEED_CASH" };

  const netCashCents = cashCents - feesCents;
  const cppHundredths = Math.round((netCashCents * 100) / input.pointsRequired);
  return { ok: true, netCashCents, cpp: cppHundredths / 100 };
}
