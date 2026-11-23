# HW5: Custom Skill + MCP Integration

- **Due** Dec 7 by 2:59am
- **Points** 50
- **Submitting** a website url or a file upload

## Objective

Extend Claude Code by building a custom skill for your P3 workflow and connecting an MCP server to enhance your development capabilities.

## Part 1: Custom Skill (50%)

Create a custom Claude Code skill (`.claude/skills/`) for your P3 project:

- Define a reusable workflow as a slash command (e.g., `/fix-issue`, `/deploy`, `/add-feature`, `/review`)
- Skill must include clear instructions, constraints, and expected behavior
- Test the skill on at least 2 real tasks
- Iterate on the skill based on results (show v1 → v2 improvement)

**Requirements:** Skill file in `.claude/skills/` with proper metadata (name, description). Clear instructions that Claude Code can follow. Evidence of v1 → v2 iteration (what changed and why). Screenshots or session logs showing skill execution on real tasks.

## Part 2: MCP Integration (35%)

Connect at least one MCP server to your Claude Code workflow:

- Choose a relevant server: database MCP, Playwright (browser testing), GitHub, Figma, or another
- Configure with `claude mcp add`
- Demonstrate a complete task that uses the MCP connection
- Document the setup process and what it enables

**Requirements:** Working MCP server configuration. At least one demonstrated workflow using the MCP server. Setup documentation (how to reproduce).

## Part 3: Retrospective (15%)

Write a 1-2 page retrospective answering:

- How did the custom skill change your workflow? What tasks became easier?
- What did MCP integration enable that wasn't possible before?
- What would you build next (hooks, sub-agents, more skills)?

## Deliverables

1. **Your github repository including your `.claude/skills/` directory** with custom skill (v1 and v2 versions)
2. **MCP server configuration** and usage demonstration
3. **Screenshots or session logs** showing skill and MCP in action
4. **Retrospective document** (1-2 pages)

## Rubric (50 points)

| Criterion | Weight |
| --- | --- |
| Custom skill quality & iteration | 50% |
| MCP integration & demonstration | 35% |
| Retrospective | 15% |

## Rubric

**HW5: Custom Skill + MCP Integration Rubric**

| Criteria | Excellent | Good | Adequate | Needs Improvement | No Marks | Maximum |
| --- | --- | --- | --- | --- | --- | --- |
| Custom Skill Quality & Iteration | 25 pts | 18.75 pts | 12.5 pts | 6.25 pts | 0 pts | 25 pts |
| MCP Integration & Demonstration | 17.5 pts | 13.125 pts | 8.75 pts | 4.375 pts | 0 pts | 17.5 pts |
| Retrospective | 7.5 pts | 5.625 pts | 3.75 pts | 1.875 pts | 0 pts | 7.5 pts |

Total Points: 50
