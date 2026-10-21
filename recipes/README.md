# Recipes

Nine battle tested, copy paste ready snippets. Each uses **zero or one dependency** and includes its expected output as comments.

## The index

| Recipe | Lang | Dep | Superpower |
|||||
| [`javascript/perceptualscale.js`](javascript/perceptualscale.js) | JS | culori | Tailwind style 50 to 950 brand scale from one hue, in OKLCH |
| [`javascript/wcagapcacontrast.js`](javascript/wcagapcacontrast.js) | JS | apcaw3 | WCAG 2.1 ratio + APCA Lc in one module |
| [`javascript/gradientinterpolation.js`](javascript/gradientinterpolation.js) | JS | culori | Gray free ramps interpolated in OKLab (vs sRGB) |
| [`javascript/imagepalette.js`](javascript/imagepalette.js) | JS | nodevibrant | Role based palette extraction from any image |
| [`python/scientificcolormaps.py`](python/scientificcolormaps.py) | | cmcrameri | Publication grade sequential/diverging/cyclic plots |
| [`python/distinctcategoricalcolors.py`](python/distinctcategoricalcolors.py) | | distinctipy | N maximallydistinguishable categorical colors |
| [`css/oklchbrandscale.css`](css/oklchbrandscale.css) | CSS | | Copy paste OKLCH token scale (50→950) |
| [`css/meshgradient.css`](css/meshgradient.css) | CSS | | Buttery mesh gradient, zero images |
| [`css/shadcnthemetokens.css`](css/shadcnthemetokens.css) | CSS | | Complete shadcn style semantic tokens in OKLCH |

## How to run

```bash
# JavaScript (ESM), Bun runs it directly
bun add culori && bun run recipes/javascript/perceptualscale.js

# Node 18+ also works: put `"type": "module"` in your package.json first

# Python
pip install matplotlib cmcrameri numpy
python recipes/python/scientificcolormaps.py

# CSS, paste into any stylesheet; oklch() works in all modern browsers
```

## Ground rules (why these recipes are trustworthy)

 Every JS recipe exports named functions **and** runs a demo under `main`style guards.
 Every CSS recipe degrades gracefully (fallback colors where oklch() is unsupported).
 Contrast math is copied from the specs (WCAG 2.1 §1.4.3, APCA docs), not vibes.


*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
