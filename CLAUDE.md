# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

CardWise is a Credit Card Rewards Optimizer for Northeastern CS6983. One repository serves three graded assignments: **HW4** (Claude Code workflow & TDD, due 2026-11-26 02:59), **HW5** (skills & MCP, due 2026-12-07 02:59), and **Project 3** (production app, due 2026-12-16 02:59). Requirement checklists and rubrics are in `docs/assignments/`.

**Current phase: Project 3, Sprint 1 planning.** HW4 is finished: Haomiao built the pure Rewards Optimizer alone, before the pair formed. Project 3 is a pair project (Haomiao Shi + Togzhan Usseiin), pending professor confirmation. The plan, backlog (GitHub issues #1–#31), and rubric tracker are in `docs/project3/`. Work only on issues the team has accepted, one branch or worktree per issue (`feat/<issue#>-<slug>`), and follow the workflow in `docs/project3/MASTER_PLAN.md` §6. Sprint dates and owners are **proposed** until recorded in `docs/sprints/sprint-1/PLANNING.md`.

Never create, prefill, or backdate standups, retrospectives, reviews, or reflections. Those are human-authored.

Frozen scope, product context, and Definition of Done (imported):

@docs/MVP_SCOPE.md
@docs/PROJECT_PROPOSAL.md
@docs/project3/DEFINITION_OF_DONE.md

## Commands

Node is managed with nvm (`nvm use 22`). The Homebrew `node` on the owner's machine is broken.

```bash
npm install              # install exact-pinned deps
npm run dev              # Next.js dev server on http://localhost:3000
npm run build            # production build (also type-checks app routes)
npm run typecheck        # tsc --noEmit over the whole repo
npm test                 # vitest run (all *.test.ts under src/)
npm run test:watch       # vitest watch mode
npx vitest run src/lib/rewards/optimizer.test.ts   # run a single test file
npx vitest run -t "tie"                             # run tests whose name matches
```

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript 5 (`strict`)
- Tailwind CSS 4 via `@tailwindcss/postcss` (`@import "tailwindcss"` in `src/app/globals.css`; there is no `tailwind.config`)
- Vitest 5 (node environment, `src/**/*.test.ts`)
- Planned later (do **not** add for HW4): PostgreSQL (Neon) + Prisma, Auth.js, Playwright, GitHub Actions, Vercel.

## Architecture decisions

- **Pure domain logic in `src/lib/`.** Reward math lives in `src/lib/rewards/` as framework-free, deterministic functions with no I/O. UI and future API routes call into these functions and never duplicate the math.
- **Catalog as static data for now.** The HW4 card catalog is a typed constant in `src/lib/rewards/catalog.ts` (3 illustrative cards with fictional names). In P3 it moves to Prisma `CardProduct`; keep the `CardProduct` type shape so the swap is mechanical.
- **Money in integer cents.** Convert dollar input to cents once at the boundary; compute rewards in cents; format only for display. Never compare floating-point dollar amounts.
- **Result objects, not exceptions, for user input errors.** The optimizer returns `{ ok: false, error: <code> }` for invalid amounts, empty wallets, unknown cards, or unknown categories. The UI maps codes to messages.
- **Deterministic ordering.** Results are sorted by reward descending, then card name ascending. Every card that ties for the top reward is reported, along with an explicit tie flag. The recommendation never depends on input order.
- **Client-side page for HW4.** `src/app/page.tsx` renders a client component that calls the pure optimizer directly. No API route or server state is needed until P3 adds wallets per user.

## Coding conventions

- TypeScript `strict`; no `any`; prefer `type` aliases and string-literal unions (for example `SpendCategory`) over enums.
- Use named exports. Use the `@/` import alias for `src/`. Use kebab-case card IDs (`cw-dining-plus`).
- Co-locate tests: `foo.ts` ↔ `foo.test.ts` in the same folder.
- Keep components small. Domain types are imported from `src/lib/rewards/types.ts`, not redefined in UI files.
- Conventional Commits: `test(scope):`, `feat(scope):`, `refactor(scope):`, `docs(scope):`, `chore:`.

## Testing strategy (strict TDD)

- **Red → Green → Refactor, one commit per step.** Write failing tests first and run them to confirm they fail for the right reason, then commit (`test(...)`). Next, write the minimum code to pass and commit (`feat(...)`). Finally, clean up with tests still green and commit (`refactor(...)`). Never put tests and their implementation in the same first commit.
- Unit tests target the pure functions in `src/lib/`. Each acceptance criterion gets at least one test, and the edge cases are mandatory: invalid amounts (0, negative, NaN, Infinity, over the cap, non-numeric strings), empty wallet, unknown card ID, ties, duplicate wallet IDs, and cent rounding.
- Assert exact cent values, not approximate floats.
- UI is verified manually for HW4 (`npm run build` plus a dev-server check). Playwright E2E is a P3 deliverable.
- Run `npm test` and `npm run typecheck` before every commit.

## Do's and don'ts (project-specific)

- **Do** label every reward figure as an *estimate*. Rates are illustrative and simplified (no caps, MCC nuances, activation, or rotating categories).
- **Do** keep wallet data limited to card-*product* IDs.
- **Do** preserve genuine evidence in `docs/hw4/` (session log, `/init` output, test output). Record real commit hashes; never fabricate or backfill logs, screenshots, or results.
- **Don't** add features outside the frozen five-module scope, or any P3 module, during HW4.
- **Don't** add dependencies without a stated need. Pin exact versions (`--save-exact`) and keep `npm audit` clean.
- **Don't** push, deploy, or rewrite Git history without the owner's explicit approval. Local commits are fine.
- **Don't** write the student's personal reflection documents. Those are student-authored.

## Security considerations (OWASP-aligned)

- **A03 Injection / input validation:** treat every user input as untrusted. Parse amounts with a strict decimal pattern (no exponent or hex), bound them (> 0 and ≤ $1,000,000), and validate category and card IDs against allowlists from the catalog.
- **A04 Insecure design:** never collect card numbers (PAN), CVV, bank credentials, or SSNs. That data must not enter forms, logs, or the database.
- **A05 Misconfiguration / secrets:** secrets live only in `.env` (gitignored). Only `.env.example` with placeholders is tracked. Never read or print `.env*` contents.
- **A06 Vulnerable components:** use exact-pinned dependencies, and run `npm audit` after any dependency change.
- **A01 Broken access control (P3):** enforce per-user wallet ownership and admin-only catalog edits on the server, never only in the UI.
- **XSS:** render through React's escaping only; no `dangerouslySetInnerHTML`.

## Claude Code workflow & context management

- Permissions: `.claude/settings.json` (shared, committed) allowlists test, build, and read-only Git commands. It denies reading `.env*`, `git push`, `rm -rf`, and network fetch tools. Personal overrides belong in `.claude/settings.local.json` (not committed).
- Workflow for each feature: **Explore** (Glob, Grep, Read) → **Plan** (Plan Mode, acceptance criteria) → **Implement** (TDD) → **Commit**.
- Context management strategy: see `docs/hw4/CONTEXT_MANAGEMENT.md`. In short, run `/compact` at phase boundaries, run `/clear` between unrelated tasks, and run `claude --continue` to resume the last session.
