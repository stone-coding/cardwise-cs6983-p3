# Issue #6 – my annotations (Togzhan)

## Explore
- Asked Claude to read only. It found that toCents rejects $0 fees,
  so we need a separate function for fees.

## Plan
- I changed the plan: verdict has 3 values (POINTS_BETTER / CASH_BETTER / EQUAL)
  instead of true/false; baseline must round to at least 0.01.
- Claude asked permission before git commit (settings.json rule) – I approved.

## Cycle 1
- RED (5807a3b): 8 new tests fail with "not implemented", 39 old tests pass,
  typecheck OK. I checked the failure is because the function is missing,
  not because the tests are wrong.
- GREEN (hash): ...