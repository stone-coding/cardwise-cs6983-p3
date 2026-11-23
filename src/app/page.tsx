import { RewardsOptimizer } from "./rewards-optimizer";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">CardWise — Rewards Optimizer</h1>
      <p className="mt-2 mb-6 text-slate-600">Find the card in your wallet that earns the most on a purchase.</p>
      <RewardsOptimizer />
    </main>
  );
}
