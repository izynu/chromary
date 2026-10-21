<div align="center">

<!  Chromary · maintained by @izynu (Zynu) · MIT >

<img src="assets/banneranimated.svg" alt="Chromary animated banner. The most complete color engineering toolkit for humans, designers and AI agents." width="100%" />

# CHROMARY

<a href="https://github.com/izynu/chromary/actions/workflows/pages.yml"><img src="https://github.com/izynu/chromary/actions/workflows/pages.yml/badge.svg" alt="Playground deploy status" /></a>

<img src="https://readmetypingsvg.demolab.com?font=JetBrains+Mono&weight=700&size=20&duration=2800&pause=900&color=E8ECF4&center=true&vCenter=true&width=790&height=60&lines=The+most+complete+color+engineering+toolkit+on+GitHub;200%2B+resources+%C2%B7+16+deep+dive+guides+%C2%B7+9+recipes;6+AI+agent+skills+%C2%B7+MCP+server+%C2%B7+live+playground;Built+for+humans%2C+tuned+for+agents" alt="Animated tagline: the most complete color engineering toolkit on GitHub" />

[![License: MIT](https://img.shields.io/badge/LicenseMIT225C48?style=flatsquare)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/izynu/chromary?style=flatsquare&color=C85B43&logo=github)](https://github.com/izynu/chromary/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRswelcome225C48?style=flatsquare)](./CONTRIBUTING.md)
[![Resources](https://img.shields.io/badge/resources200%2B225C48?style=flatsquare)](#thevault16deepdiveguides)
[![Agent Skills](https://img.shields.io/badge/agent_skills6225C48?style=flatsquare)](./skills)
[![MCP Ready](https://img.shields.io/badge/MCP ready225C48?style=flatsquare)](./mcp)

**[Quickstart](#30secondquickstart) · [Task Router](#findwhatyouneedin5seconds) · [The Vault](#thevault16deepdiveguides) · [Skills](#aiagentskills) · [MCP](#mcpmodelcontextprotocol) · [Playground](#liveplayground)**

</div>



> ### One repo to rule every color decision.
> **No more 40 tab chaos.** Chromary fuses the entire color universe (APIs, perceptual color spaces, WCAG/APCA accessibility math, scientific colormaps, design system scales, AI palette generators, MCP servers) into **16 deep dive guides**, **6 installable AI agent skills**, and a **live playground**. Your AI agent becomes a color engineer; you become unreasonably fast at color.

| | | |
|::|::|::|
| **Curated & opinionated** | **Agent ready** | **Actually runnable** |
| 200+ hand picked resources, star rated with TL;DR tables and pitfalls in every guide | Drop in `SKILL.md` skills + a working MCP server, agents don't memorize hex codes, they *compute* them | 9 copy paste recipes + a zero dependency playground. Every snippet tested, every claim sourced |

## 30Second Quickstart

### Humans: just browse
Open [The Vault](#thevault16deepdiveguides) → pick a guide → use its **TL;DR** table. Five minutes, done.

### AI agents: install the skills
```bash
git clone https://github.com/izynu/chromary.git
mkdir p .claude/skills
cp r chromary/skills/* .claude/skills/
```
Works with Claude Code, Cursor, Windsurf and any `SKILL.md` aware runtime. Global install: `~/.claude/skills/` instead.

### MCP: give your agent live color tools
```bash
cd chromary/mcp/examplecolorserver
bun install && bun run index.ts
```

### Developers: steal a recipe
```js
// recipes/javascript/perceptualscale.js: a Tailwind grade OKLCH scale in ~10 lines
import { oklch, formatHex } from "culori";
```

## Find what you need in 5 seconds

| I want to… | Go here | Invoke this skill |
||||
| Pick a palette that *just works* | [08 · AI palette generation](docs/08aipalettegeneration.md) | `palettegenerator` |
| Make my UI pass WCAG & APCA | [04 · Accessibility & contrast](docs/04accessibilitycontrast.md) | `contrastauditor` |
| Build a Tailwind / shadcn theme | [05 · Design systems & scales](docs/05designsystemsandscales.md) | `themebuilder` |
| Chart scientific data correctly | [06 · Dataviz colormaps](docs/06datavisualizationcolormaps.md) | `datavizcolormaps` |
| Make buttery, nevergray gradients | [07 · CSS gradients](docs/07cssgradients.md) | `gradientsmith` |
| Extract colors from a logo/image | [10 · Image color extraction](docs/10imagecolorextraction.md) | `imagepalette` |
| Wire color tools into an AI agent | [mcp/](./mcp) + [02 · Agent skills](docs/02aiagentskills.md) | |
| Finally understand OKLCH | [03 · Perceptual color spaces](docs/03perceptualcolorspaces.md) | |
| Match a Pantone / RAL color | [12 · Print & physical standards](docs/12printandphysicalstandards.md) | |
| Nail a pixelart palette | [14 · Game & pixel palettes](docs/14gameandpixelpalettes.md) | |
| Choose a color library | [11 · Libraries & SDKs](docs/11librariesandsdks.md) | |
| Read the actual color science | [13 · Science & standards](docs/13colorscienceandstandards.md) | |
| Skim the vocabulary | [16 · Glossary](docs/16glossary.md) | |

## The Vault: 16 deep dive guides

| # | Guide | What's inside |
||||
| 01 | [REST APIs & MCP](docs/01restapisandmcp.md) | The Color API, color.pizza, Colormind, APIVerve, xcolors + MCP in 2 minutes |
| 02 | [AI Agent Skills](docs/02aiagentskills.md) | The open SKILL.md format, progressive disclosure, writing skills agents actually use |
| 03 | [Perceptual Color Spaces](docs/03perceptualcolorspaces.md) | OKLCH/OKLab, CIE Lab/LCH, HSLuv, HCT, CAM16, gamut mapping |
| 04 | [Accessibility & Contrast](docs/04accessibilitycontrast.md) | WCAG 2.1 math, APCA/WCAG 3, color blind simulation, autofix strategies |
| 05 | [Design Systems & Scales](docs/05designsystemsandscales.md) | Tailwind 50 to 950, Radix 12step, shadcn tokens, Material 3 HCT, 10 enterprise systems |
| 06 | [DataViz Colormaps](docs/06datavisualizationcolormaps.md) | viridis, Crameri scientific maps, ColorBrewer, iwanthue, when jet attacks |
| 07 | [CSS Gradients](docs/07cssgradients.md) | Perceptual interpolation in OKLab, mesh gradients, grainy overlays, shader gradients |
| 08 | [AI Palette Generation](docs/08aipalettegeneration.md) | Huemint, Khroma, Colormind, ColorMagic + LLM prompting patterns that respect contrast |
| 09 | [Inspiration, Culture & Themes](docs/09inspirationcultureandthemes.md) | Brand colors, Japanese & Chinese traditional palettes, dev themes (Catppuccin, Nord…) |
| 10 | [Image Color Extraction](docs/10imagecolorextraction.md) | Color Thief, Vibrant, fastaveragecolor, kmeans recipes |
| 11 | [Libraries & SDKs](docs/11librariesandsdks.md) | culori, colorjs.io, chroma.js, colord · coloraide, colourscience · palette, gocolorful |
| 12 | [Print & Physical Standards](docs/12printandphysicalstandards.md) | Pantone, RAL, NCS, Coloro, Munsell, CMYK workflows |
| 13 | [Color Science & Standards](docs/13colorscienceandstandards.md) | CIE, ICC, ΔE2000, CSS Color 4/5, the papers worth reading |
| 14 | [Game & Pixel Palettes](docs/14gameandpixelpalettes.md) | Lospec, PICO8, Sweetie 16, ENDESGA, dithering |
| 15 | [Tool Selection Matrix](docs/15toolselectionmatrix.md) | One giant table: task → first choice → alternative → skill → guide |
| 16 | [Glossary](docs/16glossary.md) | Hue, chroma, gamut, metamerism, ΔE, Lc, everything in plain English |

## The Mount Rushmore: if you only click 5 links

| # | Resource | Why it earns a face |
||||
| 1 | [The Color API](https://www.thecolorapi.com) | Palettes + naming + conversions over one free GET, the workhorse of the whole repo |
| 2 | [oklch.com](https://oklch.com) | The interactive OKLCH editor that permanently upgrades how you think about color |
| 3 | [`apcaw3`](https://www.npmjs.com/package/apcaw3) | The WCAG 3 contrast math your dark mode has been begging for |
| 4 | [Crameri scientific colour maps](https://www.fabiocrameri.ch/colourmaps/) | Perceptually uniform, CVD safe, citation ready, reviewers will thank you |
| 5 | [Huemint](https://huemint.com) | ML palettes constrained by real layouts, generate colors that fit *your* design |

## AI Agent Skills

Each skill is a folder with a `SKILL.md` in the open agent skills format: YAML frontmatter (`name` + `description`) plus battle tested instructions with **hard gates** the agent may never skip. Agents read the `description` to decide *when* to load the skill, so just ask naturally.

| Skill | Fire it when the user says… |
|||
| [`palettegenerator`](skills/palettegenerator/SKILL.md) | "give me a palette", "brand colors", "colors that match #0EA5A0" |
| [`contrastauditor`](skills/contrastauditor/SKILL.md) | "is this accessible?", "fix this contrast", "WCAG check" |
| [`themebuilder`](skills/themebuilder/SKILL.md) | "build me a shadcn/tailwind theme from this color" |
| [`datavizcolormaps`](skills/datavizcolormaps/SKILL.md) | "which colormap for my heatmap?", "CVD safe chart colors" |
| [`gradientsmith`](skills/gradientsmith/SKILL.md) | "make a gradient", "why is my gradient gray in the middle?" |
| [`imagepalette`](skills/imagepalette/SKILL.md) | "extract colors from this logo/screenshot" |

<details>
<summary><b>Install commands</b></summary>

```bash
# perproject (recommended, versioned with your repo)
mkdir p .claude/skills && cp r skills/* .claude/skills/

# global for every project
mkdir p ~/.claude/skills && cp r skills/* ~/.claude/skills/
```

> **Anatomy of a good skill description:** * what it does* + *when to use it* + trigger keywords. That single line decides whether your agent finds it.
</details>

## MCP: Model Context Protocol

Give agents *live* color capabilities instead of memorized hex codes.

| Resource | What it does |
|||
| [MCP registry & setup guide](mcp/README.md) | Curated color MCP servers + copy paste configs for Claude Desktop, Cursor & VS Code |
| [`examplecolorserver`](mcp/examplecolorserver/index.ts) | Working starter MCP server (TypeScript, runs with Bun): `generate_palette` + `color_info` tools powered by The Color API |

```jsonc
// claude_desktop_config.json / .cursor/mcp.json
{
  "mcpServers": {
    "chromary": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/chromary/mcp/examplecolorserver/index.ts"]
    }
  }
}
```

## Recipes

| Recipe | Lang | Superpower |
||||
| [`perceptualscale.js`](recipes/javascript/perceptualscale.js) | JS | Tailwind style 50 to 950 scale from one hue, in OKLCH |
| [`wcagapcacontrast.js`](recipes/javascript/wcagapcacontrast.js) | JS | WCAG ratio + APCA Lc in one file |
| [`gradientinterpolation.js`](recipes/javascript/gradientinterpolation.js) | JS | Gray free ramps interpolated in OKLab |
| [`imagepalette.js`](recipes/javascript/imagepalette.js) | JS | Extract a role based palette from any image |
| [`scientificcolormaps.py`](recipes/python/scientificcolormaps.py) | PY | Publication grade plots with Crameri maps |
| [`distinctcategoricalcolors.py`](recipes/python/distinctcategoricalcolors.py) | PY | N maximally distinguishable categorical colors |
| [`oklchbrandscale.css`](recipes/css/oklchbrandscale.css) | CSS | Copy paste OKLCH token scale (50→950) |
| [`meshgradient.css`](recipes/css/meshgradient.css) | CSS | Buttery mesh gradient, zero images |
| [`shadcnthemetokens.css`](recipes/css/shadcnthemetokens.css) | CSS | Complete shadcn style semantic tokens in OKLCH |

## Live Playground

The Pages site opens on a **warm paper landing page**, [`web/index.html`](web/index.html): hero, the example UI palette the skill outputs, the Vault, recipes, examples and install steps.

The interactive tools live in the **Chroma Lab** at [`web/lab.html`](web/lab.html), a **single self contained file** (no build, no npm, no framework):

 Palette generator (analogic / complement / triadic / monochrome, click to copy swatches)
 WCAG contrast checker with live AA/AAA verdicts
 Six perceptual gradient cards with copyCSS buttons
 Cards linking to every agent skill

| | |
|||
| <img src="assets/playgroundhero.png" alt="Chromary playground, palette generator and contrast checker" width="100%" /> | <img src="assets/playgroundfull.png" alt="Full Chromary playground page" width="100%" /> |

**Deploy your own copy free:** repo **Settings → Pages → Source: GitHub Actions** → the included [workflow](.github/workflows/pages.yml) publishes it automatically. Or just open `web/index.html` locally, it works offline.

## Rating Legend

| Stars | Meaning |
|||
| ★★★★★ | Mustknow. Industry standard. Start here. |
| ★★★★ | Excellent, best in class for its niche |
| ★★★ | Solid, great for specific scenarios |
| ★★ | Situational / legacy but useful |
| ★ | Historical or niche, listed for completeness |

<details>
<summary><b>Repo map</b></summary>

```text
chromary/
├── README.md                 ← you are here
├── docs/                     ← 16 deep dive guides (The Vault)
├── skills/                   ← 6 AI agent skills (SKILL.md format)
├── mcp/                      ← MCP registry + working example server
├── recipes/                  ← javascript/ · python/ · css/
├── web/                      ← landing page + zero dependency Chroma Lab (lab.html)
├── assets/                   ← animated banner · playground screenshots
└── .github/                  ← templates, funding, Pages workflow
```
</details>

## Roadmap

 [x] **v1.0**: The Vault (16 guides), 6 agent skills, MCP starter, 9 recipes, playground
 [ ] **v1.1** adds 6 skills: `cvdsimulator`, `printmatcher`, `tokenlinter`, `thememigrator`, `brandauditor`, `culturalpalette`
 [ ] **v1.2**: interactive colormap lab (WASM) and CVDsimulated playground toggle
 [ ] **v1.3**: community resource of the month vote + auto link checker CI

## Contributing

PRs are extremely welcome: adding a resource takes 2 minutes. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the format (one table row + one catalog entry + a verified link), the rating rules, and how to propose a new skill. Be excellent to each other. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

[MIT](./LICENSE). Free forever, for humans and agents alike.

## Acknowledgements

Standing on the shoulders of giants: **Björn Ottosson** (OKLab/OKLCH), **Myndex** (APCA), **Fabio Crameri** (scientific colormaps), **Cynthia Brewer** (ColorBrewer), the maintainers of **culori, colorjs.io, chroma.js, coloraide**, the **Catppuccin / Nord / Dracula / Rosé Pine** theme teams, **Lospec**, and every palette nerd who ever argued about gray dead zones.

## Star History

<a href="https://starhistory.com/#izynu/chromary&Date">
 <picture>
   <source media="(preferscolorscheme: dark)" srcset="https://api.starhistory.com/svg?repos=izynu/chromary&type=Date&theme=dark" />
   <source media="(preferscolorscheme: light)" srcset="https://api.starhistory.com/svg?repos=izynu/chromary&type=Date" />
   <img alt="Star History Chart" src="https://api.starhistory.com/svg?repos=izynu/chromary&type=Date" />
 </picture>
</a>



<div align="center">

<img src="https://capsulerender.vercel.app/api?type=waving&height=110&color=0:225C48,50:D9EF72,100:C85B43&section=footer" alt="wave divider" width="100%" />

**CHROMARY**, the armory of color. Built for humans, tuned for agents.

Made by **[Zynu](https://github.com/izynu)** · *200+ tabs closed forever*

</div>
