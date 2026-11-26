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
