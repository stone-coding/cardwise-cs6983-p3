import { CARD_CATALOG } from "./catalog";
import type { CardProduct, CardReward, OptimizerInput, OptimizerResult } from "./types";

export function optimizeRewards(
  input: OptimizerInput,
  catalog: CardProduct[] = CARD_CATALOG,
): OptimizerResult {
  const amountCents = Math.round(input.amount * 100);
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
