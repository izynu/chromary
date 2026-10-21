# 🤝 Contributing to Chromary

**Every contribution — even one fixed link — makes the toolkit better for everyone (humans and agents).** Thanks for being here. 💛

## 🎯 Ways to contribute

| I want to… | Difficulty | Where |
|---|---|---|
| Add a resource (tool/API/library/paper) | 🟢 2 min | `docs/` guide + its TL;DR table |
| Fix a broken link or typo | 🟢 1 min | anywhere |
| Add a recipe | 🟡 10 min | `recipes/{javascript,python,css}/` |
| Propose or write a new agent skill | 🟠 30 min | `skills/<new-skill>/SKILL.md` |
| Improve the playground | 🟠 30 min | `web/index.html` (must stay dependency-free) |
| Add a color MCP server to the registry | 🟢 5 min | `mcp/README.md` |
| Translate a guide | 🔴 ongoing | open an issue first |

## ➕ Adding a resource (the 2-minute guide)

1. **Pick the right guide** in `docs/` (use [15-tool-selection-matrix.md](docs/15-tool-selection-matrix.md) to see the taxonomy).
2. **Verify the link** — open it. A dead link is worse than no link.
3. **Add a catalog entry** following the exact template:

   ```markdown
   ### Resource Name
   - **What:** one sentence, concrete.
   - **Why it's great:** the differentiator, not marketing.
   - **Pro tip:** one genuinely non-obvious trick.
   - **Link:** https://…
   ```

4. **If it's top-tier**, also add it to that guide's `🏆 TL;DR — Top Picks` table **with a justified ⭐ rating** (legend in the [README](README.md#-rating-legend)).

### Rating rules
- ★★★★★ = industry standard / must-know. Reserve them. Max 6 per guide.
- Rate the *tool as you experienced it today*, not its hype.
- ★★ and below are fine — honest signal beats inflated lists.

## 🧠 Writing a new agent skill

1. Create `skills/<kebab-name>/SKILL.md`.
2. Follow the open agent-skills format exactly:

   ```markdown
   ---
   name: my-skill
   description: <what it does> + <when to use it> + <trigger words>. One line, no fluff.
   ---
   ```
3. The body must contain: **When to use**, **Workflow** (numbered), **Decision rules** (table), **Hard gates** (non-negotiable quality bars, e.g. contrast minimums), **Output format**, and at least one worked **Example**.
4. Test it: install into `.claude/skills/`, ask a natural-language question, confirm the agent picks it up *from the description alone*.
5. Add it to the skills table in the [README](README.md#-ai-agent-skills) and [skills/README.md](skills/README.md).

> 💡 The `description` is the whole game: agents choose skills by matching it against the user's request. Write it like a search ad: specific, keyword-rich, honest.

## 🧪 Recipe rules

- Runs with **zero or one dependency**; pin the import at the top.
- Must be **copy-paste runnable** — you test it, you ship it.
- Include expected output in a comment.
- Register it in the recipes table in the [README](README.md#-recipes).

## 🎨 Style guide

- GitHub-flavored Markdown, no inline HTML (except the README's banner block).
- Emoji section headers exactly like the existing guides (`## 🏆`, `## 📖`, `## ⚠️`, `## 🧪`, `## 🔗`).
- Prefer **tables** over prose for comparisons; prefer **bullets** over paragraphs for tips.
- Code: ES modules for JS, type hints for Python, custom properties for CSS.
- Cross-link related guides with relative links. From *inside* `docs/`, that looks like: `[04 · Accessibility](04-accessibility-contrast.md)`.

## 🔀 PR process

1. Fork → branch: `feat/add-xcolor-api` or `fix/typo-guide-04`.
2. One logical change per PR (a whole new guide can be its own PR).
3. Fill the PR checklist (it's short, promise).
4. A maintainer reviews within ~48h. Fix links & template violations are auto-requests.

## 💬 Questions?

Open a GitHub Discussion or an issue with the `question` label. No question too small — even "what's chroma?" counts.

---
*Part of 🎨 Chromary — the armory of color. Built for humans, tuned for agents.*
