# Project 3 Rubric Tracker (200 pts + up to 10 bonus)

**Statuses:**
- **VERIFIED:** real evidence exists and is linked.
- **IN PROGRESS:** partial evidence exists.
- **PLANNED:** not started.
- **BLOCKED:** waiting on a dependency.
- **REQUIRES HUMAN ACTION:** only a person can do it (accounts, meetings, writing, approvals).

**Owners are PROPOSED** until confirmed (see `TEAM_RESPONSIBILITIES.md`).

**Rule:** a row moves to VERIFIED only when the "Actual evidence" column links to a real commit, CI run, PR, deployment, or screenshot.

_Last updated: 2026-11-25 (planning baseline; HW5 separated as individual coursework, so it is not tracked here)._

## A. Application Quality — 40 pts
Excellent: production-ready, deployed on Vercel, polished UI, 2+ user roles, real problem solved, portfolio-worthy.

| Criterion | Issue | Sprint | Proposed owner | Required evidence | Status | Actual evidence |
|---|---|---|---|---|---|---|
| Module 1 Rewards Optimizer (+ wallet) | #4 | 1 | Haomiao | Merged PR, prod URL | IN PROGRESS | HW4 pure logic + UI: `src/lib/rewards/`, commit `76e4e5b` (wallet persistence not started) |
| Module 2 Card Comparison | #5 | 1 | Togzhan | Merged PR, prod URL | PLANNED | |
| Module 3 CPP Calculator | #6 | 1 | Togzhan | Merged PR, prod URL | PLANNED | |
| Module 4 Welcome Bonus Tracker | #20 | 2 | Togzhan | Merged PR, prod URL | PLANNED | |
| Module 5 Annual Fee Analyzer | #21 | 2 | Haomiao | Merged PR, prod URL | PLANNED | |
| Persistent data (Postgres + Prisma) | #2 | 1 | Haomiao | Migration + seed; data survives redeploy | PLANNED | |
| 2+ user roles (USER/ADMIN) enforced server-side | #3, #22 | 1–2 | Haomiao / Togzhan | Authz tests; admin page demo | PLANNED | |
| Polished, responsive, accessible UI; loading/error states | #27 | 2 | Togzhan (lead) | Screenshots at 375px, Lighthouse a11y | PLANNED | |
| Deployed on Vercel (public production URL) | #26 | 2 | Haomiao | Prod URL | REQUIRES HUMAN ACTION (Vercel account) | |
| Real problem, portfolio-worthy | all | — | Both | README + video | PLANNED | |

## B. Claude Code Mastery — 55 pts
Excellent: rich CLAUDE.md with @imports and git evolution; 2+ iterated skills with usage evidence; 2+ hooks enforcing quality; MCP via .mcp.json; agents with evidence; parallel worktree development; 2+ PRs with writer/reviewer + C.L.E.A.R. + AI disclosure.

| Criterion | Issue | Sprint | Proposed owner | Required evidence | Status | Actual evidence |
|---|---|---|---|---|---|---|
| CLAUDE.md comprehensive, with @imports | #18 | 1–2 | Both | `CLAUDE.md` | IN PROGRESS | `CLAUDE.md` (imports `@docs/MVP_SCOPE.md`, `@docs/PROJECT_PROPOSAL.md`, `@docs/project3/DEFINITION_OF_DONE.md`) |
| CLAUDE.md evolution visible in git | #18 | 1–2 | Both | `git log -p CLAUDE.md` with ≥3 meaningful revisions | IN PROGRESS | `d742903` (/init) → `7264456` (iteration) → P3 planning commit |
| Auto-memory usage | #18 | 1–2 | Both | Memory files / `/memory` screenshots from real sessions | REQUIRES HUMAN ACTION | |
| ≥2 skills in `.claude/skills/` (`/add-feature`, `/review-pr`) | #8, #9 | 1 | Haomiao / Togzhan | SKILL.md files | PLANNED | |
| Skills iterated v1 → v2 (target: both skills) | #8, #9 | 1 | Haomiao / Togzhan | v1 and v2 commits + change rationale | PLANNED | |
| Skill usage evidence from both partners | #8, #9 | 1–2 | Both | Session logs/screenshots on real tasks | PLANNED | |
| ≥2 hooks in `.claude/settings.json` | #12 | 1 | Haomiao (+ Togzhan) | settings.json + hook scripts | PLANNED | |
| ≥1 PreToolUse/PostToolUse hook | #12 | 1 | Haomiao | Session showing it fire | PLANNED | |
| ≥1 quality-enforcement hook (Stop → tests) | #12 | 1 | Togzhan | Session showing it fire | PLANNED | |
| MCP server via shared `.mcp.json` (GitHub MCP, Playwright MCP) | #10 | 1 | Haomiao / Togzhan | `.mcp.json` committed | PLANNED | |
| MCP used in the real workflow | #10 | 1 | Both | Session log/screenshots | PLANNED | |
| Custom sub-agent(s) in `.claude/agents/` with execution evidence | #13 | 1 | Togzhan | Agent files + output on real PRs | PLANNED | |
| ≥2 features developed in parallel in worktrees | #7 | 1 | Togzhan (+ Haomiao) | `git worktree list`, overlapping branch history | PLANNED | |
| ≥2 PRs with writer/reviewer pattern | #14 | 1–2 | Both | PR links | PLANNED | |
| C.L.E.A.R. applied in PR review comments | #14 | 1–2 | Both | PR comments | BLOCKED (course C.L.E.A.R. definition not in repo) | |
| AI disclosure metadata in PRs | #14, PR template | 1–2 | Both | PR bodies | IN PROGRESS | `.github/pull_request_template.md` (template only) |

## C. Testing & TDD — 30 pts
Excellent: TDD red-green-refactor for 3+ features visible in git; 70%+ coverage; unit + integration + E2E (Playwright); tests verify behavior and edge cases.

| Criterion | Issue | Sprint | Proposed owner | Required evidence | Status | Actual evidence |
|---|---|---|---|---|---|---|
| TDD feature 1: Rewards Optimizer | #4 | HW4 + 1 | Haomiao | RED→GREEN→REFACTOR commits | VERIFIED (HW4 cycles) | `044484a` → `d563392`, `568acc0` → `1d6f0e2`, `6fd9c0d` |
| TDD feature 2: Card Comparison | #5 | 1 | Togzhan | RED→GREEN→REFACTOR commits | PLANNED | |
| TDD feature 3: CPP Calculator | #6 | 1 | Togzhan | RED→GREEN→REFACTOR commits | PLANNED | |
| TDD features 4–5 (Bonus Tracker, Annual Fee), preferred | #20, #21 | 2 | Togzhan / Haomiao | RED→GREEN→REFACTOR commits | PLANNED | |
| Unit tests | all | 1–2 | Both | Vitest | IN PROGRESS | 39 unit tests (`src/lib/rewards/*.test.ts`) |
| Integration tests (DB + authorization, incl. denial paths) | #23 | 2 | Togzhan | Vitest integration suite in CI | PLANNED | |
| ≥1 Playwright E2E | #24 | 2 | Togzhan | E2E in CI | PLANNED | |
| ≥70% coverage, enforced in CI | #23 | 2 | Togzhan | Coverage report + threshold failure | PLANNED | |

## D. CI/CD & Production — 35 pts
Excellent: all 8 pipeline stages green; 4+ security gates; OWASP in CLAUDE.md.

| Criterion | Issue | Sprint | Proposed owner | Required evidence | Status | Actual evidence |
|---|---|---|---|---|---|---|
| 1. Lint (ESLint + Prettier) | #15 | 1 | Haomiao | Green CI run | PLANNED | |
| 2. Typecheck (`tsc --noEmit`) | #15 | 1 | Haomiao | Green CI run | PLANNED | |
| 3. Unit + integration tests | #15, #23 | 1–2 | Haomiao / Togzhan | Green CI run | PLANNED | |
| 4. E2E (Playwright) | #24 | 2 | Togzhan | Green CI run | PLANNED | |
| 5. Security scan (`npm audit`) | #15 | 1 | Haomiao | Green CI run | PLANNED | |
| 6. AI PR review (claude-code-action / `claude -p`) | #25 | 2 | Haomiao | AI comment on PR | REQUIRES HUMAN ACTION (API key secret) | |
| 7. Vercel preview deploy | #17 | 1 | Haomiao | Preview URL on PR | REQUIRES HUMAN ACTION (Vercel) | |
| 8. Production deploy on merge to main | #26 | 2 | Haomiao | Deploy run + prod URL | PLANNED | |
| All 8 stages green in one run | #26 | 2 | Haomiao | Run link + screenshot | PLANNED | |
| Gate: pre-commit secrets detection (Gitleaks) | #16 | 1 | Togzhan | Blocked fake-secret demo | PLANNED | |
| Gate: dependency scanning (npm audit in CI) | #15 | 1 | Haomiao | CI job | PLANNED | |
| Gate: SAST or security sub-agent | #13 | 1 | Togzhan | Agent output on PRs | PLANNED | |
| Gate: security acceptance criteria in DoD | — | 1 | Both | `DEFINITION_OF_DONE.md` §3 | IN PROGRESS | `docs/project3/DEFINITION_OF_DONE.md` (verified once applied on real PRs) |
| OWASP Top 10 in CLAUDE.md | #18 | 1 | Both | CLAUDE.md section | IN PROGRESS | `CLAUDE.md` § Security considerations (HW4); expand for auth/DB |

## E. Pair Process — 25 pts
Excellent: 2+ sprints with planning + retrospectives; branch-per-issue with PR reviews; 3+ async standups/sprint/partner; C.L.E.A.R. in reviews; AI disclosure.

| Criterion | Issue | Sprint | Proposed owner | Required evidence | Status | Actual evidence |
|---|---|---|---|---|---|---|
| Sprint 1 planning record | #1 | 1 | Both | `docs/sprints/sprint-1/PLANNING.md` | REQUIRES HUMAN ACTION (meeting 11-25) | |
| Sprint 1 retrospective | #1 | 1 | Both | `.../RETROSPECTIVE.md` | REQUIRES HUMAN ACTION | |
| Sprint 2 planning + retrospective | #19 | 2 | Both | sprint-2 files | REQUIRES HUMAN ACTION | |
| ≥3 async standups/sprint/partner (≥12 total) | #1, #19 | 1–2 | Both | `STANDUPS.md` | REQUIRES HUMAN ACTION | |
| GitHub Issues with testable acceptance criteria | — | — | Both | Issues #1–#31 | IN PROGRESS | [Issues](https://github.com/stone-coding/cardwise-cs6983-p3/issues) (created; to be confirmed at planning) |
| Branch-per-issue with partner PR reviews | #14 | 1–2 | Both | PR history | BLOCKED (Togzhan collaborator access) | |
| C.L.E.A.R. in reviews + AI disclosure | #14 | 1–2 | Both | PR comments | BLOCKED (C.L.E.A.R. definition) | |
| Balanced contributions | all | 1–2 | Both | `git shortlog -sn`, PR counts | PLANNED | |

## F. Documentation & Demo — 15 pts
Excellent: clear README with Mermaid architecture diagram; published blog post with AI workflow insights; polished 5–10 min video; 500-word reflections with specific Claude Code insights.

| Criterion | Issue | Sprint | Proposed owner | Required evidence | Status | Actual evidence |
|---|---|---|---|---|---|---|
| README (setup, env, tests, deploy, URLs) | #28 | 2 | Haomiao | README | PLANNED | |
| Mermaid architecture diagram | #28 | 2 | Haomiao | Renders on GitHub | PLANNED | |
| Published pair blog post | #29 | 2 | Both | Public URL | REQUIRES HUMAN ACTION | |
| 5–10 min video demo | #30 | 2 | Both | Video URL | REQUIRES HUMAN ACTION | |
| Individual 500-word reflections (each partner, self-written) | #30 | 2 | Each | Two documents | REQUIRES HUMAN ACTION | |
| Showcase Google Form + thumbnail | #30 | 2 | Both | Confirmation | REQUIRES HUMAN ACTION | |

## Prerequisites (not scored, but gate everything)
| Item | Status |
|---|---|
| Professor approval in #projects (≤ 2026-12-09 02:59) | REQUIRES HUMAN ACTION |
| Pair arrangement confirmed by professor | REQUIRES HUMAN ACTION |
| Togzhan's GitHub username + collaborator access | REQUIRES HUMAN ACTION |
| Team approval of sprints and ownership | REQUIRES HUMAN ACTION |

## Bonus (tracked separately; required rubric first)
| Bonus | Pts | Issue | Status |
|---|---|---|---|
| fast-check property-based tests | +3 | #31 | PLANNED (conditional) |
| Stryker mutation testing | +3 | — | Not planned |
| Agent SDK feature in app | +4 | — | Not planned (scope constraint) |
