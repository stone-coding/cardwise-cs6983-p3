# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

This repository currently contains **planning documents only** — there is no application code, `package.json`, build, lint, or test command yet. Commands must be added here once the app is scaffolded.

CardWise is a Credit Card Rewards Optimizer built for Northeastern CS6983. One repository serves three graded assignments: HW4 (Claude Code workflow & TDD, due 2026-11-26 02:59), HW5 (skills & MCP, due 2026-12-07 02:59), and Project 3 (production app, due 2026-12-16 02:59).

## Where things are

- `docs/assignments/` — HW4, HW5, PROJECT3 requirement checklists and rubrics. Per README, these are user-supplied working copies; reconcile against Canvas before relying on them.
- `docs/MVP_SCOPE.md` — the **frozen** scope: exactly five modules (Rewards Optimizer, Card Comparison, Travel Points/CPP Calculator, Welcome Bonus Tracker, Annual Fee Analyzer) plus auth, wallet, and a small admin catalog. New features require explicit approval from the human project owner.
- `docs/PROJECT_PROPOSAL.md` — problem, user stories, out-of-scope list, planned stack.
- `docs/IMPLEMENTATION_PLAN.md` — phased plan (HW4 → HW5 → P3) and tentative data model (User, CardProduct, WalletCard, BonusTracker).
- `docs/evidence/` — where real session evidence goes (`hw4/`, `hw5/`, `p3/` subfolders).
- `prompts/` — prompts the owner pastes into Claude Code sessions.

## Planned architecture (from docs, not yet implemented)

Single Next.js App Router app (TypeScript, Tailwind), PostgreSQL (Neon) via Prisma, Auth.js, Vitest, Playwright, GitHub Actions, Vercel. Reward/CPP/fee logic is meant to be **pure calculation functions**; user wallets store card-product IDs only.

## Hard constraints

- No bank integrations, card numbers/CVV, payments, credit scoring, live travel APIs, scraping, or AI features.
- All reward values are labeled estimates with explicit simplified rules and as-of dates.
- Evidence (Git history, logs, screenshots) must be genuine and captured during real work — never fabricated or reconstructed.
- Do not commit, push, or deploy without the owner's approval. `.env` is gitignored; only `.env.example` is tracked.
