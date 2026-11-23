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

describe("optimizeRewards — invalid amounts (AC4)", () => {
  it.each([
    ["zero", 0],
    ["negative", -25],
    ["NaN", Number.NaN],
    ["Infinity", Number.POSITIVE_INFINITY],
    ["above the $1,000,000 cap", 1_000_000.01],
    ["less than half a cent", 0.004],
  ])("rejects an amount that is %s", (_label, amount) => {
    expect(optimizeRewards({ amount, category: "dining", walletCardIds: ALL_CARDS })).toEqual({
      ok: false,
      error: "INVALID_AMOUNT",
    });
  });

  it("accepts exactly the $1,000,000 cap", () => {
    const result = okResult({ amount: 1_000_000, category: "other", walletCardIds: ["cw-flat-two"] });
    expect(result.best[0].rewardCents).toBe(2_000_000);
  });
});

describe("optimizeRewards — wallet and category validation (AC5)", () => {
  it("rejects an empty wallet", () => {
    expect(optimizeRewards({ amount: 100, category: "dining", walletCardIds: [] })).toEqual({
      ok: false,
      error: "EMPTY_WALLET",
    });
  });

  it("rejects a wallet containing a card that is not in the catalog", () => {
    expect(
      optimizeRewards({ amount: 100, category: "dining", walletCardIds: ["cw-flat-two", "not-a-card"] }),
    ).toEqual({ ok: false, error: "UNKNOWN_CARD" });
  });

  it("rejects a category outside the allowlist", () => {
    const input = { amount: 100, category: "fuel", walletCardIds: ALL_CARDS } as unknown as Parameters<
      typeof optimizeRewards
    >[0];
    expect(optimizeRewards(input)).toEqual({ ok: false, error: "INVALID_CATEGORY" });
  });
});

describe("optimizeRewards — ties and duplicates (AC6)", () => {
  it("reports every card tied for the top reward", () => {
    const result = okResult({
      amount: 100,
      category: "dining",
      walletCardIds: ["cw-grocery-saver", "cw-flat-two"],
    });

    expect(result.isTie).toBe(true);
    expect(result.best.map((c) => c.cardId)).toEqual(["cw-flat-two", "cw-grocery-saver"]);
  });

  it("counts a card listed twice in the wallet only once", () => {
    const result = okResult({
      amount: 100,
      category: "dining",
      walletCardIds: ["cw-flat-two", "cw-flat-two"],
    });

    expect(result.results).toHaveLength(1);
    expect(result.isTie).toBe(false);
  });
});
