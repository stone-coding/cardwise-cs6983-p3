export const MAX_AMOUNT_DOLLARS = 1_000_000;

/** Converts dollars to whole cents, or returns null if the amount is outside (0, MAX_AMOUNT_DOLLARS]. */
export function toCents(amount: number): number | null {
  if (!Number.isFinite(amount) || amount > MAX_AMOUNT_DOLLARS) return null;
  const cents = Math.round(amount * 100);
  return cents > 0 ? cents : null;
}

/** Like toCents, but allows 0: returns whole cents for amounts in [0, MAX_AMOUNT_DOLLARS], else null. */
export function toNonNegativeCents(amount: number): number | null {
  if (!Number.isFinite(amount) || amount < 0 || amount > MAX_AMOUNT_DOLLARS) return null;
  return Math.round(amount * 100);
}
