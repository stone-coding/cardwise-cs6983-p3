import { CARD_CATALOG } from "./catalog";
import {
  SPEND_CATEGORIES,
  type CardProduct,
  type CardReward,
  type OptimizerInput,
  type OptimizerResult,
  type SpendCategory,
} from "./types";

export const MAX_AMOUNT_DOLLARS = 1_000_000;

/** Converts dollars to whole cents, or returns null if the amount is outside (0, MAX_AMOUNT_DOLLARS]. */
export function toCents(amount: number): number | null {
  if (!Number.isFinite(amount) || amount > MAX_AMOUNT_DOLLARS) return null;
  const cents = Math.round(amount * 100);
  return cents > 0 ? cents : null;
}

export function rateFor(card: CardProduct, category: SpendCategory): number {
  return card.rates[category] ?? card.rates.other;
}

function isSpendCategory(value: string): value is SpendCategory {
  return (SPEND_CATEGORIES as readonly string[]).includes(value);
}

function rewardFor(card: CardProduct, category: SpendCategory, amountCents: number): CardReward {
  const ratePercent = rateFor(card, category);
  return {
    cardId: card.id,
    cardName: card.name,
    ratePercent,
    rewardCents: Math.round((amountCents * ratePercent) / 100),
  };
}

/** Highest reward first; ties broken by card name so output never depends on wallet order. */
function byRewardThenName(a: CardReward, b: CardReward): number {
  return b.rewardCents - a.rewardCents || a.cardName.localeCompare(b.cardName);
}

export function optimizeRewards(
  input: OptimizerInput,
  catalog: CardProduct[] = CARD_CATALOG,
): OptimizerResult {
  const amountCents = toCents(input.amount);
  if (amountCents === null) return { ok: false, error: "INVALID_AMOUNT" };
  if (!isSpendCategory(input.category)) return { ok: false, error: "INVALID_CATEGORY" };
  if (input.walletCardIds.length === 0) return { ok: false, error: "EMPTY_WALLET" };

  const catalogById = new Map(catalog.map((card) => [card.id, card]));
  const walletCards: CardProduct[] = [];
  for (const id of new Set(input.walletCardIds)) {
    const card = catalogById.get(id);
    if (!card) return { ok: false, error: "UNKNOWN_CARD" };
    walletCards.push(card);
  }

  const results = walletCards
    .map((card) => rewardFor(card, input.category, amountCents))
    .sort(byRewardThenName);
  const best = results.filter((r) => r.rewardCents === results[0].rewardCents);

  return { ok: true, results, best, isTie: best.length > 1 };
}
