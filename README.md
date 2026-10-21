<div align="center">

<!-- 🔥 Chroma Forge · maintained by @izynu (Zynu) · MIT -->

<img src="assets/banner-animated.svg" alt="Chroma Forge — animated banner. The most complete color engineering toolkit for humans, designers and AI agents." width="100%" />

# 🔥 CHROMA FORGE

<a href="https://github.com/izynu/chroma-forge/actions/workflows/pages.yml"><img src="https://github.com/izynu/chroma-forge/actions/workflows/pages.yml/badge.svg" alt="Playground deploy status" /></a>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=20&duration=2800&pause=900&color=E8ECF4&center=true&vCenter=true&width=790&height=60&lines=The+most+complete+color+engineering+toolkit+on+GitHub;200%2B+resources+%C2%B7+16+deep-dive+guides+%C2%B7+9+recipes;6+AI-agent+skills+%C2%B7+MCP+server+%C2%B7+live+playground;Forged+for+humans+%E2%80%94+tuned+for+agents" alt="Animated tagline: the most complete color engineering toolkit on GitHub" />

[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/izynu/chroma-forge?style=flat-square&color=f97316&logo=github)](https://github.com/izynu/chroma-forge/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ec4899?style=flat-square)](./CONTRIBUTING.md)
[![Resources](https://img.shields.io/badge/resources-200%2B-f97316?style=flat-square)](#%EF%B8%8F-the-vault)
[![Agent Skills](https://img.shields.io/badge/agent_skills-6-a855f7?style=flat-square)](./skills)
[![MCP Ready](https://img.shields.io/badge/MCP-ready-14b8a6?style=flat-square)](./mcp)
[![Visitors](https://hits.sh/github.com/izynu/chroma-forge.svg?style=flat-square&color=eab308)](https://github.com/izynu/chroma-forge)

**[⚡ Quickstart](#-30-second-quickstart) · [🧭 Task Router](#-find-what-you-need-in-5-seconds) · [🗺️ The Vault](#%EF%B8%8F-the-vault) · [🤖 Skills](#-ai-agent-skills) · [🔌 MCP](#-mcp--model-context-protocol) · [🎮 Playground](#-live-playground)**

</div>

---

> ### 🎨 One repo to rule every color decision.
> **No more 40-tab chaos.** Chroma Forge fuses the entire color universe — APIs, perceptual color spaces, WCAG/APCA accessibility math, scientific colormaps, design-system scales, AI palette generators, MCP servers — into **16 deep-dive guides**, **6 installable AI-agent skills**, and a **live playground**. Your AI agent becomes a color engineer; you become unreasonably fast at color.

| 🧭 | 🤖 | 🧪 |
|:---:|:---:|:---:|
| **Curated & opinionated** | **Agent-ready** | **Actually runnable** |
| 200+ hand-picked resources, ⭐-rated with TL;DR tables and pitfalls in every guide | Drop-in `SKILL.md` skills + a working MCP server — agents don't memorize hex codes, they *compute* them | 9 copy-paste recipes + a zero-dependency playground. Every snippet tested, every claim sourced |

## ⚡ 30-Second Quickstart

### 🧑‍🎨 Humans — just browse
Open [The Vault](#%EF%B8%8F-the-vault) → pick a guide → use its **🏆 TL;DR** table. Five minutes, done.

### 🤖 AI agents — install the skills
```bash
git clone https://github.com/izynu/chroma-forge.git
mkdir -p .claude/skills
cp -r chroma-forge/skills/* .claude/skills/
```
Works with Claude Code, Cursor, Windsurf and any `SKILL.md`-aware runtime. Global install: `~/.claude/skills/` instead.

### 🔌 MCP — give your agent live color tools
```bash
cd chroma-forge/mcp/example-color-server
bun install && bun run index.ts
```

### 🧪 Developers — steal a recipe
```js
// recipes/javascript/perceptual-scale.js — a Tailwind-grade OKLCH scale in ~10 lines
import { oklch, formatHex } from "culori";
```

## 🧭 Find what you need in 5 seconds

| I want to… | Go here | Invoke this skill |
|---|---|---|
| Pick a palette that *just works* | [08 · AI palette generation](docs/08-ai-palette-generation.md) | `palette-generator` |
| Make my UI pass WCAG & APCA | [04 · Accessibility & contrast](docs/04-accessibility-contrast.md) | `contrast-auditor` |
| Build a Tailwind / shadcn theme | [05 · Design systems & scales](docs/05-design-systems-and-scales.md) | `theme-builder` |
| Chart scientific data correctly | [06 · Data-viz colormaps](docs/06-data-visualization-colormaps.md) | `dataviz-colormaps` |
| Make buttery, never-gray gradients | [07 · CSS gradients](docs/07-css-gradients.md) | `gradient-smith` |
| Extract colors from a logo/image | [10 · Image color extraction](docs/10-image-color-extraction.md) | `image-palette` |
| Wire color tools into an AI agent | [mcp/](./mcp) + [02 · Agent skills](docs/02-ai-agent-skills.md) | — |
| Finally understand OKLCH | [03 · Perceptual color spaces](docs/03-perceptual-color-spaces.md) | — |
| Match a Pantone / RAL color | [12 · Print & physical standards](docs/12-print-and-physical-standards.md) | — |
| Nail a pixel-art palette | [14 · Game & pixel palettes](docs/14-game-and-pixel-palettes.md) | — |
| Choose a color library | [11 · Libraries & SDKs](docs/11-libraries-and-sdks.md) | — |
| Read the actual color science | [13 · Science & standards](docs/13-color-science-and-standards.md) | — |
| Skim the vocabulary | [16 · Glossary](docs/16-glossary.md) | — |

## 🗺️ The Vault — 16 deep-dive guides

| # | Guide | What's inside |
|---|---|---|
| 01 | [🔌 REST APIs & MCP](docs/01-rest-apis-and-mcp.md) | The Color API, color.pizza, Colormind, APIVerve, x-colors + MCP in 2 minutes |
| 02 | [🤖 AI Agent Skills](docs/02-ai-agent-skills.md) | The open SKILL.md format, progressive disclosure, writing skills agents actually use |
| 03 | [🧭 Perceptual Color Spaces](docs/03-perceptual-color-spaces.md) | OKLCH/OKLab, CIE Lab/LCH, HSLuv, HCT, CAM16, gamut mapping |
| 04 | [♿ Accessibility & Contrast](docs/04-accessibility-contrast.md) | WCAG 2.1 math, APCA/WCAG 3, color-blind simulation, auto-fix strategies |
| 05 | [🎛️ Design Systems & Scales](docs/05-design-systems-and-scales.md) | Tailwind 50–950, Radix 12-step, shadcn tokens, Material 3 HCT, 10 enterprise systems |
| 06 | [📊 Data-Viz Colormaps](docs/06-data-visualization-colormaps.md) | viridis, Crameri scientific maps, ColorBrewer, iwanthue, when jet attacks |
| 07 | [🌈 CSS Gradients](docs/07-css-gradients.md) | Perceptual interpolation in OKLab, mesh gradients, grainy overlays, shader gradients |
| 08 | [🪄 AI Palette Generation](docs/08-ai-palette-generation.md) | Huemint, Khroma, Colormind, ColorMagic + LLM prompting patterns that respect contrast |
| 09 | [🌍 Inspiration, Culture & Themes](docs/09-inspiration-culture-and-themes.md) | Brand colors, Japanese & Chinese traditional palettes, dev themes (Catppuccin, Nord…) |
| 10 | [🖼️ Image Color Extraction](docs/10-image-color-extraction.md) | Color Thief, Vibrant, fast-average-color, k-means recipes |
| 11 | [🧰 Libraries & SDKs](docs/11-libraries-and-sdks.md) | culori, colorjs.io, chroma.js, colord · coloraide, colour-science · palette, go-colorful |
| 12 | [🖨️ Print & Physical Standards](docs/12-print-and-physical-standards.md) | Pantone, RAL, NCS, Coloro, Munsell, CMYK workflows |
| 13 | [🔬 Color Science & Standards](docs/13-color-science-and-standards.md) | CIE, ICC, ΔE2000, CSS Color 4/5, the papers worth reading |
| 14 | [👾 Game & Pixel Palettes](docs/14-game-and-pixel-palettes.md) | Lospec, PICO-8, Sweetie 16, ENDESGA, dithering |
| 15 | [🎯 Tool Selection Matrix](docs/15-tool-selection-matrix.md) | One giant table: task → first choice → alternative → skill → guide |
| 16 | [📚 Glossary](docs/16-glossary.md) | Hue, chroma, gamut, metamerism, ΔE, Lc — everything in plain English |

## 🏅 The Mount Rushmore — if you only click 5 links

| # | Resource | Why it earns a face |
|---|---|---|
| 1 | [The Color API](https://www.thecolorapi.com) | Palettes + naming + conversions over one free GET — the workhorse of the whole repo |
| 2 | [oklch.com](https://oklch.com) | The interactive OKLCH editor that permanently upgrades how you think about color |
| 3 | [`apca-w3`](https://www.npmjs.com/package/apca-w3) | The WCAG 3 contrast math your dark mode has been begging for |
| 4 | [Crameri scientific colour maps](https://www.fabiocrameri.ch/colourmaps/) | Perceptually uniform, CVD-safe, citation-ready — reviewers will thank you |
| 5 | [Huemint](https://huemint.com) | ML palettes constrained by real layouts — generate colors that fit *your* design |

## 🤖 AI Agent Skills

Each skill is a folder with a `SKILL.md` in the open agent-skills format: YAML frontmatter (`name` + `description`) plus battle-tested instructions with **hard gates** the agent may never skip. Agents read the `description` to decide *when* to load the skill — so just ask naturally.

| Skill | Fire it when the user says… |
|---|---|
| [`palette-generator`](skills/palette-generator/SKILL.md) | "give me a palette", "brand colors", "colors that match #0EA5A0" |
| [`contrast-auditor`](skills/contrast-auditor/SKILL.md) | "is this accessible?", "fix this contrast", "WCAG check" |
| [`theme-builder`](skills/theme-builder/SKILL.md) | "build me a shadcn/tailwind theme from this color" |
| [`dataviz-colormaps`](skills/dataviz-colormaps/SKILL.md) | "which colormap for my heatmap?", "CVD-safe chart colors" |
| [`gradient-smith`](skills/gradient-smith/SKILL.md) | "make a gradient", "why is my gradient gray in the middle?" |
| [`image-palette`](skills/image-palette/SKILL.md) | "extract colors from this logo/screenshot" |

<details>
<summary><b>📦 Install commands</b></summary>

```bash
# per-project (recommended — versioned with your repo)
mkdir -p .claude/skills && cp -r skills/* .claude/skills/

# global for every project
mkdir -p ~/.claude/skills && cp -r skills/* ~/.claude/skills/
```

> 💡 **Anatomy of a good skill description:** *what it does* + *when to use it* + trigger keywords. That single line decides whether your agent finds it.
</details>

## 🔌 MCP — Model Context Protocol

Give agents *live* color capabilities instead of memorized hex codes.

| Resource | What it does |
|---|---|
| [MCP registry & setup guide](mcp/README.md) | Curated color MCP servers + copy-paste configs for Claude Desktop, Cursor & VS Code |
| [`example-color-server`](mcp/example-color-server/index.ts) | Working starter MCP server (TypeScript, runs with Bun): `generate_palette` + `color_info` tools powered by The Color API |

```jsonc
// claude_desktop_config.json / .cursor/mcp.json
{
  "mcpServers": {
    "chroma-forge": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/chroma-forge/mcp/example-color-server/index.ts"]
    }
  }
}
```

## 🧪 Recipes

| Recipe | Lang | Superpower |
|---|---|---|
| [`perceptual-scale.js`](recipes/javascript/perceptual-scale.js) | JS | Tailwind-style 50–950 scale from one hue, in OKLCH |
| [`wcag-apca-contrast.js`](recipes/javascript/wcag-apca-contrast.js) | JS | WCAG ratio + APCA Lc in one file |
| [`gradient-interpolation.js`](recipes/javascript/gradient-interpolation.js) | JS | Gray-free ramps interpolated in OKLab |
| [`image-palette.js`](recipes/javascript/image-palette.js) | JS | Extract a role-based palette from any image |
| [`scientific-colormaps.py`](recipes/python/scientific-colormaps.py) | 🐍 | Publication-grade plots with Crameri maps |
| [`distinct-categorical-colors.py`](recipes/python/distinct-categorical-colors.py) | 🐍 | N maximally-distinguishable categorical colors |
| [`oklch-brand-scale.css`](recipes/css/oklch-brand-scale.css) | CSS | Copy-paste OKLCH token scale (50→950) |
| [`mesh-gradient.css`](recipes/css/mesh-gradient.css) | CSS | Buttery mesh gradient, zero images |
| [`shadcn-theme-tokens.css`](recipes/css/shadcn-theme-tokens.css) | CSS | Complete shadcn-style semantic tokens in OKLCH |

## 🎮 Live Playground

[`web/index.html`](web/index.html) is a **single self-contained file** — no build, no npm, no framework:

- 🎲 Palette generator (analogic / complement / triadic / monochrome, click-to-copy swatches)
- ♿ WCAG contrast checker with live AA/AAA verdicts
- 🌈 Six perceptual gradient cards with copy-CSS buttons
- 🤖 Cards linking to every agent skill

| | |
|---|---|
| <img src="assets/playground-hero.png" alt="Chroma Forge playground — palette generator and contrast checker" width="100%" /> | <img src="assets/playground-full.png" alt="Full Chroma Forge playground page" width="100%" /> |

**Deploy your own copy free:** repo **Settings → Pages → Source: GitHub Actions** → the included [workflow](.github/workflows/pages.yml) publishes it automatically. ⚡ Or just open `web/index.html` locally — it works offline.

## ⭐ Rating Legend

| Stars | Meaning |
|---|---|
| ★★★★★ | Must-know. Industry standard. Start here. |
| ★★★★ | Excellent — best-in-class for its niche |
| ★★★ | Solid — great for specific scenarios |
| ★★ | Situational / legacy but useful |
| ★ | Historical or niche, listed for completeness |

<details>
<summary><b>🏗️ Repo map</b></summary>

```text
chroma-forge/
├── README.md                 ← you are here
├── docs/                     ← 16 deep-dive guides (The Vault)
├── skills/                   ← 6 AI-agent skills (SKILL.md format)
├── mcp/                      ← MCP registry + working example server
├── recipes/                  ← javascript/ · python/ · css/
├── web/                      ← zero-dependency live playground
├── assets/                   ← animated banner · playground screenshots
└── .github/                  ← templates, funding, Pages workflow
```
</details>

## 🗺️ Roadmap

- [x] **v1.0** — The Vault (16 guides) · 6 agent skills · MCP starter · 9 recipes · playground
- [ ] **v1.1** — 6 more skills: `cvd-simulator`, `print-matcher`, `token-linter`, `theme-migrator`, `brand-auditor`, `cultural-palette`
- [ ] **v1.2** — interactive colormap lab (WASM) & CVD-simulated playground toggle
- [ ] **v1.3** — community resource-of-the-month vote + auto link-checker CI

## 🤝 Contributing

PRs are extremely welcome — adding a resource takes 2 minutes. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the format (one table row + one catalog entry + a verified link), the rating rules, and how to propose a new skill. Be excellent to each other — see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## 📄 License

[MIT](./LICENSE) — free forever, for humans and agents alike.

## 💖 Acknowledgements

Standing on the shoulders of giants: **Björn Ottosson** (OKLab/OKLCH), **Myndex** (APCA), **Fabio Crameri** (scientific colormaps), **Cynthia Brewer** (ColorBrewer), the maintainers of **culori, colorjs.io, chroma.js, coloraide**, the **Catppuccin / Nord / Dracula / Rosé Pine** theme teams, **Lospec**, and every palette nerd who ever argued about gray dead-zones.

## ⭐ Star History

<a href="https://star-history.com/#izynu/chroma-forge&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=izynu/chroma-forge&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=izynu/chroma-forge&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=izynu/chroma-forge&type=Date" />
 </picture>
</a>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=110&color=0:f97316,50:ec4899,100:22c55e&section=footer" alt="wave divider" width="100%" />

**🔥 CHROMA FORGE** — forged for humans, tuned for agents.

Made with ⚡ by **[Zynu](https://github.com/izynu)** · *200+ tabs closed forever*

</div>
