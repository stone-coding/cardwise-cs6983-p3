> **Superseded (2026-11-25):** this was the original draft. The current plan and rubric tracking are in [`docs/project3/MASTER_PLAN.md`](project3/MASTER_PLAN.md) and [`docs/project3/RUBRIC_TRACKER.md`](project3/RUBRIC_TRACKER.md). It is kept unchanged below for history.

# Implementation plan — draft for Claude Code to validate against original rubrics

## Phase 0 — immediately
- Post proposal in `#projects`; request approval and partner reassignment.
- Use the complete Canvas descriptions supplied in `docs/assignments/` as the source of truth.
- Build requirement traceability matrix, including evidence artifacts and exact due dates.
- Initialize repo, decide database/auth architecture, create issues and a small Sprint 1 board.

## Phase 1 — HW4 FIRST (due Nov 26)
1. Configure Claude Code and capture `/init` and subsequent `CLAUDE.md` edits; include `@docs/...` import and safe permissions.
2. Create pure TypeScript reward calculation function with explicit simple rates and assumptions.
3. Use Explore → Plan → Implement → Commit; capture genuine tool/session evidence.
4. Red commit: failing Vitest tests for best-card reward calculation; Green commit: minimal implementation; Refactor commit: extract shared rule helper; retain logs and screenshots.
5. Repeat TDD cycles if time; add input validation and negative/edge tests.
6. Reflection (1–2 pages) and verify every HW4 rubric item before submission.

## Phase 2 — HW5 (due Dec 7)
1. Add `/add-reward-rule` skill; test on two distinct real rule tasks; capture v1 and v2.
2. Add second skill `/review-calculator` (also counts toward P3).
3. Configure Playwright MCP; run one actual end-to-end UI task, document reproducible setup.
4. Write retrospective and archive evidence.

## Phase 3 — Project 3 (due Dec 16)
- Finish five minimal modules; User/Admin RBAC; simple catalog and wallet.
- TDD for 3+ distinct features; 70%+ coverage and Playwright E2E.
- Configure 2+ hooks, subagent or alternate required option, worktrees, 2+ real PRs and reviews.
- CI/CD stages and security gates, deployment, README/architecture, blog, demo, individual reflections, showcase.

## Shared data model — tentative
- User (id, email, password/session provider reference, role)
- CardProduct (id, name, issuer, annualFee, rewardRules JSON, benefitSummary, asOfDate)
- WalletCard (id, userId, cardProductId)
- BonusTracker (id, userId, cardProductId, targetSpend, spent, deadline, bonusDescription)
- Optional BenefitUsage or user-entered calculator state; avoid storing unless necessary.

## Risks
- Course rubrics are now included; verify final submission instructions and professor approval before submitting.
- Partner unconfirmed: professor approval needed for pair process.
- Catalog accuracy and caps: use labeled simplified rules and dated data.
- Deployment/auth integration: implement early enough to allow E2E.
- Git/Claude Code evidence must be captured during real development, not recreated afterward.

## Scope freeze
No bank APIs, financial account data, CVV/PAN, live reward rates, booking APIs, payment or credit scoring.
