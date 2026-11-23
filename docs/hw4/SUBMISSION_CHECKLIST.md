# HW4 Submission Checklist — Claude Code Workflow & TDD (50 pts)

**Due:** 2026-11-26 02:59 (Canvas time) · **Status legend:** COMPLETE · INCOMPLETE · REQUIRES STUDENT ACTION

> **HW4 is NOT fully complete.** The 1–2 page reflection must be written independently by the student.

## Part 1 — CLAUDE.md & Project Setup (25% · 12.5 pts)

| Requirement | Evidence | Status |
|---|---|---|
| Comprehensive CLAUDE.md: project context | `CLAUDE.md` § Project context | COMPLETE |
| Tech stack | `CLAUDE.md` § Tech stack, § Commands | COMPLETE |
| Architecture decisions | `CLAUDE.md` § Architecture decisions | COMPLETE |
| Coding conventions | `CLAUDE.md` § Coding conventions | COMPLETE |
| Testing strategy | `CLAUDE.md` § Testing strategy | COMPLETE |
| Project-specific do's/don'ts | `CLAUDE.md` § Do's and don'ts; § Security (OWASP) | COMPLETE |
| ≥1 `@import` | `CLAUDE.md`: `@docs/MVP_SCOPE.md`, `@docs/PROJECT_PROPOSAL.md` | COMPLETE |
| Permissions configured | `.claude/settings.json` (allow, ask, and deny lists) | COMPLETE |
| `/init` output demonstrated | `docs/hw4/evidence/CLAUDE.init-output.md`; commit `d742903` | COMPLETE |
| Iterate on CLAUDE.md after `/init` | `git diff d742903 7264456 -- CLAUDE.md`; SESSION_LOG §1.3 | COMPLETE |
| Context strategy documented | `docs/hw4/CONTEXT_MANAGEMENT.md` | COMPLETE |
| `/compact`, `/clear`, `claude --continue` actually used | Run each one in Claude Code in this repo, screenshot it, save to `docs/hw4/evidence/screenshots/`, and change status to *Actual* in `CONTEXT_MANAGEMENT.md` §2 | **REQUIRES STUDENT ACTION** |
| (Optional) Terminal screenshot of the `/init` run | Take from transcript or scrollback | REQUIRES STUDENT ACTION (optional) |

## Part 2 — Explore → Plan → Implement → Commit (30% · 15 pts)

| Requirement | Evidence | Status |
|---|---|---|
| Explore with Glob, Grep, Read | SESSION_LOG §2.1. Read tool used; Glob/Grep **equivalents** run via Bash `find`/`grep` because the dedicated tools were unavailable in this session | COMPLETE (with caveat) |
| (Recommended) Demo of the named Glob/Grep tools | In an interactive session, ask Claude Code to "explore src/lib/rewards using Glob and Grep", then screenshot the tool calls | REQUIRES STUDENT ACTION (recommended) |
| Plan Mode used | SESSION_LOG §2.2; `docs/hw4/PLAN.md`; commit `f5f9526` | COMPLETE |
| (Recommended) Screenshot of the Plan Mode approval prompt | Take from terminal scrollback | REQUIRES STUDENT ACTION (recommended) |
| Implemented a real P3 feature | Rewards Optimizer: `src/lib/rewards/`, `src/app/rewards-optimizer.tsx` | COMPLETE |
| ≥3 meaningful commits showing the workflow | 11 commits; see SESSION_LOG §4 | COMPLETE |
| Git history visible to grader | Local repo only. **Not pushed.** Needs a GitHub remote and push, or a zip | **REQUIRES STUDENT ACTION** |

## Part 3 — TDD with Claude Code (30% · 15 pts)

| Requirement | Evidence | Status |
|---|---|---|
| Failing tests written first | `044484a`, `568acc0`; `docs/hw4/evidence/test-runs/01-red-cycle1.txt`, `03-red-cycle2.txt` | COMPLETE |
| Minimum code to pass | `d563392`, `1d6f0e2`; `02-green-cycle1.txt`, `04-green-cycle2.txt` | COMPLETE |
| Refactor with tests green | `6fd9c0d`; `05-refactor.txt` (test files unchanged) | COMPLETE |
| Repeat for all acceptance criteria | 2 cycles cover AC1–AC7; AC8 (UI) verified manually (SESSION_LOG §3.4, screenshots) | COMPLETE |
| Red-green-refactor commit messages | `test(...)…(RED)` → `feat(...)…(GREEN)` → `refactor(...)` | COMPLETE |
| Tests pass at end | 39/39 (`06-final.txt`) | COMPLETE |

## Part 4 — Reflection & Session Log (15% · 7.5 pts)

| Requirement | Evidence | Status |
|---|---|---|
| Annotated Claude Code session log | `docs/hw4/SESSION_LOG.md` | COMPLETE |
| 1–2 page reflection: workflow comparison vs. previous approach | Student-authored | **REQUIRES STUDENT ACTION** |
| Reflection: which context strategies worked best | Student-authored (run `/compact`, `/clear`, `--continue` first so there is real experience to draw on) | **REQUIRES STUDENT ACTION** |

## Other risks to resolve before submitting
- **Pairs:** HW4 says "complete this in pairs"; the teammate is TBD. Confirm the arrangement with the professor. **REQUIRES STUDENT ACTION**
- **Assignment text:** `README.md` says `docs/assignments/` are working copies. Check them against Canvas. **REQUIRES STUDENT ACTION**

## Submission steps
1. Run `/compact`, `/clear`, and `claude --continue` in this repo and take screenshots. Update `CONTEXT_MANAGEMENT.md` §2 and commit (`docs(hw4): record context command usage`).
2. (Recommended) Capture terminal screenshots: Glob/Grep tool calls, Plan Mode approval, a RED test run.
3. Write the reflection yourself, add it to the repo or submission, and commit it.
4. Create a GitHub repo and push `main` (Claude will not push without your approval). Keep `docs/hw4/` in the push.
5. Submit the repo URL on Canvas. If uploading files, include the repo link, `SESSION_LOG.md`, and the reflection.
6. Sanity check before submitting: `npm ci && npm test && npm run build`.
