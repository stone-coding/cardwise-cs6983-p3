# Plan: Issue #6, `calculateCpp` (Travel Points / CPP Calculator)

- **Date:** 2026-11-25
- **Branch:** `feat/6-cpp-calculator`
- **Status:** Approved by the issue owner (Togzhan Usseiin), with one change: `baselineCpp` must round to at least 0.01. Test 3.12 reflects that change.
- **Rubric link:** TDD feature 3 (see `docs/project3/RUBRIC_TRACKER.md` and `docs/project3/EVIDENCE_INDEX.md`).

## Decisions

- `calculateCpp` takes numbers in dollars. All arithmetic happens in integer cents.
- `cpp = Math.round(netCents * 100 / points) / 100`, where `netCents = cashCents - feesCents`.
- `taxesFees` may be 0, so it needs a zero-allowing variant of `toCents`. If fees ≥ cash (compared in cents), the result is `FEES_EXCEED_CASH`.
- `pointsRequired` must be a positive integer ≤ 10,000,000.
- `baselineCpp` is optional. It must be finite and ≤ 100, and it must round to at least 0.01 (`Math.round(baselineCpp * 100) >= 1`). Otherwise the result is `INVALID_BASELINE`.
- `verdict` is `"POINTS_BETTER" | "CASH_BETTER" | "EQUAL"`. `EQUAL` means the two values match at 2 decimals. The `verdict` key is present only when a baseline is given.
- `toCents` is imported from `optimizer.ts` for now. The money helpers move to `src/lib/money.ts` in a REFACTOR commit.
- Strict TDD in 3 cycles: (1) formula and rounding, (2) validation, (3) baseline verdict.

## Files and shapes

| File | Purpose |
|---|---|
| `src/lib/cpp/types.ts` | `CppInput`, `CppError`, `CppVerdict`, `CppResult` |
| `src/lib/cpp/calculate-cpp.ts` | `calculateCpp`, `MAX_POINTS = 10_000_000` |
| `src/lib/cpp/calculate-cpp.test.ts` | All tests below |
| `src/lib/money.ts` | Created by the cycle 2 REFACTOR commit |

- `CppInput = { cashPrice: number; taxesFees: number; pointsRequired: number; baselineCpp?: number }`
- `CppError = "INVALID_CASH_PRICE" | "INVALID_FEES" | "INVALID_POINTS" | "FEES_EXCEED_CASH" | "INVALID_BASELINE"`
- `CppVerdict = "POINTS_BETTER" | "CASH_BETTER" | "EQUAL"`
- `CppResult = { ok: true; netCashCents: number; cpp: number; verdict?: CppVerdict } | { ok: false; error: CppError }`

**Implementation note:** `Math.round(netCents * 100 / points)` is already the CPP in integer hundredths. Keep that integer, derive `cpp` by dividing it by 100, and compare it in cycle 3 against `Math.round(baselineCpp * 100)`. The verdict never compares floats.

**Keeping RED commits typecheck-clean:** CLAUDE.md requires `npm run typecheck` before every commit. Each RED commit may therefore add or extend `types.ts`, and RED 1 also adds a stub `calculateCpp` that throws `"not implemented"`. Tests then fail on assertions, not on "module not found". Types and a throwing stub are not behaviour. Capture the failing `npm test` output for each RED commit (DoD §2).

---

## Cycle 1: formula and rounding (valid inputs only)

| # | cashPrice | taxesFees | points | Expected `netCashCents` | Expected `cpp` | What it shows |
|---|---|---|---|---|---|---|
| 1.1 | 500 | 50 | 30000 | 45000 | 1.5 | Basic formula |
| 1.2 | 250 | 0 | 25000 | 25000 | 1 | Fees of 0 are allowed |
| 1.3 | 100 | 0 | 3000 | 10000 | 3.33 | Rounds down (333.33 → 333) |
| 1.4 | 200 | 0 | 3000 | 20000 | 6.67 | Rounds up (666.67 → 667) |
| 1.5 | 0.01 | 0 | 8 | 1 | 0.13 | Exact .5 rounds half up (12.5 → 13) |
| 1.6 | 19.99 | 0.99 | 1000 | 1900 | 1.9 | Subtracts in cents, not float dollars |
| 1.7 | 1 | 0 | 1000000 | 100 | 0 | CPP below 0.005 rounds to 0 |
| 1.8 | 1000000 | 0 | 1 | 100000000 | 100000000 | Max values stay safe integers |

Assert with `toEqual({ ok: true, netCashCents, cpp })`.

**GREEN:** convert inline with `Math.round(x * 100)`, subtract, apply the rounding formula. No validation yet.

Commits:
- `test(cpp): add calculateCpp formula and rounding tests (RED)`
- `feat(cpp): compute CPP from cash price, fees, and points in integer cents (GREEN)`
- No REFACTOR commit in this cycle unless a real cleanup comes up.

---

## Cycle 2: validation

Each case expects `{ ok: false, error }`. Unless stated, the other inputs are valid (cash 500, fees 50, points 30000).

| # | Input under test | Expected |
|---|---|---|
| 2.1 | cashPrice = 0, -1, NaN, Infinity, -Infinity, 1_000_000.01, 0.004 (rounds to 0¢), `"100" as unknown as number` | `INVALID_CASH_PRICE` |
| 2.2 | taxesFees = -0.01, NaN, Infinity, 1_000_000.01, `"5" as unknown as number` | `INVALID_FEES` |
| 2.3 | points = 0, -1, 1.5, NaN, Infinity, 10_000_001, `"100" as unknown as number` | `INVALID_POINTS` |
| 2.4 | cash 100, fees 100, points 1000 | `FEES_EXCEED_CASH` (equal) |
| 2.5 | cash 100, fees 100.01, points 1000 | `FEES_EXCEED_CASH` (greater) |
| 2.6 | cash 100, fees 99.999, points 1000 | `FEES_EXCEED_CASH` (both round to 10000¢) |
| 2.7 | cash 0, fees -1, points 0 | `INVALID_CASH_PRICE` (precedence: cash → fees → points) |
| 2.8 | cash 100, fees 200, points 0 | `INVALID_POINTS` (field checks run before the cross-field check) |

Use `it.each` for the lists in 2.1–2.3.

Boundary cases that must succeed:

| # | Input | Expected |
|---|---|---|
| 2.9 | 100000, 0, 10_000_000 points | ok, netCashCents 10000000, cpp 1 |
| 2.10 | 100.01, 100, 1 | ok, netCashCents 1, cpp 1 (net of 1¢ is allowed) |
| 2.11 | 100, 0.004, 10000 | ok, netCashCents 10000, cpp 1 (fees round to 0¢, which is allowed) |

Cycle 1 cases 1.5 (cash $0.01) and 1.8 (cash $1M, 1 point) also cover the lower and upper bounds.

**GREEN:**
- Import `toCents` and `MAX_AMOUNT_DOLLARS` from `@/lib/rewards/optimizer`.
- Add a module-private `toNonNegativeCents`: same as `toCents`, but it allows 0.
- Check points with `Number.isInteger(points) && points > 0 && points <= MAX_POINTS`.
- Then check `feesCents >= cashCents`.

**REFACTOR:**
- Create `src/lib/money.ts` and move `MAX_AMOUNT_DOLLARS`, `toCents` and `toNonNegativeCents` into it.
- Point `optimizer.ts` and `calculate-cpp.ts` at `@/lib/money`.
- No re-export from `optimizer.ts` is needed, because nothing else imports `toCents`.
- `rateFor` stays in `optimizer.ts`.
- All tests stay green, and no test changes.

Commits:
- `test(cpp): add input validation and fees-exceed-cash tests (RED)`
- `feat(cpp): validate cash, fees, points bounds and reject fees >= cash (GREEN)`
- `refactor(money): move toCents, toNonNegativeCents, and MAX_AMOUNT_DOLLARS to src/lib/money.ts`

---

## Cycle 3: baseline verdict

The base input is 500 / 50 / 30000, which gives cpp 1.5, unless stated otherwise.

| # | Input | Expected |
|---|---|---|
| 3.1 | No baselineCpp | ok, and `not.toHaveProperty("verdict")` |
| 3.2 | baseline 1.2 | `POINTS_BETTER` |
| 3.3 | baseline 2 | `CASH_BETTER` |
| 3.4 | baseline 1.5 | `EQUAL` |
| 3.5 | Base 100/0/3000 (cpp 3.33), baseline 3.334 | `EQUAL` (333 vs 333) |
| 3.6 | Same base, baseline 3.326 | `EQUAL` (333 vs 333) |
| 3.7 | Same base, baseline 3.336 | `CASH_BETTER` (333 vs 334) |
| 3.8 | Same base, baseline 3.324 | `POINTS_BETTER` (333 vs 332) |
| 3.9 | baseline 100 | `CASH_BETTER` (upper bound is valid) |
| 3.10 | baseline 0.01 | `POINTS_BETTER` (lower bound is valid) |
| 3.11 | Base 1/0/1000000 (cpp 0), baseline 0.01 | `CASH_BETTER` |
| 3.12 | baseline = 0, -1, NaN, Infinity, 100.01, **0.004** (rounds to 0.00), `"1" as unknown as number` | `INVALID_BASELINE` |
| 3.13 | points 0 and baseline -1 | `INVALID_POINTS` (baseline is checked last) |

Avoid baselines like 3.335. In floating point, `3.335 * 100` is 333.4999…, which makes a confusing test.

**GREEN:**
- Validate `baselineCpp` only when it is not `undefined`.
- Accept it only if it is finite, `Math.round(baselineCpp * 100) >= 1`, and `baselineCpp <= 100`.
- Compare the integer hundredths.
- Leave the `verdict` key out entirely when there is no baseline.

**REFACTOR:** extract `verdictFor(cppHundredths, baselineHundredths): CppVerdict`. All tests stay green, and no test changes.

Commits:
- `test(cpp): add baseline CPP verdict and INVALID_BASELINE tests (RED)`
- `feat(cpp): compare CPP to optional baseline at 2-decimal precision (GREEN)`
- `refactor(cpp): extract verdictFor comparison helper`

---

## Out of scope for this plan (separate UI commits after cycle 3)

- Mapping strings to numbers on the UI side: reuse `parseAmount` for cash and fees, and add a `/^\d+$/` points parser.
- Mapping error codes to messages, the page itself, and estimate caveats (for example, "assumes fees are unavoidable cash costs").
- Playwright E2E.

Merge the PR **without squashing** so the TDD commits stay visible (DoD §2).
