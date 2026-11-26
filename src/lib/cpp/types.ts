export type CppInput = {
  /** Cash price of the redemption, in dollars. */
  cashPrice: number;
  /** Unavoidable cash taxes/fees paid even when redeeming points, in dollars. */
  taxesFees: number;
  /** Points required for the redemption. */
  pointsRequired: number;
};

export type CppError = "INVALID_CASH_PRICE" | "INVALID_FEES" | "INVALID_POINTS" | "FEES_EXCEED_CASH";

export type CppResult =
  | {
      ok: true;
      /** Cash price minus taxes/fees, in integer cents. */
      netCashCents: number;
      /** Estimated cents per point, rounded to 2 decimals. */
      cpp: number;
    }
  | { ok: false; error: CppError };
