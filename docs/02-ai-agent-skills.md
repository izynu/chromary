# AI Agent Skills

> The open SKILL.md format: teach any AI agent expert color workflows on demand, loaded only when relevant, token-cheap by design.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|---|---|---|---|
| **SKILL.md format** | One folder, one markdown file, YAML frontmatter | A single portable file any SKILL.md aware agent can load and run | ★★★★★ |
| **Progressive disclosure** | Description always in context; body loads on demand | Deep expertise without paying its token cost every message | ★★★★★ |
| **Description engineering** | WHAT + WHEN + trigger keywords, ≤ ~1,024 chars | The *only* routing signal, nail it or the skill never fires | ★★★★★ |
| **Hard gates** | Non-negotiable quality bars in the body | Stops agents from "almost" following your standards | ★★★★ |
| **chromary skills** | 6 installable color skills in this repo | Palettes, contrast, theming, colormaps, gradients, image extraction | ★★★★★ |

 legend: ★★★★★ must-know · ★★★★ excellent · ★★★ situational · ★ niche · ★ historical.

## The Catalog

### The Agent Skills format
- **What:** An open format: a folder containing `SKILL.md`, YAML frontmatter with `name` and `description`, then a markdown body of instructions. Optional extras (scripts, reference files) live beside it in the same folder.
- **Why it's great:** It's a file, not a platform. Claude Code, Cursor, Windsurf and custom agents increasingly read the same format, so one well-written skill travels everywhere. It is not a prompt, it's on-demand expertise.
- **Pro tip:** The spec caps `name` at 64 characters and `description` at 1,024, spend description characters on trigger phrases, not adjectives.
- **Link:** https://www.anthropic.com/news/skills

```yaml
---
name: contrast-auditor
description: Audits color pairs for WCAG 2.x and APCA contrast, simulates color
  vision deficiency, and auto-fixes failures in OKLCH. Use when the user mentions
  contrast, WCAG, accessibility, dark-mode text, or "can you read this".
---
# Everything below loads only when the description above matches the request.
```

### Progressive disclosure (the whole point)
- **What:** A three-tier loading model. **Tier 1:** `name` + `description` ride along in context every session (tens of tokens). **Tier 2:** the body loads only when the request matches the description. **Tier 3:** linked reference files load only if the body points there.
- **Why it's great:** You can ship deep expertise, formulas, checklists, long tables, without paying for it in every conversation. An agent with 30 skills installed still runs lean.
- **Pro tip:** If the body grows past ~500 lines, split it: keep the workflow in the body, push tables and long examples into reference files the agent reads on demand.
- **Link:** https://www.anthropic.com/news/skills

### Where skills live
- **`~/.claude/skills/<skill-name>/SKILL.md`**, global, available in every project for that user.
- **`.claude/skills/<skill-name>/SKILL.md`**, per-project, lives in the repo; commit it so the whole team (and their agents) inherit it.
- Other SKILL.md aware runtimes, Cursor, Windsurf, custom agents, read the same format from their own skill directories; check your runtime's docs for its path.
- **Pro tip:** Project skills beat global skills for anything with opinions about *your* codebase; keep personal preferences global.

### How agents pick skills (the matching game)
- The agent sees every installed skill's **description**, that is the menu.
- Matching is semantic: user request → description. A strong description states **WHAT** it does, **WHEN** to use it, and the **trigger keywords** users actually type ("palette", "WCAG", "theme", "colormap", "gradient").
- "Helps with colors" routes nothing. "…use when the user asks for a palette, brand colors, or a color scheme" fires on the first try.
- **Pro tip:** Write the description *last*, after testing, then verify the agent triggers it from five phrasings you didn't hardcode.

### Anatomy of a great skill body
- **When to use**, explicit in-scope and out-of-scope, so the agent self-selects correctly.
- **Workflow**, numbered steps, one action each; agents follow sequences far better than paragraphs.
- **Decision rules**, if/then branches ("if the user gives a hex, seed with it; if only a brand word, map to hue first").
- **Hard gates**, non-negotiable quality bars the agent may not skip ("no palette ships without a contrast check"; "never return raw HSL scales").
- **Output format**, the exact template to emit; consistency is what users judge skills by.
- **Example**, one golden input → output pair; agents imitate examples more reliably than they follow rules.

### Testing a skill
- **Golden prompts:** 5 to 10 real user phrasings; each should trigger the skill and produce rubric-passing output.
- **Near-misses:** prompts that *shouldn't* trigger it ("recolor my avatar photo"), verify there's no false routing.
- **Fresh-context runs:** test with a clean agent that has no memory of writing the skill. You are not the user.
- **Token audit:** log what actually loads; if the body fires on every message, your description is too broad.
- **A/B diff:** same prompt with and without the skill, then judge both outputs against your hard gates.

### Common mistakes
- **Vague description**, "helps with color tasks" routes nothing. Say what, when, and with which keywords.
- **Body too long**, a 2,000-line brain dump burns context and gets skimmed. Split into references.
- **Missing hard gates**, without non-negotiables, agents rationalize past quality bars under pressure.
- **No output format**, results drift between runs, and users can't rely on the shape.
- **Duplicating a library**, if five lines of culori do it, link the recipe instead of describing the math.
- **Forgetting the description is the only router**, a perfect body behind a weak description is a skill nobody uses.

### The 6 skills shipped in this repo
- **[palette-generator](../skills/palette-generator/SKILL.md)**, brand word or seed color → OKLCH palette with locked math and contrast checks.
- **[contrast-auditor](../skills/contrast-auditor/SKILL.md)**, WCAG 2.x + APCA audit, CVD simulation, auto-fix.
- **[theme-builder](../skills/theme-builder/SKILL.md)**, shadcn/Tailwind semantic tokens from a single seed.
- **[dataviz-colormaps](../skills/dataviz-colormaps/SKILL.md)**, scientific colormap selection: sequential, diverging, categorical.
- **[gradient-smith](../skills/gradient-smith/SKILL.md)**, OKLCH-space gradients that never go gray.
- **[image-palette](../skills/image-palette/SKILL.md)**, extract and refine palettes from logos and photos.
- **Pro tip:** Read their bodies as worked examples of the anatomy above, then copy the structure for your own domain.
- **Link:** [../skills/README.md](../skills/README.md)

## Pitfalls

- Skills are not system-prompt stuffing, if it must be in context always, it isn't a skill, it's a memory leak.
- The description is the entire routing surface; a great body behind a vague description is dead weight.
- Hard gates without consequences get skipped, phrase them as "never ship X without Y", not "prefer Y".
- Testing only on prompts you wrote, you'll overfit to your own phrasing.
- Assuming every runtime shares install paths, verify where your agent actually looks for skills.

## Try it now

```bash
# A 20-second skill: create it, then ask your agent "give me a palette for a jazz club"
mkdir -p .claude/skills/tiny-palette && cat > .claude/skills/tiny-palette/SKILL.md <<'EOF'
---
name: tiny-palette
description: Generates a 5-color brand palette in OKLCH. Use when the user asks
  for a palette, brand colors, or a color scheme.
---
# Tiny Palette
1. Map the brand word to a hue (warm words → 30°, cool → 220°, trust adjectives).
2. Emit 5 OKLCH colors: L 35 / 50 / 65 / 80 / 92%, C 0.12 to 0.18, hue fixed.
3. HARD GATE: any text color must clear 4.5:1 against its paired background.

Output a markdown table: step, OKLCH value, hex, suggested use.
EOF
```

## Related guides

- [01 · REST APIs & MCP](01-rest-apis-and-mcp.md), skills carry knowledge; MCP tools make live calls
- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md), the OKLCH math these skills encode
- [04 · Accessibility & Contrast](04-accessibility-contrast.md), the science behind contrast-auditor's gates
- [05 · Design Systems & Scales](05-design-systems-and-scales.md), theme-builder's target output format
- [06 · Data Visualization Colormaps](06-data-visualization-colormaps.md), dataviz-colormaps in depth
- [15 · Tool Selection Matrix](15-tool-selection-matrix.md), skill vs MCP vs library, per scenario

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
