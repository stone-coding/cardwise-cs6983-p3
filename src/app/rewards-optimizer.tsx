"use client";

import { useState, type FormEvent } from "react";
import { CARD_CATALOG } from "@/lib/rewards/catalog";
import { optimizeRewards } from "@/lib/rewards/optimizer";
import { parseAmount } from "@/lib/rewards/parse-amount";
import { SPEND_CATEGORIES, type OptimizerError, type OptimizerResult, type SpendCategory } from "@/lib/rewards/types";

const ERROR_MESSAGES: Record<OptimizerError, string> = {
  INVALID_AMOUNT: "Enter an amount between $0.01 and $1,000,000 (up to 2 decimal places).",
  EMPTY_WALLET: "Select at least one card from your wallet.",
  UNKNOWN_CARD: "One of the selected cards is not in the catalog.",
  INVALID_CATEGORY: "Choose a valid spending category.",
};

const CATEGORY_LABELS: Record<SpendCategory, string> = {
  dining: "Dining",
  groceries: "Groceries",
  travel: "Travel",
  other: "Everything else",
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const formatCents = (cents: number) => usd.format(cents / 100);

export function RewardsOptimizer() {
  const [amountText, setAmountText] = useState("");
  const [category, setCategory] = useState<SpendCategory>("dining");
  const [wallet, setWallet] = useState<string[]>(CARD_CATALOG.map((c) => c.id));
  const [result, setResult] = useState<OptimizerResult | null>(null);

  function toggleCard(id: string) {
    setWallet((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = parseAmount(amountText);
    setResult(
      amount === null
        ? { ok: false, error: "INVALID_AMOUNT" }
        : optimizeRewards({ amount, category, walletCardIds: wallet }),
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-5" noValidate>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium">
            Purchase amount (USD)
          </label>
          <input
            id="amount"
            name="amount"
            inputMode="decimal"
            autoComplete="off"
            placeholder="e.g. 85.50"
            value={amountText}
            onChange={(e) => setAmountText(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Spending category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as SpendCategory)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {SPEND_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="text-sm font-medium">Cards in your wallet</legend>
          <div className="mt-2 space-y-1">
            {CARD_CATALOG.map((card) => (
              <label key={card.id} className="flex items-center gap-2">
                <input type="checkbox" checked={wallet.includes(card.id)} onChange={() => toggleCard(card.id)} />
                {card.name}
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700">
          Find best card
        </button>
      </form>

      <section aria-live="polite">
        {result && !result.ok && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-red-800">
            {ERROR_MESSAGES[result.error]}
          </p>
        )}

        {result?.ok && (
          <div className="space-y-3">
            <p className="rounded-md bg-emerald-50 p-3 text-emerald-900">
              {result.isTie ? (
                <>
                  <strong>Tie:</strong> {result.best.map((c) => c.cardName).join(" and ")} each earn an estimated{" "}
                  {formatCents(result.best[0].rewardCents)}.
                </>
              ) : (
                <>
                  <strong>Use {result.best[0].cardName}</strong>: estimated {formatCents(result.best[0].rewardCents)} in
                  rewards.
                </>
              )}
            </p>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2">Card</th>
                  <th className="py-2">Rate</th>
                  <th className="py-2 text-right">Est. reward</th>
                </tr>
              </thead>
              <tbody>
                {result.results.map((r) => (
                  <tr key={r.cardId} className="border-b border-slate-100">
                    <td className="py-2">{r.cardName}</td>
                    <td className="py-2">{r.ratePercent}%</td>
                    <td className="py-2 text-right">{formatCents(r.rewardCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-xs text-slate-500">
        Estimates only. Card names are fictional and rates are simplified and illustrative (no caps, activation, or
        merchant-category nuances). Not financial advice.
      </p>
    </div>
  );
}
