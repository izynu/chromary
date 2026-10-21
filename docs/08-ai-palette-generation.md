# AI Palette Generation

> Let the machine draft a hundred palettes, then use OKLCH math and contrast gates to make the best one production safe.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|---|---|---|---|
| **Huemint** | ML palettes constrained by real mockups (website/graphic/brand) | Generates colors *in context* and lets you lock what works | ★★★★★ |
| **LLM + validation loop** | Prompt for hex + roles + OKLCH constraints, then verify with WCAG math | The pattern that turns any chat model into a color engineer | ★★★★★ |
| **Khroma** | A personal neural net trained on 50 of your choices | Infinite palettes that taste like *you* | ★★★★ |
| **Colormind** | Deep learning trained on photos, art & film | Uncanny real-world coherence; ships a free API | ★★★★ |
| **ColorMagic** | Prompt-to-palette generator | Fast mood → hex pipeline for exploring a brief | ★★★ |
| **AI Colors** | Prompt-to-palette generator | A quick second opinion on any brand prompt | ★★★ |

## Which generator when?

| Situation | Reach for |
|---|---|
| You have real content/layout already | Huemint, context-optimized |
| You know your taste, not the palette | Khroma, train once, generate forever |
| You want photographic/artistic coherence | Colormind |
| You're exploring a written brief | ColorMagic / AI Colors, prompt → palette |
| You have a reference image | Adobe Color extract (guide 09) → then Huemint |
| You need it inside an agent pipeline | Colormind API or LLM + the validation loop |

## The Catalog

### Huemint
- **What:** ML palette generator that renders candidate palettes *on a context*, a website mockup, a graphic, or a brand card, and optimizes them to work in place. Lock any color and regenerate the rest.
- **Why it's great:** Constraint based generation beats random pretty colors: a palette is only good if it survives contact with real layout. Huemint scores candidates against actual surfaces, so "pretty" and "works here" are the same objective.
- **Pro tip:** Start in brand mode, lock your primary, let it fill background/surface/accent slots, then run the exports through the pipeline below.
- **Link:** https://huemint.com

### Khroma
- **What:** Trains a personal neural network from 50 color choices you make, then generates infinite two-tone palettes tuned to your taste.
- **Why it's great:** It's taste-learning, not trend-sampling, output feels like a designer who knows you. Perfect for stubborn people with strong opinions.
- **Pro tip:** Train honestly (pick what you'd actually ship, not what looks shiny today). Save favorites as CSS ready hex pairs.
- **Link:** https://khroma.co

### Colormind
- **What:** Deep-learning palette generator trained on photos, art and film; five-color palettes with a lock feature, plus a free JSON API.
- **Why it's great:** Because it learned from *imagery*, its palettes have that impossible-to-fake lived-in coherence.
- **Pro tip:** `POST http://colormind.io/api/` with `{"model":"default"}` returns a 5-hex palette, wire it into scripts (more in [guide 01](01-rest-apis-and-mcp.md)).
- **Link:** https://www.colormind.io

### ColorMagic
- **What:** Prompt-to-palette: type a phrase ("cozy coffee shop brand") and get a keyword-matched palette with hexes.
- **Why it's great:** The fastest mood → hex pipeline; ideal for exploring a brief before committing to one direction.
- **Pro tip:** Treat its output as *direction*, then rebuild the winning palette on a proper lightness ladder (guide 05).
- **Link:** https://colormagic.app

### AI Colors
- **What:** A solid prompt-to-palette generator, describe the vibe, get a palette.
- **Why it's great:** A quick second opinion when two tools disagree about "trustworthy fintech blue".
- **Pro tip:** Run the same prompt through 2 to 3 generators: the overlap is signal, the outliers are noise.
- **Link:** https://aicolors.co

### LLM prompting patterns that actually work
- **What:** This repo's specialty: turn "give me a palette" into a *constrained spec* any chat model can satisfy, hex + roles, OKLCH limits, contrast gates, lightness ladder.
- **The four moves:** (1) ask for hex **+ roles** (background/surface/primary/accent/text); (2) demand **OKLCH constraints**, surfaces at C 0.08 to 0.15; (3) demand **contrast gates**, key pairs ≥ 4.5:1; (4) ask for a **lightness ladder 50→950**. Then validate.
- **Why it's great:** Unconstrained LLM hexes are pretty fiction, wrong contrast, clashing chroma, no ladder. Constraints plus validation turn fiction into tokens.
- **Pro tip:** Copy this prompt, then validate with the snippet below, never trust raw LLM hexes:

```text
You are a color engineer. Output JSON with hex + role:
{"background": "...", "surface": "...", "primary": "...", "accent": "...", "text": "..."}
Constraints:
1. Reason in OKLCH first, then convert to hex.
2. UI surfaces: chroma C between 0.08 and 0.15, never neon chrome.
3. Contrast gates: text/background and primary/background ≥ 4.5:1 (WCAG 2.1 AA).
4. Include a lightness ladder for primary from 50 → 950 (Tailwind style).
```

- **Link:** [the palette-generator skill](../skills/palette-generator/SKILL.md)

### The production pipeline (AI drafts, math finishes)
- **What:** Four deterministic steps after the AI hands over its draft:
  1. **Generate**, Huemint, Colormind, or the LLM prompt pattern above.
  2. **Normalize**, convert to OKLCH, clamp chroma, snap lightness (guide 03).
  3. **Validate**, run WCAG math on every text/primary/background pair (guide 04).
  4. **Extract tokens**, hand the survivors to the [theme-builder skill](../skills/theme-builder/SKILL.md) (guide 05).
- **Why it's great:** Every AI tool becomes safe once a deterministic gate sits behind it.
- **Pro tip:** Log the *normalized* palette, not the raw AI output, audits should see what actually shipped.
- **Link:** https://developer.mozilla.org/en-US/docs/Web/CSS/oklch

## Pitfalls

- **Never trust LLM hex blindly.** Models hallucinate contrast ratios and ship #777-on-#888 with total confidence. Validate with WCAG math, always.
- **Pretty ≠ role-correct.** A gorgeous 5-swatch palette is useless until every color has a job: background / surface / primary / accent / text.
- **Neon surfaces.** AI loves C > 0.2 chroma on UI chrome. Clamp surfaces to C 0.08 to 0.15 in OKLCH.
- **No ladder, no dark mode.** If the AI only gave you 5 hexes, demand the 50→950 ladder or your dark theme dies later.
- **Regenerating everything.** Huemint and Colormind both support locks, pin the brand color, vary the rest.
- **Taste-training debt.** Khroma learns what you click; clicking shiny garbage trains shiny garbage.

## Try it now

Validate an AI's hex suggestions with real WCAG math before they touch production:

```js
// npm i colorjs.io
import Color from 'colorjs.io';

const bg = '#0b1220';                                 // your real background
const llmSays = ['#4ade80', '#38bdf8', '#f472b6'];    // straight from the model

for (const hex of llmSays) {
  const ratio = Color.contrast(bg, hex, 'WCAG2');
  console.log(hex, ratio >= 4.5 ? ` ${ratio.toFixed(2)}:1, AA` : ` ${ratio.toFixed(2)}:1, reject or fix in OKLCH`);
}
```

## Related guides

- [01 · REST APIs & MCP](01-rest-apis-and-mcp.md), call Colormind & friends as agent tools
- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md), the OKLCH normalization step
- [04 · Accessibility & Contrast](04-accessibility-contrast.md), the validation gate that keeps AI honest
- [05 · Design Systems & Scales](05-design-systems-and-scales.md), where validated palettes become tokens

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
