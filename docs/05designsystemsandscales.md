# Design Systems & Scales

> From Tailwind's 11 steps to Radix's 12, shadcn tokens to Material 3 tones, how real design systems build color that survives dark mode.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|||||
| **Tailwind scale** | 11 steps, 50 → 950 | The defacto lingua franca of UI color steps | ★★★★★ |
| **Radix Colors** | 12 steps with separate text/bg/border roles | Autopaired light/dark steps, dark mode without guesswork | ★★★★★ |
| **shadcn/ui tokens** | Semantic CSS variables (`primary`, `muted`, `ring`…) | Rename roles, not components, theming becomes a variable swap | ★★★★★ |
| **Material 3 HCT** | Tonal palettes, tones 0 to 100 from a key color | One lightness axis makes dark mode arithmetic, not redesign | ★★★★ |
| **uicolors / tweakcn** | Scale & shadcn theme generators | Hex → full Tailwind scale; 10k+ shadcn themes to browse | ★★★★ |
| **GitHub Primer** | Enterprise reference system | The cleanest functionalvsdataviz color split to steal | ★★★★ |

 legend: ★★★★★ mustknow · ★★★★ excellent · ★★★ situational · ★ niche · ★ historical.

## The Catalog

### The 11step scale (the Tailwind model)
 **What:** Every color expressed as a ladder of 11 steps from `50` (nearwhite) to `950` (nearblack), with `500` ≈ the brand color itself.
 **Why it's great:** Steps create shared vocabulary, "use blue200" means the same thing in every codebase, and they force decisions into a system instead of hex roulette.
 **Band map:**

| Step | Typical job |
|||
| 50 | Page / section background tint |
| 100 | Hover backgrounds on tinted surfaces |
| 200 | Borders, dividers, subtle fills |
| 300 to 400 | Decorative accents, placeholders, charts |
| 500 to 600 | Buttons, links, primary fills (600 = 500's hover) |
| 700 | Hover state for a 600 button |
| 800 to 900 | Headings, strong text on light surfaces |

 **Pro tip:** Generate the ladder in OKLCH (walk L, hold C and h) so bandtoband jumps feel identical across every hue.
 **Link:** https://tailwindcss.com/docs/customizingcolors

### Radix Colors, the 12step insight
 **What:** A 12step scale per hue where each band of steps has a *job*: **1 to 2** app and subtle backgrounds, **3 to 5** component backgrounds, **6 to 8** borders, **9 to 10** solid fills, **11 to 12** text (low and highcontrast).
 **Why it's great:** Text needs different contrast than backgrounds, so Radix gives them *different steps*, and every step has a handtuned darkmode twin (step N pairs with step N in dark), so palettes flip cleanly. Whites and blacks are included in every set.
 **Pro tip:** Even if you ship Tailwind, adopt the *idea*: separate steps for text, background and border kills about 90% of darkmode bugs.
 **Link:** https://www.radixui.com/colors

### shadcn/ui semantic tokens
 **What:** Components reference **roles**, not colors: `background`, `foreground`, `card`, `popover`, `primary`, `primaryforeground`, `secondary`, `muted`, `mutedforeground`, `accent`, `destructive`, `border`, `input`, `ring`, all CSS variables, HSL by convention (OKLCH works fine).
 **Why it's great:** Every `*foreground` is contractually paired with its background, so contrast is designed into the token set. Themes are drop in variable swaps; components never change.
 **Pro tip:** Semantic > literal: `primary` survives a rebrand, `purple500` doesn't. Add `chart1…5` and sidebar tokens when your product needs them.
 **Link:** https://ui.shadcn.com

### Material 3, HCT tonal palettes
 **What:** Google's system: one **key color** expands into tonal palettes (primary, secondary, tertiary, neutral, neutralvariant) with **tones 0 to 100**, where tone = CIE L* lightness. Roles are assigned by tone, and **dynamic color** rederives the whole set from the user's wallpaper on Android 12+.
 **Why it's great:** A single axis, tone, governs light and dark alike. A theme becomes a tone remap, and contrast turns into arithmetic.
 **Pro tip:** Steal the model anywhere: seed color → tonal ramp → role assignment by tone band (text near tone 10, surfaces near 98).
 **Link:** https://m3.material.io/styles/color/system

### DaisyUI, semantic naming for Tailwind
 **What:** A Tailwind plugin with semantic color tokens: `primary`, `secondary`, `accent`, `neutral`, `base100/200/300`, plus `info`, `success`, `warning`, `error`.
 **Why it's great:** Bridges Tailwind's literal scale and shadcn style semantics with nearzero setup; recent versions ship OKLCH values and painless multitheme switching.
 **Pro tip:** The `info / success / warning / error` quartet doubles as a checklist, if your product has states, it needs all four, themed and contrastchecked.
 **Link:** https://daisyui.com

### Generators, skip the manual labor
 **uicolors.app**, paste one hex, get a full Tailwind ready 50→950 scale with config export. The fastest brandcolortosystem pipeline. https://uicolors.app
 **ui.jln.dev**, a browsable corpus of 10,000+ shadcn themes with live preview; copy the CSS variables of anything that looks right. https://ui.jln.dev
 **tweakcn**, a visual editor for shadcn themes: tweak tokens with instant component preview and export as CSS or Tailwind config. The fastest way to learn *why* a theme works. https://tweakcn.com
 **Pro tip:** Generate, then audit with [04 · Accessibility & Contrast](04accessibilitycontrast.md), generators optimize for aesthetics, not contrast.

### Enterprise systems, steal this
 **[IBM Carbon](https://carbondesignsystem.com)**, token infrastructure done right; steal the layered token JSON and precomputed accessible pairings.
 **[GitHub Primer](https://primer.style)**, the cleanest split of functional UI vs datavisualization color; steal role based naming.
 **[Shopify Polaris](https://polaris.shopify.com)**, color roles tied to meaning and state; steal the surface/elevation story.
 **[Adobe Spectrum](https://spectrum.adobe.com)**, an explicit visualweight scale (100 to 900, 600 as default); steal the weight axis for emphasis control.
 **[Atlassian Design System](https://atlassian.design)**, brand/marketing palettes kept apart from product/UI palettes; steal that separation.
 **[Ant Design](https://ant.design)**, algorithmic palette generation from one seed; steal "seed in, system out".
 **[Apple HIG](https://developer.apple.com/design/humaninterfaceguidelines/)**, system colors adapt to light/dark and increasedcontrast settings; steal semantic adaptivity.
 **[Microsoft Fluent 2](https://fluent2.microsoft.design)**, brand vs neutral palette separation and elevationdriven surfaces; steal the neutralfirst layering.
 **[AWS Cloudscape](https://cloudscape.design)**, tokenfirst with a published designtokens dictionary; steal the governance setup.
 **[Twilio Paste](https://paste.twilio.design)**, hue families documented by usage intent; steal the intentfirst docs.

## Pitfalls

 11 steps is a lightness ladder, not 11 hues, wild perstep hue shifts make bands feel unrelated.
 Using one step for text *and* background, their contrast needs differ; that's the entire Radix insight.
 Hardcoding hex in components, one rebrand later you're grepping 400 files. Semantic tokens only.
 Treating dark mode as inversion, rebuild via paired steps (Radix) or tone remapping (M3), or it's gray soup.
 Buttons need at least two steps: a resting and a hover (500/600, or 9/10 in Radix terms).
 A `purple` variable is not a semantic token, name by role (`primary`), never by color.

## Try it now

```css
/* shadcn style semantic tokens, but authored in OKLCH */
:root {
  background: oklch(98.5% 0.002 250);
  foreground: oklch(21% 0.006 250);
  primary: oklch(55% 0.19 264);
  primaryforeground: oklch(98% 0.003 250);
  muted: oklch(96% 0.003 250);
  mutedforeground: oklch(45% 0.02 250);
  ring: oklch(55% 0.19 264);
}
.dark {
  /* same names, new values, components never change */
  background: oklch(15% 0.004 250);
  foreground: oklch(93% 0.005 250);
  primary: oklch(70% 0.16 264);
  primaryforeground: oklch(15% 0.01 264);
}
```

## Related guides

 [03 · Perceptual Color Spaces](03perceptualcolorspaces.md), OKLCH is how you generate the ladders
 [04 · Accessibility & Contrast](04accessibilitycontrast.md), audit the tokens these systems emit
 [07 · CSS Gradients](07cssgradients.md), interpolating cleanly between scale steps
 [08 · AI Palette Generation](08aipalettegeneration.md), seed the generators with modelsuggested colors
 [09 · Inspiration, Culture & Themes](09inspirationcultureandthemes.md), finding the seed before building the system
 [02 · AI Agent Skills](02aiagentskills.md), the themebuilder skill operationalizes this guide


*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
