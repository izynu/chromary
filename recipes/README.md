# 🧪 Recipes

Nine battle-tested, copy-paste-ready snippets. Each uses **zero or one dependency** and includes its expected output as comments.

## The index

| Recipe | Lang | Dep | Superpower |
|---|---|---|---|
| [`javascript/perceptual-scale.js`](javascript/perceptual-scale.js) | JS | culori | Tailwind-style 50–950 brand scale from one hue, in OKLCH |
| [`javascript/wcag-apca-contrast.js`](javascript/wcag-apca-contrast.js) | JS | apca-w3 | WCAG 2.1 ratio + APCA Lc in one module |
| [`javascript/gradient-interpolation.js`](javascript/gradient-interpolation.js) | JS | culori | Gray-free ramps interpolated in OKLab (vs sRGB) |
| [`javascript/image-palette.js`](javascript/image-palette.js) | JS | node-vibrant | Role-based palette extraction from any image |
| [`python/scientific-colormaps.py`](python/scientific-colormaps.py) | 🐍 | cmcrameri | Publication-grade sequential/diverging/cyclic plots |
| [`python/distinct-categorical-colors.py`](python/distinct-categorical-colors.py) | 🐍 | distinctipy | N maximally-distinguishable categorical colors |
| [`css/oklch-brand-scale.css`](css/oklch-brand-scale.css) | CSS | — | Copy-paste OKLCH token scale (50→950) |
| [`css/mesh-gradient.css`](css/mesh-gradient.css) | CSS | — | Buttery mesh gradient, zero images |
| [`css/shadcn-theme-tokens.css`](css/shadcn-theme-tokens.css) | CSS | — | Complete shadcn-style semantic tokens in OKLCH |

## How to run

```bash
# JavaScript (ESM) — Bun runs it directly
bun add culori && bun run recipes/javascript/perceptual-scale.js

# Node 18+ also works: put `"type": "module"` in your package.json first

# Python
pip install matplotlib cmcrameri numpy
python recipes/python/scientific-colormaps.py

# CSS — paste into any stylesheet; oklch() works in all modern browsers
```

## Ground rules (why these recipes are trustworthy)

- Every JS recipe exports named functions **and** runs a demo under `main`-style guards.
- Every CSS recipe degrades gracefully (fallback colors where oklch() is unsupported).
- Contrast math is copied from the specs (WCAG 2.1 §1.4.3, APCA docs) — not vibes.

---
*Part of [🎨 Chromary](../README.md) — the ultimate color engineering toolkit.*
