/** Parses a user-typed dollar amount. Accepts only plain decimals with up to 2 fraction digits. */
export function parseAmount(input: string): number | null {
  const trimmed = input.trim();
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) return null;
  return Number(trimmed);
}
