export type SpendCategory = "dining" | "groceries" | "travel" | "other";

export type CardProduct = {
  id: string;
  name: string;
  /** Reward rate in percent per category. `other` is the fallback for unlisted categories. */
  rates: Partial<Record<SpendCategory, number>> & { other: number };
};

export type CardReward = {
  cardId: string;
  cardName: string;
  ratePercent: number;
  rewardCents: number;
};

export type OptimizerInput = {
  amount: number;
  category: SpendCategory;
  walletCardIds: string[];
};

export type OptimizerError = "INVALID_AMOUNT" | "EMPTY_WALLET" | "UNKNOWN_CARD" | "INVALID_CATEGORY";

export type OptimizerResult =
  | { ok: true; results: CardReward[]; best: CardReward[]; isTie: boolean }
  | { ok: false; error: OptimizerError };
