# CardWise — Project 3 Master Plan

> **Status: PROPOSED.** The sprint dates, owners, and scope below are pending approval by both partners at the Sprint 1 Planning Meeting (2026-11-25, 19:00–19:30 PST). Nothing here records a decision until `docs/sprints/sprint-1/PLANNING.md` is filled in after that meeting.

| Item | Value |
|---|---|
| Repository | https://github.com/stone-coding/cardwise-cs6983-p3 |
| Team | Haomiao Shi, Togzhan Usseiin (pair arrangement must be confirmed by the professor; see §8) |
| Backlog | [Issues #1–#31](https://github.com/stone-coding/cardwise-cs6983-p3/issues) · [Sprint 1 milestone](https://github.com/stone-coding/cardwise-cs6983-p3/milestone/1) · [Sprint 2 milestone](https://github.com/stone-coding/cardwise-cs6983-p3/milestone/2) |
| Source of truth | `docs/assignments/PROJECT3.md` (200 pts), `docs/assignments/HW5.md` (50 pts) |
| Related docs | [RUBRIC_TRACKER](RUBRIC_TRACKER.md) · [TEAM_RESPONSIBILITIES](TEAM_RESPONSIBILITIES.md) · [DEFINITION_OF_DONE](DEFINITION_OF_DONE.md) · [EVIDENCE_INDEX](EVIDENCE_INDEX.md) · [FINAL_SUBMISSION_CHECKLIST](FINAL_SUBMISSION_CHECKLIST.md) |

## 1. Hard deadlines (from `docs/assignments/`)

| Deadline | Date/time | Notes |
|---|---|---|
| Professor approval in #projects | **No later than 2026-12-09 02:59** | "At least one week before the deadline" means 7 days before Dec 16 02:59. Aim for **2026-11-27**. |
| HW5 | **2026-12-07 02:59** | Internal target: 2026-12-05. Ask the instructor whether HW5 is submitted individually or as a pair. |
| Project 3 | **2026-12-16 02:59** | The Canvas header also says "Finals Week Dec 14–20". Treat **Dec 16 02:59** as binding. Internal feature freeze 2026-12-13; final submission target 2026-12-15 12:00. |

## 2. Frozen product scope: exactly five modules

| # | Module | Issue | Sprint | Starting point |
|---|---|---|---|---|
| 1 | Rewards Optimizer (+ persistent wallet) | #4 | 1 | HW4 pure logic in `src/lib/rewards/` (39 tests). Built by Haomiao alone for HW4, before the pair formed. |
| 2 | Card Comparison (≤3 cards) | #5 | 1 | New |
| 3 | Travel Points / CPP Calculator | #6 | 1 | New |
| 4 | Welcome Bonus Tracker | #20 | 2 | New |
| 5 | Annual Fee Analyzer | #21 | 2 | New |

The following is supporting platform work, not extra modules:
- PostgreSQL + Prisma (#2)
- Auth.js with USER/ADMIN roles (#3)
- Wallet (#4)
- Shared catalog (#2)
- Admin catalog CRUD (#22)
- Responsive and accessible UI (#27)
- Vercel (#17, #26)

**Never in scope:** bank links, transaction sync, card numbers or CVV, payments, credit scoring, live travel APIs, scraping, AI product features, and native apps. Any change to scope requires approval from both partners.

## 3. Sprints (PROPOSED)

### Sprint 1 — Foundation & Core Features (2026-11-25 → 2026-12-06)

**Goal:** Establish the production foundation, finish Modules 1–3, finish HW5, and set up the Claude Code workflow.

- **Issues:** #1–#18
- **Ceremonies:**
  - Planning: 11-25
  - Async standups: 11-27, 11-30, 12-03
  - Retrospective: 12-06
- **Exit criteria:**
  - Modules 1–3 merged with TDD history
  - Auth + DB working on a preview deploy
  - HW5 submitted
  - ≥1 writer/reviewer PR completed
  - CI stages 1, 2, 3, 5 green

### Sprint 2 — Production & Final Delivery (2026-12-07 → 2026-12-15)

**Goal:** Finish Modules 4–5, full RBAC, all 8 CI/CD stages green, production deploy, and all deliverables.

- **Issues:** #19–#30, plus #31 (bonus, only if time allows)
- **Ceremonies:**
  - Planning: 12-07
  - Async standups: 12-09, 12-11, 12-13
  - Retrospective: 12-15
- **Exit criteria:** every RUBRIC_TRACKER row is VERIFIED, and the FINAL_SUBMISSION_CHECKLIST is complete.

## 4. Reuse from HW4 (legitimate, already in git history)

| Asset | Where | Counts toward |
|---|---|---|
| RED→GREEN→REFACTOR cycles for the Rewards Optimizer | commits `044484a` → `d563392` → `568acc0` → `1d6f0e2` → `6fd9c0d` | TDD feature #1 of the 3 required |
| CLAUDE.md with `@imports` and OWASP section; `/init` baseline plus iteration | `CLAUDE.md`, commits `d742903` → `7264456` | Start of CLAUDE.md evolution history |
| `.claude/settings.json` permission allow/ask/deny lists | `.claude/settings.json` | Foundation for hooks (#12) |
| Pure, tested calculator architecture (integer cents, result objects) | `src/lib/rewards/` | Pattern for Modules 2–5 |
| Annotated session log and evidence conventions | `docs/hw4/` | Template for `docs/project3/evidence/` |

**Attribution:** HW4 was completed individually by Haomiao before the pair began collaborating. It must not be described as joint work in the blog, video, reflections, or PRs.

## 5. Rubric coverage summary

Details per criterion are in [RUBRIC_TRACKER.md](RUBRIC_TRACKER.md).

| Category | Pts | Issues |
|---|---|---|
| Application Quality | 40 | #2 #3 #4 #5 #6 #20 #21 #22 #26 #27 |
| Claude Code Mastery | 55 | #7 #8 #9 #10 #12 #13 #14 #18 |
| Testing & TDD | 30 | #4 #5 #6 #20 #21 #23 #24 (#31 bonus) |
| CI/CD & Production | 35 | #15 #16 #17 #23 #24 #25 #26 (#13 SAST agent) |
| Pair Process | 25 | #1 #19 #14 (+ every PR) |
| Documentation & Demo | 15 | #28 #29 #30 |

## 6. Development workflow (every feature)

```
GitHub Issue
  → branch (or worktree) feat/<issue#>-<slug>
  → Explore (Glob/Grep/Read)
  → Plan (Plan Mode; acceptance criteria copied from the issue)
  → RED commit:      test(<scope>): … (RED)      — failing tests only, run output captured
  → GREEN commit:    feat(<scope>): … (GREEN)    — minimum code to pass
  → REFACTOR commit: refactor(<scope>): …        — tests unchanged and green
  → npm test / typecheck / lint locally (Stop hook enforces tests)
  → PR from template (/create-pr skill): writer agent recorded
  → Reviewer agents: clear-reviewer + security-reviewer
  → Human partner review (C.L.E.A.R. comments, approval)
  → CI green (all configured stages)
  → Vercel preview checked
  → Squash-free merge (keep RED/GREEN/REFACTOR commits visible), delete branch
```

**Branch names:**
- `feat/<issue#>-<slug>`
- `fix/<issue#>-<slug>`
- `chore/<issue#>-<slug>`
- `docs/<issue#>-<slug>`

**Worktrees:** `../cardwise-wt-<slug>`, one Claude Code session per worktree (#7).

**Merging:**
- Use **merge commits or rebase-merge, never squash**, for TDD PRs. Squashing would erase the RED→GREEN→REFACTOR evidence.
- Protect `main`: require a PR, 1 approving review from the partner, and passing CI. Set this up once Togzhan has collaborator access.

**Commits:** Conventional Commits. Each partner commits from their own GitHub account so contributions are attributable.

**Evidence collection:** while working (never reconstructed afterwards):
- save terminal output, screenshots, and session excerpts under `docs/project3/evidence/<topic>.md`
- link them in [EVIDENCE_INDEX.md](EVIDENCE_INDEX.md)
- documentation never substitutes for a real run, PR, or commit

## 7. Critical path

1. **Professor approval and pair confirmation:** everything else depends on these.
2. Togzhan's GitHub access, then branch protection and partner PR reviews (#14).
3. #2 DB → #3 Auth → #4 Wallet. Persistent data and roles block Modules 4–5, admin, integration tests, and E2E.
4. #8/#9/#10 → #11 HW5 by **12-07 02:59**.
5. #15 CI → #17 preview → #24 E2E + #25 AI review → #26 production with all 8 stages green.
6. #26 → #28 README → #30 video, reflections, and showcase.

## 8. External dependencies and human actions

| Action | Who | Needed by | Blocks |
|---|---|---|---|
| Professor approves project idea in #projects | Haomiao (post) + professor | ≤ 2026-12-09 02:59 (target 11-27) | Entire project |
| Professor confirms new pair arrangement | Both | ASAP | Grading as a pair; contribution balance |
| Togzhan's GitHub username; add as collaborator (Write) | Togzhan → Haomiao | 11-26 | #14, assignments, branch protection |
| Team approves sprint dates and owners | Both | 11-25 meeting | All assignments |
| Ask whether HW5 is individual or pair | Both | 11-27 | #11 |
| Supply the course definition of C.L.E.A.R. (W12 materials) | Either | Before first PR | #13, #14, PR template |
| Neon (or other Postgres) account; preview and prod databases | Haomiao | 11-28 | #2, #17 |
| Vercel account/project linked to repo; env vars | Haomiao | 11-30 | #17, #26 |
| GitHub Actions secrets: `DATABASE_URL` (test), `AUTH_SECRET`, `ANTHROPIC_API_KEY` (AI review), Vercel token/org/project IDs (if deploying via Actions) | Haomiao | 12-01 / 12-08 | #15, #23–#26 |
| Auth provider OAuth app (if using GitHub/Google login) | Haomiao | 11-30 | #3 |
| Gitleaks pre-commit installed by **both** partners | Both | 12-03 | #16 |
| Real meetings, standups, retrospectives | Both | per schedule | #1, #19 |
| Blog publication (pair-written) | Both | 12-14 | #29 |
| Video recording 5–10 min | Both | 12-14 | #30 |
| Individual 500-word reflections (each written by the student alone) | Each partner | 12-15 | #30 |
| Google Form showcase + thumbnail | Both | 12-15 | #30 |

## 9. Major risks

| Risk | Impact | Mitigation |
|---|---|---|
| Approval or pair confirmation slips past 12-09 | Project ineligible / graded solo | Post in #projects on 11-25/26; follow up 11-28 |
| Contribution imbalance (Haomiao's solo HW4 head start) | ±10% individual grade adjustment | Togzhan owns 3 of the 5 modules plus E2E/coverage; both write commits, PRs, and reviews; balance tracked at each retro |
| Squash merges erase TDD history | Lose Testing points | Merge-commit policy (§6); confirm in repo settings |
| Short Sprint 2 (9 days) with all CI/CD and deliverables | Missed stages or video | Pull CI stages 1–3 and 5 plus preview into Sprint 1; feature freeze 12-13 |
| AI review / deploy secrets unavailable | Stages 6–8 not green | Request keys in Sprint 1; fall back to `claude -p` with a personal key |
| HW5 deadline collides with Sprint 1 feature work | HW5 quality | Build skills while doing #5/#6, so the real tasks double as skill tests |
| Undefined C.L.E.A.R. expansion | Reviews don't match course rubric | Get the definition from course materials before the first PR |
| Catalog accuracy (real card names) | Misleading info | As-of dates, "estimate" labels, simplified-rules disclaimer, team decision on real vs fictional names |

## 10. Bonus (only after required rubric items are secure)

| Bonus | Pts | Plan |
|---|---|---|
| fast-check property tests | +3 | #31, using the pure calculators (rewards, CPP, bonus progress, annual value). Low cost; consider in Sprint 2 if on track. |
| Stryker mutation testing | +3 | Not planned. Revisit at Sprint 2 planning. |
| Agent SDK feature in app | +4 | Not planned: it would expand product scope ("no AI product features" constraint). |
