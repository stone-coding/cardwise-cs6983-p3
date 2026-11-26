# Definition of Done (DoD)

An issue or PR is **Done** only when every applicable box is true **and backed by real evidence**: a commit, a CI run, a PR comment, or a screenshot. A box is never ticked based on documentation alone.

## 1. General
- [ ] All acceptance criteria in the linked issue are met and demonstrated.
- [ ] Work is on its own branch `feat|fix|chore|docs/<issue#>-<slug>` and merged through a PR. No direct pushes to `main`.
- [ ] The PR uses `.github/pull_request_template.md` with every section filled in.
- [ ] `npm run lint`, `npm run typecheck`, and `npm test` pass locally. CI is green for every configured stage.
- [ ] The partner has approved the PR (human review), and the reviewer agent's output is linked.
- [ ] A Vercel preview was checked once preview deploys exist (#17).
- [ ] UI changes are responsive (≥375px), have labelled form controls, and show loading, empty, and error states.
- [ ] CLAUDE.md and README are updated if architecture, commands, or conventions changed.
- [ ] Evidence is linked in `docs/project3/EVIDENCE_INDEX.md` where a rubric item depends on it.

## 2. TDD (feature issues)
- [ ] A **RED** commit (`test(...)…(RED)`) adds failing tests before any implementation. The failing output is captured.
- [ ] A **GREEN** commit (`feat(...)…(GREEN)`) adds the minimum code to pass.
- [ ] A **REFACTOR** commit (`refactor(...)`) changes no test behaviour, and tests stay green.
- [ ] Tests cover edge cases and invalid input, and for protected resources, **authorization failures**.
- [ ] The PR is merged without squashing, so the TDD commits stay visible.

## 3. Security acceptance criteria (required gate)
- [ ] **Secrets:** none in code, docs, logs, screenshots, `.mcp.json`, or PR text. Gitleaks passes both pre-commit and in CI.
- [ ] **Dependencies:** `npm audit --audit-level=high` is clean in CI. Any new dependency is justified in the PR and pinned to an exact version.
- [ ] **A01 Access control:** every protected route or server action calls `requireUser`/`requireAdmin` on the server. Tests cover cross-user (IDOR) and non-admin denial.
- [ ] **A03 Injection / validation:** all inputs are validated server-side (types, bounds, allowlists). Data access goes only through Prisma's parameterized queries, with no raw SQL built from strings.
- [ ] **A04 Insecure design:** no card numbers, CVV, bank credentials, or SSNs are collected or stored.
- [ ] **A05 Misconfiguration:** env vars are documented by name only, and the workflow `permissions:` are least-privilege.
- [ ] **XSS:** no `dangerouslySetInnerHTML`; React escaping only.
- [ ] The `security-reviewer` sub-agent (or a SAST tool) has run on the diff, and its findings are fixed or justified in the PR.

## 4. C.L.E.A.R. review framework
> **REQUIRES HUMAN ACTION:** paste the course's official C.L.E.A.R. definition here (W12 materials). The repository does not contain it, and nothing here guesses what the letters stand for.

| Letter | Course definition (paste verbatim) | What reviewers check in CardWise |
|---|---|---|
| C | _TBD from course materials_ | _TBD_ |
| L | _TBD_ | _TBD_ |
| E | _TBD_ | _TBD_ |
| A | _TBD_ | _TBD_ |
| R | _TBD_ | _TBD_ |

## 5. AI disclosure (every PR)
- Estimated % AI-generated code, as an honest estimate.
- AI tools used: Claude Code with model, skills, agents, and MCP servers used.
- Writer agent / session and reviewer agent(s).
- Human review performed: what the human author verified and what the partner reviewed.
