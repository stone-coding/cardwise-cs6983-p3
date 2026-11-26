# Project 3 Final Submission Checklist

**Deadline: 2026-12-16 02:59.** Internal target: submit by **2026-12-15 12:00**. Tick an item only when the linked evidence exists. Status values are the same as in `RUBRIC_TRACKER.md`.

## Gate 0: eligibility
- [ ] Professor approved the project in #projects (screenshot) by **2026-12-09 02:59** — REQUIRES HUMAN ACTION
- [ ] Pair arrangement (Haomiao + Togzhan) confirmed by the professor — REQUIRES HUMAN ACTION

## 1. Repository with full `.claude/` configuration
- [ ] `CLAUDE.md` with @imports; ≥3 meaningful revisions in history; OWASP section current
- [ ] `.claude/skills/` with ≥2 skills, v1→v2 history, and usage evidence from both partners
- [ ] `.claude/settings.json` with ≥2 hooks (≥1 Pre/PostToolUse, ≥1 quality gate), with evidence of them firing
- [ ] `.claude/agents/` with sub-agent(s) and output on real PRs
- [ ] `.mcp.json` committed (no secrets) with usage evidence
- [ ] Worktree evidence for ≥2 parallel features
- [ ] Auto-memory evidence

## 2. Deployed application
- [ ] Public Vercel production URL works (both roles can sign in; all 5 modules usable)
- [ ] Preview deploys appear on PRs

## 3. CI/CD (all stages green in one run)
- [ ] Lint · [ ] Typecheck · [ ] Unit/integration · [ ] E2E · [ ] npm audit · [ ] AI review · [ ] Preview · [ ] Prod deploy
- [ ] Security gates: Gitleaks · npm audit · security agent/SAST · security DoD

## 4. Testing
- [ ] TDD RED→GREEN→REFACTOR visible for ≥3 features (HW4 Rewards + #5 + #6, ideally #20/#21)
- [ ] Coverage ≥70% (CI report link)
- [ ] ≥1 Playwright E2E in CI

## 5. Pair process
- [ ] 2 sprint planning records + 2 retrospectives (genuine)
- [ ] ≥3 standups per sprint per partner (≥12 total)
- [ ] ≥2 writer/reviewer PRs with C.L.E.A.R. comments + AI disclosure; each partner authored and reviewed
- [ ] Contribution balance reviewed (`git shortlog -sn`)

## 6. Deliverables (human-authored)
- [ ] README with Mermaid architecture, setup, env vars (names only), testing, deploy, all URLs
- [ ] Technical blog post published (pair) — URL:
- [ ] Video 5–10 min (app + Claude Code workflow) — URL:
- [ ] Haomiao's 500-word reflection, self-written — REQUIRES HUMAN ACTION
- [ ] Togzhan's 500-word reflection, self-written — REQUIRES HUMAN ACTION
- [ ] Showcase Google Form submitted (name, URLs, thumbnail, video, blog) — REQUIRES HUMAN ACTION
- [ ] Canvas submission (repo URL + prod URL + blog + video)

## 7. Final hygiene
- [ ] Gitleaks full-history scan clean; no `.env` tracked
- [ ] `npm ci && npm run lint && npm run typecheck && npm test && npm run build` pass on a fresh clone
- [ ] EVIDENCE_INDEX has no remaining "_pending_" rows
