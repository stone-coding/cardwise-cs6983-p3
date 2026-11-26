# Team Responsibilities — **PROPOSED**

> All ownership below is **PROPOSED and not approved**. It becomes binding only when both partners confirm it at Sprint 1 Planning (2026-11-25), and that confirmation is recorded in `docs/sprints/sprint-1/PLANNING.md`. No one is assigned on GitHub until Togzhan's GitHub username is known and both partners agree.

## Principles
- **Balanced technical work.** Both partners write production code, tests, and Claude Code configuration. Documentation is never anyone's main contribution.
- **HW4 head start.** Haomiao built the HW4 Rewards Optimizer alone before the pair formed. To balance that, Togzhan leads **three of the five modules** plus E2E and coverage. Haomiao leads platform, CI/CD, and deploy.
- **Cross-review.** Every PR is authored by one partner and reviewed by the other, with reviewer agents also run on it. Each partner must author **and** review PRs.
- **Both partners use Claude Code.** Each partner uses both skills, triggers the hooks, uses MCP, runs the sub-agents, and works in a worktree, with evidence attributed to them.

## Responsibility matrix

| Area | Haomiao (proposed) | Togzhan (proposed) |
|---|---|---|
| **Product modules** | M1 Rewards Optimizer + wallet (#4); M5 Annual Fee Analyzer (#21) | M2 Card Comparison (#5); M3 CPP Calculator (#6); M4 Welcome Bonus Tracker (#20) |
| **Platform** | Prisma/Postgres schema + seed (#2); Auth.js + RBAC guards (#3) | Admin catalog CRUD (#22); UI polish, accessibility, dashboard lead (#27) |
| **Tests** | TDD for M1 extension and M5; auth-guard integration tests | TDD for M2, M3, M4; integration tests + ≥70% coverage gate (#23); Playwright E2E (#24) |
| **Skills** | `/add-feature` v1→v2 (#8) | `/review-pr` v1→v2 (#9) |
| **Hooks** | PreToolUse guard + PostToolUse format/lint (#12) | Stop-hook test gate (pairs on #12) |
| **MCP** | GitHub MCP (#10) | Playwright MCP (#10) |
| **Agents** | Uses agents on own PRs | `security-reviewer` and `clear-reviewer` sub-agents (#13) |
| **Worktrees** | Parallel worktree for #2/#3 when overlapping | Parallel worktrees for #5 ∥ #6 (#7) |
| **CI/CD** | Lint/typecheck/test/audit workflow (#15); Vercel preview (#17); AI PR review (#25); production deploy, all 8 stages green (#26) | Gitleaks pre-commit + CI scan (#16); E2E CI stage (#24); coverage gate (#23) |
| **PRs authored (target)** | ≥5 (#2, #3, #4, #15/#17, #21, #25/#26) | ≥5 (#5, #6, #13, #16, #20, #22/#24) |
| **PRs reviewed (target)** | Every Togzhan PR | Every Haomiao PR |
| **CLAUDE.md / memory** | Updates for DB/auth/CI architecture (#18) | Updates for testing/E2E/security conventions (#18) |
| **Docs & demo** | README + Mermaid (#28); blog sections on platform/CI; video segment on Claude Code workflow | Blog sections on TDD/E2E/agents; video segment on app walkthrough (both roles) |
| **Process** | Own standups (≥3 per sprint); co-facilitate planning | Own standups (≥3 per sprint); co-facilitate retros |
| **Individual reflection** | Writes own 500 words, unaided | Writes own 500 words, unaided |

## Balance check (proposed backlog)
- **Owned issues:**
  - Haomiao: #2 #3 #4 #8 #12 #15 #17 #21 #25 #26 #28 (11)
  - Togzhan: #5 #6 #7 #9 #13 #16 #20 #22 #23 #24 #27 (11)
  - Shared: #1 #10 #14 #18 #19 #29 #30
- **HW5 is excluded** from this matrix. It is individual coursework: each partner owns their own HW5 skill execution, MCP demonstration, evidence, retrospective, and submission. These materials are kept outside this shared repository. Reminder: issue #11, outside the P3 milestones.
- Check balance at each retrospective using `git shortlog -sn`, PRs authored and reviewed, and standup counts. Adjust in Sprint 2 planning if one partner falls behind.

## Approval

| Partner | Approves proposed ownership? | Date | Notes |
|---|---|---|---|
| Haomiao Shi | ☐ pending | | |
| Togzhan Usseiin | ☐ pending | | |
