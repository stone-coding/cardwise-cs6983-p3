# Context Management Strategy — CardWise (HW4)

This document describes how Claude Code context is managed in this repository. Section 2 separates what was **actually done** from what is **planned**. Only items marked *Actual* have evidence.

## 1. Strategy

| Tool | When to use it | Why |
|---|---|---|
| `CLAUDE.md` + `@imports` | Always loaded at session start | Stable project facts (scope, stack, conventions, TDD rules) don't need to be re-explained in each session. `@docs/MVP_SCOPE.md` and `@docs/PROJECT_PROPOSAL.md` pull in frozen scope without copying it. |
| `/compact [focus]` | At phase boundaries in one long session (for example, after Explore + Plan, before Implement), or when the context indicator gets high | Keeps the decisions (plan, acceptance criteria, commit hashes) and drops bulky tool output such as `npm install` logs and file dumps. Use a focus hint, for example `/compact keep the rewards plan, acceptance criteria, and commit hashes`. |
| `/clear` | Between unrelated tasks (for example, HW4 rewards work → an unrelated docs fix, or before starting HW5) | Prevents stale context from a finished task from biasing the next one. CLAUDE.md reloads automatically, so nothing durable is lost. |
| `claude --continue` (`-c`) | Resuming the most recent session in this directory after closing the terminal | Continues the same TDD cycle with full history instead of re-exploring. `claude --resume` picks an older session. |
| Plan file + session log | Durable hand-off | `docs/hw4/PLAN.md` and `docs/hw4/SESSION_LOG.md` survive `/clear`, so a fresh session can run `Read` on them instead of re-deriving the plan. |
| Auto-memory | Cross-project user facts (for example, "use nvm Node 22; Homebrew node is broken") | These are machine quirks, not repo facts, so they stay out of CLAUDE.md. |

Rule of thumb: **Durable project knowledge → CLAUDE.md or docs. Task state → the conversation. Run `/compact` to shrink the conversation and `/clear` to reset it.**

## 2. Actual vs. planned usage

| Command | Status | Evidence |
|---|---|---|
| `CLAUDE.md` loaded with `@imports` | **Actual.** Committed in this session. | `CLAUDE.md`, Git history |
| `/init` | **Actual.** Run in session `0c53a3d1-4aad-469a-99be-60a4df601984`. | `docs/hw4/evidence/CLAUDE.init-output.md`, commit `d742903` |
| `/compact` | **Planned. Student must run it** (Claude cannot invoke this built-in command itself). | Screenshot required, see `SUBMISSION_CHECKLIST.md` |
| `/clear` | **Planned. Student must run it.** | Screenshot required |
| `claude --continue` | **Planned. Student must run it** from a terminal in this repo. | Screenshot required |

When the student runs each command, update the status above to *Actual* and add the screenshot path.
