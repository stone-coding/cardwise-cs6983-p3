import { toCents, toNonNegativeCents } from "@/lib/money";
import type { CppInput, CppResult, CppVerdict } from "./types";

export const MAX_POINTS = 10_000_000;
export const MAX_BASELINE_CPP = 100;

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

  const baseline = input.baselineCpp;
  const baselineHundredths = baseline === undefined ? null : Math.round(baseline * 100);
  if (
    baseline !== undefined &&
    (!Number.isFinite(baseline) || baseline > MAX_BASELINE_CPP || (baselineHundredths ?? 0) < 1)
  ) {
    return { ok: false, error: "INVALID_BASELINE" };
  }

  const netCashCents = cashCents - feesCents;
  const cppHundredths = Math.round((netCashCents * 100) / input.pointsRequired);
  const cpp = cppHundredths / 100;
  if (baselineHundredths === null) return { ok: true, netCashCents, cpp };

  return { ok: true, netCashCents, cpp, verdict: verdictFor(cppHundredths, baselineHundredths) };
}

/** Compares CPP to the baseline, both in integer hundredths of a cent, so no floats are compared. */
function verdictFor(cppHundredths: number, baselineHundredths: number): CppVerdict {
  if (cppHundredths > baselineHundredths) return "POINTS_BETTER";
  if (cppHundredths < baselineHundredths) return "CASH_BETTER";
  return "EQUAL";
}
