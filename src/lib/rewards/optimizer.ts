import { CARD_CATALOG } from "./catalog";
import type { CardProduct, CardReward, OptimizerInput, OptimizerResult } from "./types";

export function optimizeRewards(
  input: OptimizerInput,
  catalog: CardProduct[] = CARD_CATALOG,
): OptimizerResult {
  if (!Number.isFinite(input.amount) || input.amount > 1_000_000) {
    return { ok: false, error: "INVALID_AMOUNT" };
  }
  const amountCents = Math.round(input.amount * 100);
  if (amountCents <= 0) {
    return { ok: false, error: "INVALID_AMOUNT" };
  }
  if (!["dining", "groceries", "travel", "other"].includes(input.category)) {
    return { ok: false, error: "INVALID_CATEGORY" };
  }
  if (input.walletCardIds.length === 0) {
    return { ok: false, error: "EMPTY_WALLET" };
  }
  if (input.walletCardIds.some((id) => !catalog.some((card) => card.id === id))) {
    return { ok: false, error: "UNKNOWN_CARD" };
  }

  const cards = catalog.filter((card) => input.walletCardIds.includes(card.id));

  const results: CardReward[] = cards.map((card) => {
    const ratePercent = card.rates[input.category] ?? card.rates.other;
    return {
      cardId: card.id,
      cardName: card.name,
      ratePercent,
      rewardCents: Math.round((amountCents * ratePercent) / 100),
    };
  });

  results.sort((a, b) => b.rewardCents - a.rewardCents || a.cardName.localeCompare(b.cardName));

  const best = results.filter((r) => r.rewardCents === results[0].rewardCents);
  return { ok: true, results, best, isTie: best.length > 1 };
}
