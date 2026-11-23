# Plan — HW4 Rewards Optimizer (CardWise)

## Context
HW4 requires one real P3 feature built through Explore → Plan → Implement → Commit with strict TDD (red/green/refactor commits). The chosen feature is the **Rewards Optimizer** (MVP module 1): the user enters an amount, picks a category, and chooses wallet cards, then sees the estimated reward per card and the best card. Nothing else is in scope (no auth, DB, or other modules).

Explore findings (commit `7264456`):
- `src/` contains only `app/layout.tsx` and `app/page.tsx` (placeholder). There is no reward code or tests, so there is nothing to reuse.
- `vitest.config.ts` uses the node env, includes `src/**/*.test.ts`, and sets the `@` → `src` alias.
- `docs/MVP_SCOPE.md:25` requires that 3 wallet cards rank **deterministically**. `docs/IMPLEMENTATION_PLAN.md:13` names a "extract shared rule helper" refactor.
- CLAUDE.md conventions: integer cents, result objects (not exceptions), deterministic sort, and estimate labels.

## Acceptance criteria
- AC1: Reward per card = amount × category rate, in exact integer cents (rounded half-up).
- AC2: Results are sorted by reward desc, then card name asc. `best` = top card(s).
- AC3: A category the card has no explicit rate for falls back to its `other` rate.
- AC4: Amount ≤ 0, NaN, Infinity, or > $1,000,000 → `{ ok:false, error:"INVALID_AMOUNT" }`.
- AC5: Empty wallet → `EMPTY_WALLET`. Unknown card ID → `UNKNOWN_CARD`. Unknown category → `INVALID_CATEGORY`.
- AC6: A tie for the top reward → every tied card is in `best` and `isTie: true`. Duplicate wallet IDs are counted once.
- AC7: `parseAmount(string)` accepts plain decimals only (`"12"`, `"12.5"`, `"12.34"`, whitespace trimmed). It rejects `""`, `"abc"`, `"1e3"`, `"-5"`, `"12.345"`, and `"0x10"` → `null`.
- AC8: The UI has an amount input, a category select, and wallet checkboxes, and shows the per-card table, a recommendation (or tie message), error messages, and an "estimates only" caveat.

## Files
- `src/lib/rewards/types.ts`: `SpendCategory`, `CardProduct`, `CardReward`, `OptimizerResult`
- `src/lib/rewards/catalog.ts`: 3 fictional cards, for example `cw-dining-plus` (dining 4 / other 1), `cw-grocery-saver` (groceries 3 / dining 2 / other 1), `cw-flat-two` (2 everywhere). The groceries-saver and flat-two cards tie on dining.
- `src/lib/rewards/optimizer.ts`: `optimizeRewards({amount, category, walletCardIds}, catalog = CARD_CATALOG)`
- `src/lib/rewards/parse-amount.ts`: `parseAmount`
- `src/lib/rewards/*.test.ts`: co-located tests
- `src/app/page.tsx` + `src/app/rewards-optimizer.tsx` (`"use client"`): UI

## TDD sequence (one commit per step)
1. RED cycle 1: `test(rewards): add failing tests for reward calculation and ranking` (AC1–3). Add a stub-free import so the run fails. Capture the output.
2. GREEN cycle 1: `feat(rewards): implement minimum reward calculator` (types, catalog, optimizer).
3. RED cycle 2: `test(rewards): add failing tests for invalid input, empty wallet, and ties` (AC4–7).
4. GREEN cycle 2: `feat(rewards): handle validation, empty wallet, ties, and amount parsing`.
5. REFACTOR: `refactor(rewards): extract rate lookup and ranking helpers`. No behavior change; tests stay green.
6. `feat(ui): add Rewards Optimizer page` (AC8). Verify by build plus a dev-server check.
7. `docs(hw4): add session log and submission checklist`.

Save test output for each RED and GREEN step to `docs/hw4/evidence/test-runs/*.txt`.

## Verification
- `npm test` (all green after steps 2, 4, 5), `npm run typecheck`, `npm run build`, and `npm audit` (0 vulnerabilities).
- `git log --oneline` shows test → feat → test → feat → refactor ordering.
- Manual UI check with `npm run dev`: valid input, empty wallet, invalid amount, dining tie.
