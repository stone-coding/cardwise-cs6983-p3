# Issue #6 – my annotations (Togzhan)

## Explore
- Asked Claude to read only. It found that toCents rejects $0 fees,
  so we need a separate function for fees.

## Plan f0fefbd
- I changed the plan: verdict has 3 values (POINTS_BETTER / CASH_BETTER / EQUAL)
  instead of true/false; baseline must round to at least 0.01.
- Claude asked permission before git commit (settings.json rule) – I approved.

## Cycle 1
- RED (5807a3b): 8 new tests fail with "not implemented", 39 old tests pass,
  typecheck OK. I checked the failure is because the function is missing,
  not because the tests are wrong.

- GREEN (c7f9a97): Claude wrote the formula. All 47 tests pass.
  I checked that the test file was not changed.


## Cycle 2
- RED (03ee9e4): 25 validation tests fail (function accepts bad input),
  50 pass. Boundary tests 2.9–2.11 already pass – expected.

- GREEN (0eebb0d): validation added, 75/75 pass, tests unchanged.
- REFACTOR (496e341): moved money helpers to src/lib/money.ts.
  Same 75 tests green → behavior unchanged.

## Cycle 3
- RED (5bd659f): 17 baseline tests fail (function ignores baseline),
  3.1 and 3.13 already pass – expected. Claude put refactor-2 evidence
  in a separate commit (7fa4824) to keep RED clean – I agreed.

- GREEN (6ee27fa): baseline compared at 2 decimals, 94/94 pass,
  tests unchanged.
- REFACTOR (e5bf4c3): extracted verdictFor helper. Still 94 green,
  no test changes.

## Wrap-up
- Saved session with /export, committed logs and notes (6355825).
- Pushed the branch myself (Claude is not allowed to push) and opened a PR.
- Helped me most: a second Claude chat to explain terms while Claude Code
  worked, and one small step per prompt.