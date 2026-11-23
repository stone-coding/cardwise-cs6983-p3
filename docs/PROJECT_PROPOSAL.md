# Project 3 Proposal: CardWise — Credit Card Rewards Optimizer

**Group members:** @Haomiao Shi; teammate TBD (reassignment requested)

## Problem
Credit cards offer different cashback rates, travel points, welcome bonuses, and annual benefits. Choosing the best card for a purchase or deciding whether a card's annual fee is worthwhile often requires comparing multiple websites and manually calculating rewards. It can also be difficult to track welcome bonus spending requirements and deadlines. CardWise combines these tasks in one lightweight application without connecting to bank accounts.

## Target users
People who own multiple credit cards and want to compare benefits, estimate cashback/travel rewards, and track welcome bonuses.

## Proposed user stories
1. As a user, I want to sign in and manage a wallet of card products, so I can track which cards I own.
2. As a user, I want to enter a purchase amount and category, so I can identify the card in my wallet with the highest estimated rewards.
3. As a user, I want to compare up to three cards by annual fee, reward rates, and key benefits, so I can evaluate them side by side.
4. As a user, I want to calculate cents-per-point (CPP) for a travel redemption, so I can compare using points against paying cash.
5. As a user, I want to manually track a welcome bonus spending target and deadline, so I can monitor progress.
6. As a user, I want to estimate annual net value using rewards, benefits actually used, and annual fees, so I can assess whether keeping a card is worthwhile.
7. As an admin, I want to maintain a small curated card catalog and reward rules, so users have consistent inputs.

## Out of scope
Bank links; transaction sync; full card numbers/CVV; credit scores; payment processing; card applications; live travel inventory; native mobile apps; automated notifications; complex quarterly/rotating categories; personalized financial advice.

## Planned tech stack
Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL (Neon), Prisma, Auth.js, Vitest, Playwright, GitHub Actions, Vercel.

## Scope and accuracy
Use approximately 10 manually curated card-product profiles with as-of dates and simplified, clearly labeled rules. All amounts are user-entered. Calculations are estimates, not guaranteed rewards. Prioritize small, functional MVP and Claude Code/TDD/CI evidence.
