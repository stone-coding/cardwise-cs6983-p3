import { describe, expect, it } from "vitest";
import { optimizeRewards } from "@/lib/rewards/optimizer";

const ALL_CARDS = ["cw-dining-plus", "cw-grocery-saver", "cw-flat-two"];

function okResult(input: Parameters<typeof optimizeRewards>[0]) {
  const result = optimizeRewards(input);
  if (!result.ok) throw new Error(`expected ok result, got ${result.error}`);
  return result;
}

describe("optimizeRewards — reward calculation (AC1)", () => {
  it("computes each card's reward in integer cents from the category rate", () => {
    const result = okResult({ amount: 100, category: "dining", walletCardIds: ALL_CARDS });
    const byId = Object.fromEntries(result.results.map((r) => [r.cardId, r.rewardCents]));

    expect(byId).toEqual({
      "cw-dining-plus": 400,
      "cw-grocery-saver": 200,
      "cw-flat-two": 200,
    });
  });

  it("reports the rate used for each card", () => {
    const result = okResult({ amount: 100, category: "groceries", walletCardIds: ["cw-grocery-saver"] });

    expect(result.results[0]).toMatchObject({
      cardId: "cw-grocery-saver",
      cardName: "Grocery Saver",
      ratePercent: 3,
      rewardCents: 300,
    });
  });

  it("handles cents in the amount without floating-point drift", () => {
    const result = okResult({ amount: 12.34, category: "dining", walletCardIds: ["cw-dining-plus"] });
    // 1234 cents * 4% = 49.36 cents -> 49
    expect(result.results[0].rewardCents).toBe(49);
  });

  it("rounds half a cent up", () => {
    const result = okResult({ amount: 0.5, category: "groceries", walletCardIds: ["cw-grocery-saver"] });
    // 50 cents * 3% = 1.5 cents -> 2
    expect(result.results[0].rewardCents).toBe(2);
  });
});

describe("optimizeRewards — ranking and recommendation (AC2)", () => {
  it("recommends the card with the highest reward", () => {
    const result = okResult({ amount: 100, category: "groceries", walletCardIds: ALL_CARDS });

    expect(result.best.map((c) => c.cardId)).toEqual(["cw-grocery-saver"]);
    expect(result.isTie).toBe(false);
  });

  it("ranks cards by reward descending, then by card name", () => {
    const result = okResult({ amount: 100, category: "dining", walletCardIds: ALL_CARDS });

    expect(result.results.map((r) => r.cardId)).toEqual([
      "cw-dining-plus", // 400
      "cw-flat-two", // 200, "Flat Two" < "Grocery Saver"
      "cw-grocery-saver", // 200
    ]);
  });

  it("produces the same ranking regardless of wallet order", () => {
    const forward = okResult({ amount: 100, category: "groceries", walletCardIds: ALL_CARDS });
    const reversed = okResult({ amount: 100, category: "groceries", walletCardIds: [...ALL_CARDS].reverse() });

    expect(reversed.results).toEqual(forward.results);
  });

  it("only considers cards in the wallet", () => {
    const result = okResult({ amount: 100, category: "dining", walletCardIds: ["cw-flat-two"] });

    expect(result.results).toHaveLength(1);
    expect(result.best[0].cardId).toBe("cw-flat-two");
  });
});

describe("optimizeRewards — category fallback (AC3)", () => {
  it("uses the card's 'other' rate when the category has no explicit rate", () => {
    const result = okResult({ amount: 50, category: "travel", walletCardIds: ALL_CARDS });
    const byId = Object.fromEntries(result.results.map((r) => [r.cardId, r.ratePercent]));

    expect(byId).toEqual({ "cw-dining-plus": 1, "cw-grocery-saver": 1, "cw-flat-two": 2 });
    expect(result.best[0]).toMatchObject({ cardId: "cw-flat-two", rewardCents: 100 });
  });
});
