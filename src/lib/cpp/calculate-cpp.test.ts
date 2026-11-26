import { describe, expect, it } from "vitest";
import { calculateCpp } from "@/lib/cpp/calculate-cpp";

describe("calculateCpp — formula and rounding (cycle 1)", () => {
  it("1.1 computes CPP as (cash − fees) / points × 100", () => {
    expect(calculateCpp({ cashPrice: 500, taxesFees: 50, pointsRequired: 30000 })).toEqual({
      ok: true,
      netCashCents: 45000,
      cpp: 1.5,
    });
  });

  it("1.2 allows zero taxes/fees", () => {
    expect(calculateCpp({ cashPrice: 250, taxesFees: 0, pointsRequired: 25000 })).toEqual({
      ok: true,
      netCashCents: 25000,
      cpp: 1,
    });
  });

  it("1.3 rounds CPP down to 2 decimals (333.33 hundredths → 3.33)", () => {
    expect(calculateCpp({ cashPrice: 100, taxesFees: 0, pointsRequired: 3000 })).toEqual({
      ok: true,
      netCashCents: 10000,
      cpp: 3.33,
    });
  });

  it("1.4 rounds CPP up to 2 decimals (666.67 hundredths → 6.67)", () => {
    expect(calculateCpp({ cashPrice: 200, taxesFees: 0, pointsRequired: 3000 })).toEqual({
      ok: true,
      netCashCents: 20000,
      cpp: 6.67,
    });
  });

  it("1.5 rounds an exact half up (12.5 hundredths → 0.13)", () => {
    expect(calculateCpp({ cashPrice: 0.01, taxesFees: 0, pointsRequired: 8 })).toEqual({
      ok: true,
      netCashCents: 1,
      cpp: 0.13,
    });
  });

  it("1.6 subtracts fees in integer cents, not float dollars", () => {
    expect(calculateCpp({ cashPrice: 19.99, taxesFees: 0.99, pointsRequired: 1000 })).toEqual({
      ok: true,
      netCashCents: 1900,
      cpp: 1.9,
    });
  });

  it("1.7 rounds a CPP below 0.005 to 0", () => {
    expect(calculateCpp({ cashPrice: 1, taxesFees: 0, pointsRequired: 1000000 })).toEqual({
      ok: true,
      netCashCents: 100,
      cpp: 0,
    });
  });

  it("1.8 keeps maximum values as exact safe integers", () => {
    expect(calculateCpp({ cashPrice: 1000000, taxesFees: 0, pointsRequired: 1 })).toEqual({
      ok: true,
      netCashCents: 100000000,
      cpp: 100000000,
    });
  });
});

const VALID = { cashPrice: 500, taxesFees: 50, pointsRequired: 30000 };

describe("calculateCpp — input validation (cycle 2)", () => {
  it.each([
    ["0", 0],
    ["negative", -1],
    ["NaN", NaN],
    ["Infinity", Infinity],
    ["-Infinity", -Infinity],
    ["over the $1,000,000 cap", 1_000_000.01],
    ["0.004 (rounds to 0 cents)", 0.004],
    ["a non-numeric string", "100" as unknown as number],
  ])("2.1 rejects cashPrice = %s with INVALID_CASH_PRICE", (_label, cashPrice) => {
    expect(calculateCpp({ ...VALID, cashPrice })).toEqual({ ok: false, error: "INVALID_CASH_PRICE" });
  });

  it.each([
    ["negative", -0.01],
    ["NaN", NaN],
    ["Infinity", Infinity],
    ["over the $1,000,000 cap", 1_000_000.01],
    ["a non-numeric string", "5" as unknown as number],
  ])("2.2 rejects taxesFees = %s with INVALID_FEES", (_label, taxesFees) => {
    expect(calculateCpp({ ...VALID, taxesFees })).toEqual({ ok: false, error: "INVALID_FEES" });
  });

  it.each([
    ["0", 0],
    ["negative", -1],
    ["a fraction (1.5)", 1.5],
    ["NaN", NaN],
    ["Infinity", Infinity],
    ["over the 10,000,000 cap", 10_000_001],
    ["a non-numeric string", "100" as unknown as number],
  ])("2.3 rejects pointsRequired = %s with INVALID_POINTS", (_label, pointsRequired) => {
    expect(calculateCpp({ ...VALID, pointsRequired })).toEqual({ ok: false, error: "INVALID_POINTS" });
  });

  it("2.4 rejects fees equal to the cash price with FEES_EXCEED_CASH", () => {
    expect(calculateCpp({ cashPrice: 100, taxesFees: 100, pointsRequired: 1000 })).toEqual({
      ok: false,
      error: "FEES_EXCEED_CASH",
    });
  });

  it("2.5 rejects fees greater than the cash price with FEES_EXCEED_CASH", () => {
    expect(calculateCpp({ cashPrice: 100, taxesFees: 100.01, pointsRequired: 1000 })).toEqual({
      ok: false,
      error: "FEES_EXCEED_CASH",
    });
  });

  it("2.6 compares cash and fees in cents (99.999 rounds to 10000 cents = cash)", () => {
    expect(calculateCpp({ cashPrice: 100, taxesFees: 99.999, pointsRequired: 1000 })).toEqual({
      ok: false,
      error: "FEES_EXCEED_CASH",
    });
  });

  it("2.7 reports the cash price error first when several fields are invalid", () => {
    expect(calculateCpp({ cashPrice: 0, taxesFees: -1, pointsRequired: 0 })).toEqual({
      ok: false,
      error: "INVALID_CASH_PRICE",
    });
  });

  it("2.8 checks each field before comparing fees to cash", () => {
    expect(calculateCpp({ cashPrice: 100, taxesFees: 200, pointsRequired: 0 })).toEqual({
      ok: false,
      error: "INVALID_POINTS",
    });
  });

  it("2.9 accepts the 10,000,000 points maximum", () => {
    expect(calculateCpp({ cashPrice: 100000, taxesFees: 0, pointsRequired: 10_000_000 })).toEqual({
      ok: true,
      netCashCents: 10000000,
      cpp: 1,
    });
  });

  it("2.10 accepts a net cash value of 1 cent", () => {
    expect(calculateCpp({ cashPrice: 100.01, taxesFees: 100, pointsRequired: 1 })).toEqual({
      ok: true,
      netCashCents: 1,
      cpp: 1,
    });
  });

  it("2.11 accepts fees that round to 0 cents", () => {
    expect(calculateCpp({ cashPrice: 100, taxesFees: 0.004, pointsRequired: 10000 })).toEqual({
      ok: true,
      netCashCents: 10000,
      cpp: 1,
    });
  });
});
