# Tool Selection Matrix

> One giant table that routes any color task to its tool, its agent skill and its deep dive guide, the map of the entire armory.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|---|---|---|---|
| **The mega decision table** | 12 tasks → tool → skill → guide | If you read nothing else on this page, read this. It routes 90% of real-world color work. | ★★★★★ |
| **Library-by-language table** | 4 languages, 1 go-to each | Stops the "which npm package?" rabbit hole in ten seconds. | ★★★★ |
| **API vs local library table** | Determinism / offline / rate limits | The build-time vs runtime decision, settled in one glance. | ★★★★ |
| **The "Invoke skill" column** | 6 installable agent skills | Turns this matrix from a bookmark into something your AI agent executes ([02](02-ai-agent-skills.md)). | ★★★★ |

*Legend: ★★★★★ must-know → ★ historical. Full legend in the [README](../README.md).*

## The Catalog

### How to route a task
- **What:** Find your task in column 1 → take the tool from columns 2 to 3 → fire the skill (if any) → open the guide for depth. Thirty seconds, start to finish.
- **Why it's great:** It collapses the repo's 16 guides + 6 skills + 200 resources into the one question that matters: *I have this task, what now?*
- **Pro tip:** Let your AI agent do the routing: with the skills installed, phrases like "audit this palette" or "make this a shadcn theme" trigger the right skill automatically.
- **Link:** [02 · AI Agent Skills](02-ai-agent-skills.md)

### The mega decision table

| Task | First choice | Alternative | Invoke skill | Read guide |
|---|---|---|---|---|
| Generate UI palette | The Color API + OKLCH | Huemint | `palette-generator` | [08](08-ai-palette-generation.md) |
| Tailwind/shadcn theme | uicolors.app | tweakcn | `theme-builder` | [05](05-design-systems-and-scales.md) |
| Audit accessibility | apca-w3 | whocanuse | `contrast-auditor` | [04](04-accessibility-contrast.md) |
| Scientific colormap | cmcrameri (batlow/vik) | viridis / cividis | `dataviz-colormaps` | [06](06-data-visualization-colormaps.md) |
| Categorical chart colors | iwanthue | d3 scale-chromatic | `dataviz-colormaps` | [06](06-data-visualization-colormaps.md) |
| CSS gradient | `in oklab` interpolation | meshgradient.in | `gradient-smith` | [07](07-css-gradients.md) |
| Extract from image | node-vibrant | Color Thief | `image-palette` | [10](10-image-color-extraction.md) |
| Name a hex | color.pizza | The Color API `/id` | | [01](01-rest-apis-and-mcp.md) |
| Hex → Pantone | The Color API `/id` + verify chip | Pantone Connect / encycolorpedia | | [12](12-print-and-physical-standards.md) |
| Pixel-art palette | Lospec | PICO-8 | | [14](14-game-and-pixel-palettes.md) |
| AI prompt → palette | Huemint | ColorMagic | `palette-generator` | [08](08-ai-palette-generation.md) |
| Pick JS library | culori | colorjs.io | | [11](11-libraries-and-sdks.md) |

- **Pro tip:**"First choice" assumes web development defaults; rows 4 to 5 flip for scientific Python, row 9 for print. When in doubt, the guide link has the nuance.
- **Pro tip:** The skill column maps 1:1 to the six skills shipped in [`skills/`](../skills/README.md), install once, then just ask your agent in natural language ([02](02-ai-agent-skills.md)).

### Fastest path by role

| You are… | Start at row | Then live in guide |
|---|---|---|
| Front-end dev shipping UI | 2 · Tailwind/shadcn theme | [05](05-design-systems-and-scales.md) → [07](07-css-gradients.md) |
| Data scientist / researcher | 4 · Scientific colormap | [06](06-data-visualization-colormaps.md) → [13](13-color-science-and-standards.md) |
| Designer handing off to print | 9 · Hex→Pantone | [12](12-print-and-physical-standards.md) |
| Game / pixel artist | 10 · Pixel-art palette | [14](14-game-and-pixel-palettes.md) |
| AI agent builder | 1 · Generate UI palette | [02](02-ai-agent-skills.md) → [01](01-rest-apis-and-mcp.md) |

### Library by language

| Language | Go-to | Also excellent | Best for |
|---|---|---|---|
| JavaScript / TypeScript | **culori** | colord · chroma.js · colorjs.io · TinyColor · color2k · polished · d3-color | Perceptual everything; colord when kB matter |
| Python | **coloraide** | colour-science · palettable · distinctipy · webcolors | Scientific work → colour-science; charts → palettable |
| Rust | **palette** | | Type safe pixel formats, linear-light blending |
| Go | **go-colorful** | | Lab/Luv/HSLuv blending with a stdlib-friendly API |

### API vs local library

| Criterion | REST API (e.g. The Color API) | Local library (e.g. culori) |
|---|---|---|
| **Determinism** | Same hex + mode + count → same scheme, but the service could change under you | Fully deterministic, pinned in your lockfile, tested in your CI |
| **Offline** | Needs network | Works on planes, in CI, on-prem |
| **Rate limits** | Yes, cache by `hex+mode+count` and batch | None, compute a million schemes if you like |
| **Latency** | One network round-trip per call | Microseconds, in-process |
| **Bundle cost** | Zero kB shipped | ~1 to 20 kB depending on library |
| **Curated naming data** | Built-in (thousands of named colors) | Bring your own (or `webcolors`) |
| **Agent-friendliness** | Great via MCP, native tools for agents ([01](01-rest-apis-and-mcp.md)) | Great via skills, instructions beat tool calls for judgment work |
| **Verdict** | Great for prototyping & naming | Great for production paths & agents |

> Rule of thumb: **call an API for inspiration, ship a library for logic.** Deep dive in [01](01-rest-apis-and-mcp.md), including the MCP angle.

## Pitfalls

- Don't stack two tools from different rows for one job, pick the first choice, ship, revisit only if it fails.
- "First choice" is context-sensitive: row 4 assumes scientific publishing, row 2 assumes Tailwind, the linked guide is the tiebreaker.
- API responses are a runtime dependency: schema drift and downtime are real. Cache aggressively and keep a library fallback ([01](01-rest-apis-and-mcp.md)).
- Skills only fire if installed, copy them from [`skills/`](../skills/README.md) into `.claude/skills/` first ([02](02-ai-agent-skills.md)).
- Hex→Pantone (row 9) always ends at a physical swatch, the matrix routes you there, it can't replace it ([12](12-print-and-physical-standards.md)).
- Re-audit after any change: a palette swap re-opens row 3 (accessibility) even if you only touched row 1.

## Try it now

**Tables are the content, no code needed in this guide.** Every other guide in the repo carries the runnable snippet; this one just tells you *which* guide to open. Pick your row above, click the guide number, and go.

## Related guides

- [01 · REST APIs & MCP](01-rest-apis-and-mcp.md), the API half of the decision table
- [02 · AI Agent Skills](02-ai-agent-skills.md), what "Invoke skill" means and how to install them
- [04 · Accessibility & Contrast](04-accessibility-contrast.md), row 3, in depth
- [05 · Design Systems & Scales](05-design-systems-and-scales.md), row 2, in depth
- [06 · Data-Viz Colormaps](06-data-visualization-colormaps.md), rows 4 to 5, in depth
- [08 · AI Palette Generation](08-ai-palette-generation.md), rows 1 & 11, in depth
- [11 · Libraries & SDKs](11-libraries-and-sdks.md), rows 7 & 12, plus every library above
- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md), the "OKLCH" in row 1, explained
- [13 · Color Science & Standards](13-color-science-and-standards.md), why row 4 is not negotiable in science
- [16 · Glossary](16-glossary.md), the vocabulary the tables assume

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
