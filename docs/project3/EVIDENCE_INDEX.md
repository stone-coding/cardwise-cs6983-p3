# Evidence Index — for graders

A single place to find every grading artifact. Each row links directly to real evidence. A row stays **pending** until the work actually exists. Raw evidence lives in `docs/project3/evidence/` (created as work happens), plus PRs, CI runs, and deployments.

**Key URLs**

| What | URL |
|---|---|
| Repository | https://github.com/stone-coding/cardwise-cs6983-p3 |
| Production app | _pending (#26)_ |
| Blog post | _pending (#29)_ |
| Video demo | _pending (#30)_ |
| CI workflow runs | https://github.com/stone-coding/cardwise-cs6983-p3/actions (_no workflows yet; #15_) |
| Backlog / milestones | [Issues](https://github.com/stone-coding/cardwise-cs6983-p3/issues) · [Sprint 1](https://github.com/stone-coding/cardwise-cs6983-p3/milestone/1) · [Sprint 2](https://github.com/stone-coding/cardwise-cs6983-p3/milestone/2) |

## Claude Code Mastery

| Artifact | Location | Status |
|---|---|---|
| CLAUDE.md (@imports, OWASP) | [`CLAUDE.md`](../../CLAUDE.md) | Exists |
| CLAUDE.md evolution | `git log --follow -p CLAUDE.md`: `d742903` (/init baseline), `7264456` (HW4 iteration), P3 planning update | Exists (ongoing) |
| `/init` baseline output | [`docs/hw4/evidence/CLAUDE.init-output.md`](../hw4/evidence/CLAUDE.init-output.md) | Exists (HW4, Haomiao) |
| Permissions | [`.claude/settings.json`](../../.claude/settings.json) | Exists |
| Auto-memory evidence | `docs/project3/evidence/claude-md-memory.md` | _pending (#18)_ |
| Skills v1 → v2 + usage | `.claude/skills/`, `docs/project3/evidence/skills.md` | _pending (#8, #9)_ |
| Hooks + firing evidence | `.claude/settings.json`, `.claude/hooks/`, `docs/project3/evidence/hooks.md` | _pending (#12)_ |
| MCP config + usage | `.mcp.json`, `docs/hw5/MCP_SETUP.md` | _pending (#10)_ |
| Sub-agents + output | `.claude/agents/`, `docs/project3/evidence/agents.md` | _pending (#13)_ |
| Worktree parallel development | `docs/project3/evidence/worktrees.md` | _pending (#7)_ |
| Writer/reviewer PRs with C.L.E.A.R. + AI disclosure | PR links | _pending (#14)_ |

## Testing & TDD

| Artifact | Location | Status |
|---|---|---|
| TDD feature 1: Rewards Optimizer (HW4, Haomiao) | RED `044484a` → GREEN `d563392`; RED `568acc0` → GREEN `1d6f0e2`; REFACTOR `6fd9c0d`; logs in [`docs/hw4/evidence/test-runs/`](../hw4/evidence/test-runs/) | Exists |
| TDD feature 2: Card Comparison | PR for #5 | _pending_ |
| TDD feature 3: CPP Calculator | PR for #6 | _pending_ |
| TDD features 4–5 | PRs for #20, #21 | _pending_ |
| Integration tests + coverage ≥70% | CI artifact link | _pending (#23)_ |
| Playwright E2E | CI run link | _pending (#24)_ |

## CI/CD & Security

| Artifact | Location | Status |
|---|---|---|
| Workflow file(s) | `.github/workflows/` | _pending (#15)_ |
| Run with all 8 stages green | run link + screenshot | _pending (#26)_ |
| Gitleaks pre-commit + CI | `docs/project3/evidence/security-gates.md` | _pending (#16)_ |
| npm audit gate | CI job | _pending (#15)_ |
| Security sub-agent / SAST output | PR comments | _pending (#13)_ |
| Security DoD | [`DEFINITION_OF_DONE.md` §3](DEFINITION_OF_DONE.md) | Exists (to be applied) |

## Pair Process

| Artifact | Location | Status |
|---|---|---|
| Sprint 1 planning / standups / retro | [`docs/sprints/sprint-1/`](../sprints/sprint-1/) | Templates only |
| Sprint 2 planning / standups / retro | [`docs/sprints/sprint-2/`](../sprints/sprint-2/) | Templates only |
| PR template (C.L.E.A.R. + AI disclosure) | [`.github/pull_request_template.md`](../../.github/pull_request_template.md) | Exists |
| Contribution balance | `git shortlog -sn --all`, PR author/reviewer list | _pending_ |

## Documentation & Demo

| Artifact | Location | Status |
|---|---|---|
| README + Mermaid diagram | [`README.md`](../../README.md) | _pending (#28)_ |
| Blog / video / showcase | URLs above | _pending (#29, #30)_ |
| Individual reflections | Submitted by each partner | _pending; student-authored only_ |
