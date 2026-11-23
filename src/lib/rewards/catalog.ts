import type { CardProduct } from "./types";

/**
 * Illustrative catalog for HW4. Card names are fictional and rates are simplified
 * (no caps, activation, or merchant-code nuances). As of 2026-11-22.
 */
export const CARD_CATALOG: CardProduct[] = [
  { id: "cw-dining-plus", name: "Dining Plus", rates: { dining: 4, other: 1 } },
  { id: "cw-grocery-saver", name: "Grocery Saver", rates: { groceries: 3, dining: 2, other: 1 } },
  { id: "cw-flat-two", name: "Flat Two", rates: { other: 2 } },
];
