import { describe, expect, it } from "vitest";
import { parseAmount } from "@/lib/rewards/parse-amount";

describe("parseAmount (AC7)", () => {
  it.each([
    ["12", 12],
    ["12.5", 12.5],
    ["12.34", 12.34],
    ["  42.00 ", 42],
    ["0.99", 0.99],
  ])("parses %j as %d", (input, expected) => {
    expect(parseAmount(input)).toBe(expected);
  });

  it.each(["", "   ", "abc", "1e3", "-5", "+5", "12.345", "0x10", "1,000", "12.", ".5", "Infinity", "NaN"])(
    "rejects %j",
    (input) => {
      expect(parseAmount(input)).toBeNull();
    },
  );
});
