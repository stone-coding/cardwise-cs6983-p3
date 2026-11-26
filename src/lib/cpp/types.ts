export type CppInput = {
  /** Cash price of the redemption, in dollars. */
  cashPrice: number;
  /** Unavoidable cash taxes/fees paid even when redeeming points, in dollars. */
  taxesFees: number;
  /** Points required for the redemption. */
  pointsRequired: number;
  /** Optional user-entered valuation to compare against, in cents per point. */
  baselineCpp?: number;
};

export type CppError =
  | "INVALID_CASH_PRICE"
  | "INVALID_FEES"
  | "INVALID_POINTS"
  | "FEES_EXCEED_CASH"
  | "INVALID_BASELINE";

/** How the redemption compares to the baseline, at 2-decimal precision. */
export type CppVerdict = "POINTS_BETTER" | "CASH_BETTER" | "EQUAL";

export type CppResult =
  | {
      ok: true;
      /** Cash price minus taxes/fees, in integer cents. */
      netCashCents: number;
      /** Estimated cents per point, rounded to 2 decimals. */
      cpp: number;
      /** Present only when a baselineCpp was given. */
      verdict?: CppVerdict;
    }
  | { ok: false; error: CppError };
