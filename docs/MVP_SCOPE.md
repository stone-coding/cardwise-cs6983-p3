# CardWise — Frozen MVP Scope

## Exactly five business modules
1. **Rewards Optimizer:** input amount + spending category; rank cards in user's wallet by estimated reward value.
2. **Card Comparison:** side-by-side comparison of up to 3 curated cards (annual fee, reward categories, basic benefits).
3. **Travel Points Calculator:** compute CPP from cash price, taxes/fees, and points required; optionally compare against user-entered baseline valuation.
4. **Welcome Bonus Tracker:** manually create target spend, amount spent, deadline; show progress and remaining days/dollars.
5. **Annual Fee Analyzer:** estimated annual rewards + manually valued used benefits - annual fee.

## Supporting capabilities
- Authentication; User and Admin roles.
- User wallet (card-product IDs only); admin catalog editor (minimal CRUD).
- Small curated catalog (~10 cards) with clearly marked simplifications and data as-of dates.
- Responsive UI; simple dashboard linking the five modules.

## Constraints
- No bank integration, no financial-account credentials, no card number/CVV, no payments, no credit scoring, no live travel booking.
- No web scraping or automatic financial product data refresh in MVP.
- No AI chatbot, RAG, advanced analytics, native mobile app, email notification, subscription or billing.
- Avoid overengineering. Use one Next.js app, one relational database, pure calculation functions.
- Reward values depend on MCC/merchant classification, caps, activation, and issuer terms; show estimate caveats. Use explicit default assumptions.
- Do not confuse credit-card *product metadata* with a user's sensitive payment credentials.

## Acceptance checks (business-level)
- Given 3 wallet cards with simple rates, the optimizer ranks expected rewards deterministically.
- Comparison accepts 2–3 cards and displays a consistent set of attributes.
- CPP = (cash price - unavoidable cash fees) / points required * 100; reject invalid input and clarify assumptions.
- SUB progress never exceeds the displayed completion percentage of 100%, even if spending exceeds target; remaining spend is never negative.
- Annual net value includes only manually estimated/used benefits and rewards, minus annual fee.
- User can only access own wallet and tracker; admin-only edits are enforced server-side.

## Explicit change control
Any new feature must be approved by the human project owner and justified against rubric points and deadline. Do not implement stretch goals automatically.
