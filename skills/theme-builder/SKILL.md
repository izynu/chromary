---
name: theme-builder
description: Build a complete, production-ready app theme from a single seed color or brand asset. Produces a Tailwind-style 50-950 scale plus semantic shadcn/ui tokens (light & dark), states, and chart colors. Use when the user asks for a theme, design tokens, CSS variables, or to turn one color into a full design system.
---

# 🏗️ Theme Builder

One seed color in → a complete, accessible, copy-paste theme out: OKLCH scale + semantic tokens for light & dark.

## When to use
- "Make me a theme from #7C3AED" / "turn our brand color into design tokens"
- "shadcn theme" / "Tailwind palette" / "CSS variables for our app"
- Rebranding: old color → new full token set

## Workflow
1. **Normalize the seed** into OKLCH `(L, C, h)`. Discard RGB thinking from here on.
2. **Build the 50–950 scale** (11 steps) with these anchors, interpolating `L` linearly and shaping `C` as a bell (low at extremes, peak around 500–600):
   - `50  = L 0.975, C 0.015` · `100 = 0.95, 0.03` · `200 = 0.90, 0.06` · `300 = 0.82, 0.10`
   - `400 = 0.71, C_peak·0.85` · `500 = 0.63, C_peak` · `600 = 0.55, C_peak·0.95` · `700 = 0.47, 0.85·C_peak`
   - `800 = 0.38, 0.7·C_peak` · `900 = 0.30, 0.55·C_peak` · `950 = 0.21, 0.4·C_peak`
   - `C_peak`: muted 0.09 · balanced 0.13 · vivid 0.18. Cap by hue (yellows need less, blues tolerate more).
3. **Derive semantic tokens** (shadcn-style) for **light** and **dark**:
   `background, foreground, card, muted, muted-foreground, primary, primary-foreground, secondary, accent, destructive, border, input, ring`.
   - Dark mode is NOT inversion: keep `h`, raise chroma slightly (+10–20%), and re-derive lightness so every text pair re-passes WCAG.
4. **Define states** without new colors:
   - hover: `color-mix(in oklab, var(--primary) 90%, black)` · active: 80% · subtle bg: `…85%, white)`.
5. **Chart palette**: primary ± hue rotations (60°/120°/240°/300°), equal `L 0.62–0.68`, then CVD-check that adjacent series differ in lightness too.
6. **Run the gates** (below). Adjust, don't apologize.
7. **Emit** `theme.css` in the output format.

## Hard gates
- Every `*-foreground` on its partner: ≥ 4.5:1 (WCAG 2.1). If APCA tooling exists: Lc ≥ 75 for body.
- `ring` must hit ≥ 3:1 against both `background` and adjacent surfaces (focus visibility).
- Scale steps must be monotonic in L (verify by eye or by sort).
- Light `background` ≥ 0.97 L; dark `background` ≤ 0.17 L — no muddy mid-gray apps.
- Never use pure black (#000) or pure white (#fff) for text/surfaces; stay ≥ 0.04 chroma away from sterile.

## Output format
One CSS block, ordered exactly like the [reference recipe](../../recipes/css/shadcn-theme-tokens.css):

```css
:root {
  --background: oklch(98.5% 0.008 300);
  --foreground: oklch(22% 0.03 300);
  --primary: oklch(55% 0.2 300);
  /* …all semantic tokens… */
}
.dark { /* same token names, dark values */ }
/* + Tailwind: @theme inline { --color-brand-500: …; } */
```

Then a compact table mapping `50→950` steps → hex, and the 3 verified pairs with ratios.

## Example
Seed `#7C3AED` → `oklch(53% 0.24 295)` → C_peak 0.24 is too hot for UI; cap at 0.18 → scale emitted with `--primary: oklch(55% 0.18 295)`, dark primary `oklch(68% 0.17 295)`, `primary-foreground` fixed at `oklch(15% 0.04 295)` → 8.1:1 ✓.

---
*Part of [🎨 Chromary](../../README.md) · deep dives: [05 · Design systems](../../docs/05-design-systems-and-scales.md) · [03 · OKLCH](../../docs/03-perceptual-color-spaces.md)*
