# Accessibility & Contrast

> WCAG math, APCA reality, and color blind simulation, everything needed to ship text humans can actually read.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|---|---|---|---|
| **WCAG 2.1 AA** | 4.5:1 normal text · 3:1 large text & UI components | The legal baseline for public-facing products | ★★★★★ |
| **APCA** | Perceptual contrast model (WCAG 3 candidate) | Font aware and correct in dark mode, where WCAG 2 math breaks | ★★★★★ |
| **whocanuse** | Contrast + CVD simulator driven by URL | `?bg=&fg=` links that show 8 vision types instantly | ★★★★★ |
| **OKLCH auto-fix** | Binary-search lightness, hue locked | The one algorithm that fixes contrast without changing brand | ★★★★ |
| **Polypane / Stark** | CVD simulation in dev browser / Figma | Check vision types where you already work | ★★★★ |
| **WCAG 1.4.1** | Never encode meaning by color alone | Cheap to satisfy, catastrophic to skip | ★★★★ |

 legend: ★★★★★ must-know · ★★★★ excellent · ★★★ situational · ★ niche · ★ historical.

## The Catalog

### WCAG 2.1 contrast, the law of the land
- **What:** Success criteria 1.4.3 (AA) and 1.4.6 (AAA), built on relative luminance and a contrast ratio. The math:

```text
Linearize sRGB:  c_lin = c / 12.92                    (c ≤ 0.03928, WCAG's constant)
                 c_lin = ((c + 0.055) / 1.055) ^ 2.4  otherwise
L       = 0.2126·R_lin + 0.7152·G_lin + 0.0722·B_lin
contrast = (L1 + 0.05) / (L2 + 0.05)                  → range 1 … 21
```

- **AA:** 4.5:1 for normal text; **3:1 for large text** (≥ 24 px, or ≥ 18.66 px bold) **and UI components**, icons, input borders, focus rings, chart strokes. **AAA:** 7:1 normal text, 4.5:1 large text.
- **Pro tip:** 4.5:1 is a floor for reading, not a design target. Aim 7:1+ for body copy and future-you in dark mode says thanks. (CSS Color 4 uses 0.04045 as the linearization knee, identical result for 8-bit color.)
- **Link:** https://www.w3.org/TR/WCAG21/ · https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

### APCA, the WCAG 3 candidate
- **What:** The Accessible Perceptual Contrast Algorithm (Myndex / Andrew Somers). Returns **Lc**, a lightness-contrast value that is direction aware (light-on-dark ≠ dark-on-light) and font-size/weight aware.
- **Why it beats WCAG 2:** WCAG 2's ratio math was tuned around black-on-white. It fails dark mode, blessing unreadable pairs and sinking fine ones, and it ignores that thin 12 px text needs more contrast than a bold 32 px headline.
- **Lc guidance:** ** Lc 75+** body text · **Lc 60+** large text and headings · **Lc 45+** fluent/secondary text (larger or bolder) · **Lc 30+** minimum for non-text elements (icons, disabled states, placeholders).
- **Pro tip:** The npm package `apca-w3` runs it in Node or the browser. Audit **both** WCAG 2 (compliance) and APCA (quality), they disagree, and APCA is usually right about *why*.
- **Link:** https://apcacontrast.com

### Color vision deficiency (CVD)
- **What:** Roughly **8% of men and 0.5% of women** have inherited color vision deficiency. **Protanopia** (missing L-cones, reds go dim), **deuteranopia** (missing M-cones, the most common red-green type), **tritanopia** (missing S-cones, blue-yellow; rare).
- **Simulation science:** Modern simulators descend from three papers: **Brettel 1997**, **Viénot 1999**, **Machado 2009**. Each models dichromatic vision differently, and their outputs diverge most in blue regions, that's why two simulators sometimes disagree.
- **Pro tip:** Simulation is an estimate, not an experience. Use it to *catch* failures (red/green pairs that collapse), not to claim you've "tested as colorblind".
- **Link:** https://en.wikipedia.org/wiki/Color_blindness

### whocanuse
- **What:** A contrast checker and CVD simulator in one page, driven entirely by URL: `https://whocanuse.com/?bg=264653&fg=e9c46a`.
- **Why it's great:** One shareable link shows the WCAG ratio, visual weight and 8 vision simulations side by side.
- **Pro tip:** URLs take hex **without** the `#`. Wire these links into CI failure messages so reviewers land straight in context.
- **Link:** https://whocanuse.com

### colourcontrast.ai
- **What:** A modern contrast checker showing WCAG and APCA scores together, with a live UI preview.
- **Why it's great:** Seeing both scores at once teaches the gap between "legal" and "readable" faster than any blog post.
- **Pro tip:** Use it during design review, not after build, swapping one token early beats redesigning a component later.
- **Link:** https://colourcontrast.ai

### Polypane
- **What:** A development browser with per-element contrast checks, CVD simulation and responsive debugging built in.
- **Why it's great:** Contrast stops being a separate QA step, you see failures while you code.
- **Pro tip:** Keep one pane locked in deuteranopia mode permanently; it's the cheapest empathy engine in front-end tooling.
- **Link:** https://polypane.app

### Stark (for Figma)
- **What:** The accessibility plugin suite for Figma (and friends): contrast checking, CVD simulation, focus order and more.
- **Why it's great:** Catches contrast problems where colors are *chosen*, roughly 10× cheaper than catching them in production.
- **Pro tip:** Run Stark on the tokens page, not on individual frames, fix the scale once instead of forty components.
- **Link:** https://www.getstark.co

### WCAG 1.4.1, Use of Color
- **What:** Color must never be the only visual means of conveying information, indicating an action, prompting a response, or distinguishing an element.
- **Why it matters:** Chart legends, form errors, diff views and status badges all collapse under deuteranopia when color carries meaning alone. Pair color with icons, text labels, patterns or position.
- **Pro tip:** Test by desaturating a screenshot, if meaning survives grayscale, 1.4.1 is satisfied.
- **Link:** https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html

### The auto-fix pattern, binary search in OKLCH
- **What:** When a pair fails, don't swap hues, nudge **lightness in OKLCH while holding hue and chroma**, binary-searching for the minimal passing L.
- **Why it's great:** Brand stays brand (hue untouched), the change is the smallest possible one, and it's ~15 lines of code (below).
- **Pro tip:** Fix against the *darkest* and *lightest* backgrounds the text can ever sit on, tokens must pass everywhere they're used, not just on white.
- **Link:** [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md)

## Pitfalls

- Treating 4.5:1 as "accessible", it's a floor for normal text; large UI needs 3:1, body copy deserves 7:1.
- Trusting WCAG 2 alone in dark mode, its math can bless unreadable gray-on-black; cross-check with APCA.
- `#777` on white, the most common failure on the web, and it misses AA at ≈ 4.48:1.
- Encoding meaning by color alone (red = error), collapses instantly under deuteranopia; pair color with icon + text.
- Auditing only against pure white/black, tokens live on tinted surfaces; check every real background pair.
- "Fixing" contrast by shifting hue, lightness-only adjustment preserves brand recognition; hue swaps don't.

## Try it now

```js
// npm i culori, binary-search the minimal OKLCH lightness that passes WCAG AA
import { parse, converter, formatHex } from 'culori';

const lum = (hex) => {
  const { r, g, b } = converter('rgb')(parse(hex));
  const lin = (c) => (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) **2.4;
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

export function fixAA(hex, bg = '#ffffff', target = 4.5) {
  if (ratio(lum(hex), lum(bg)) >= target) return hex;         // already passing
  const { l, c, h } = converter('oklch')(parse(hex));
  const at = (L) => formatHex({ mode: 'oklch', l: L, c, h }); // hue & chroma locked
  let lo = 0, hi = l, best = at(0);                           // black passes vs light bg
  for (let i = 0; i < 12; i++) {                              // 12 halvings ≈ ±0.0002 L
    const mid = (lo + hi) / 2;
    if (ratio(lum(at(mid)), lum(bg)) >= target) { best = at(mid); lo = mid; }
    else hi = mid;                                            // vs dark bg: search upward
  }
  return best;
}
```

## Related guides

- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md), OKLCH is what makes the auto-fix possible
- [05 · Design Systems & Scales](05-design-systems-and-scales.md), pre-checked text/background steps prevent most audits
- [06 · Data Visualization Colormaps](06-data-visualization-colormaps.md), CVD safe colormap selection
- [01 · REST APIs & MCP](01-rest-apis-and-mcp.md), expose contrast checks as agent-callable tools
- [02 · AI Agent Skills](02-ai-agent-skills.md), the contrast-auditor skill automates this whole guide
- [16 · Glossary](16-glossary.md), Lc, JND, luminance vs lightness

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
