# 📊 Data-Viz Colormaps

> Colormaps are a language — pick the one that says what your data actually means, and never let jet speak for you again.

**[⬅ Back to Index](../README.md)**

## 🏆 TL;DR — Top Picks

| Pick | What | Why it wins | ⭐ |
|---|---|---|---|
| **viridis family** | matplotlib's perceptually uniform defaults: `viridis`, `magma`, `plasma`, `inferno`, `cividis` | Uniform lightness, CVD-safe, degrades gracefully to grayscale — the default since matplotlib 2.0 | ★★★★★ |
| **Crameri Scientific Colour Maps** | Peer-reviewed maps (`batlow`, `vik`, `berlin`, `tofino`…) as the `cmcrameri` Python package | The scientific gold standard — perceptually uniform, perceptually ordered, and citable in your paper | ★★★★★ |
| **ColorBrewer 2.0** | Cynthia Brewer's prebuilt print-safe & colorblind-safe palettes | Choose by number of classes + data type; 20+ years of cartographic research in one page | ★★★★★ |
| **iwanthue** | CIE Lab k-means generator for N maximally distinct categorical colors | Filter by hue, chroma and lightness, get N distinct swatches in seconds | ★★★★ |
| **colorcet** | Bokeh/Anaconda's library of perceptually uniform maps for huge value ranges | Where viridis runs out of resolution, colorcet keeps every step visible | ★★★★ |
| **jet / rainbow** | The default colormap of a previous century | Optical illusions, fake boundaries, CVD chaos — banned in this repo | ★ |

## 🧭 The 4 colormap classes — match the map to the data

| Class | Use when… | Start with |
|---|---|---|
| **Sequential** | Low → high magnitude: temperature, density, income. Lightness moves one way. | `viridis`, `magma`, `batlow` |
| **Diverging** | A meaningful midpoint exists and deviations in both directions matter: anomalies, correlations, forecasts vs. actuals. | `vik`, `berlin`, ColorBrewer `RdBu` |
| **Categorical / qualitative** | Labels, not numbers. Every class equally distinct, none ranks higher. | ColorBrewer `Set2`, iwanthue, `distinctipy` |
| **Cyclic** | Data wraps around: hue angles, wind direction, time of day. | Crameri `romaO`/`brocO`, colorcet cyclic maps |

> Rule of thumb: **if the map's lightness doesn't track the data's lightness, the viewer's brain gets lied to.**

## 📖 The Catalog

### viridis family (the matplotlib defaults)
- **What:** Five perceptually uniform maps — `viridis`, `plasma`, `inferno`, `magma`, `cividis` — introduced as matplotlib's defaults in v2.0.
- **Why it's great:** Monotonic lightness means your chart reads correctly in grayscale, on bad projectors, and for the ~8% of men with color-vision deficiency. `cividis` was optimized so viewers with red-green *and* blue-yellow deficiencies read the same ordering.
- **Pro tip:** Dark backgrounds → `magma`/`inferno` pop; print → `viridis`/`cividis` keep order. `jet` is the retired default — treat it as a historical reenactment.
- **Link:** https://matplotlib.org/stable/users/explain/colors/colormaps.html

### Fabio Crameri's Scientific Colour Maps (`cmcrameri`)
- **What:** A curated, peer-reviewed collection — `batlow`, `vik`, `berlin`, `tofino`, `lajolla`, `oleron`, `devon`, cyclic `romaO`/`brocO` and dozens more. Python via `pip install cmcrameri`.
- **Why it's great:** Built to end colormap misuse in science: defined perceptual properties, consistent lightness ordering, and a formal citation for each map. `batlow` is a gorgeous general sequential; `vik`/`berlin`/`tofino` nail diverging data.
- **Pro tip:** Read and cite **Crameri, Shephard & Heron (2020), "The misuse of colour in science communication", *Nature Communications*** — the paper that retired rainbow maps in geoscience.
- **Link:** https://www.fabiocrameri.ch/colourmaps/

### ColorBrewer 2.0
- **What:** Cynthia Brewer's classic selector: prebuilt palettes for sequential, diverging and qualitative data, filterable by number of classes, colorblind-safety and print friendliness.
- **Why it's great:** Every scheme is designed for real cartography constraints — including photocopying and low-quality print. The hexes are baked into virtually every viz library on earth.
- **Pro tip:** Pick the number of classes *first*, then the data type — the tool re-orders palettes so lightness order matches class order automatically.
- **Link:** https://colorbrewer2.org

### colorcet
- **What:** Peter Kovesi's enormous library of uniformly perceptual colormaps, maintained by Anaconda/Bokeh (Python: `pip install colorcet`).
- **Why it's great:** Uniformity *across the entire range* — designed for dense, high-dynamic-range data where standard maps compress too much information into too few distinguishable steps.
- **Pro tip:** `cc.cm.fire` (a perceptual black-body ramp) and the linear-lightness `kr`/`bgyw` maps are fan favorites for big scatter clouds.
- **Link:** https://colorcet.holoviz.org

### cmocean
- **What:** Oceanography-tuned sequential and diverging maps with intuitive names: `thermal`, `haline`, `solar`, `ice`, `balance`, `tempo`…
- **Why it's great:** Each map is colorblind-safe and name-encodes its variable (salinity = `haline`!), with lightness that always reads "more = darker".
- **Pro tip:** Steal the naming trick even on land: match variables to maps whose associations align (temperature → `thermal`, brightness → `solar`).
- **Link:** https://matplotlib.org/cmocean/

### D3 scale-chromatic
- **What:** The web-native colormap source: `d3.interpolateViridis`, `d3.interpolateInferno`, `d3.schemeSet2`, `d3.schemeTableau10` and the rest of the family.
- **Why it's great:** Battle-tested in thousands of dashboards, tree-shakeable, and pairs perfectly with `d3-scale` for continuous → color mapping.
- **Pro tip:** `d3.interpolateRgbBasis([...])` lets you roll a custom piecewise ramp from ColorBrewer hexes in one line.
- **Link:** https://d3js.org/d3-scale-chromatic

### iwanthue
- **What:** The Médialab (Sciences Po) generator: k-means clustering in CIE Lab space producing N maximally distinct categorical colors, with hue/chroma/lightness filters and preset "colorspaces" (pastel, oily, pimp…).
- **Why it's great:** The only tool here designed around the exact problem "I need 11 mutually distinct, brand-safe category colors" — and it respects your constraints while solving it.
- **Pro tip:** Constrain lightness (e.g. 35–80%) so every category carries equal visual weight, then order the output yourself before presenting.
- **Link:** https://medialab.github.io/iwanthue/

### distinctipy
- **What:** Tiny Python library that generates N colors as visually distinct from each other — *and from a background* — as possible.
- **Why it's great:** When categorical safety beats aesthetics (annotation boxes, segmentation overlays), distinctipy just maximizes ΔE between everything.
- **Pro tip:** Feed it an exclude list of brand colors so nothing collides with your primary.
- **Link:** https://github.com/alan-turing-institute/distinctipy

### Turbo — the least-bad rainbow
- **What:** Google's 2019 rehabilitation of the rainbow: the jet hue circle re-engineered with a fixed, monotonic lightness ordering.
- **Why it's great:** Some audiences *expect* rainbow physics (radar, elevation, legacy dashboards) — Turbo delivers the rainbow look without jet's lightness chaos and fake detail.
- **Pro tip:** It's still a rainbow: reserve it for data where rainbow is the genre, and pair it with a grayscale-ordered legend so magnitude stays readable.
- **Link:** https://research.google/blog/turbo-an-improved-rainbow-colormap-for-visualization/

### seaborn palettes (cubehelix & husl)
- **What:** Seaborn's palette layer: `cubehelix_palette` (a print-safe sequential spiral), `husl_palette` (evenly perceptual hues), and one-liner access to viridis and ColorBrewer sets.
- **Why it's great:** Cubehelix was engineered to survive grayscale printing *and* color-vision deficiency — still the sleeper pick for print publications.
- **Pro tip:** `sns.color_palette("husl", 8)` is a decent zero-thought categorical starter when iwanthue isn't handy.
- **Link:** https://seaborn.pydata.org/tutorial/color_palettes.html

## ⚠️ Pitfalls

- **Jet/rainbow lies.** Borland & Taylor's *"Rainbow Color Map (Still) Considered Harmful"* says it all: rainbow banding invents boundaries that don't exist and hides real ones. If you truly must rainbow, Turbo is the least-bad rainbow.
- **Rainbow illusions.** Even "pretty" maps fabricate structure — hue reversals mid-ramp get mistaken for data features. Always check your map in grayscale.
- **Unsorted categorical colors.** A qualitative palette ordered by raw hue (not by lightness/saturation rhythm) looks random. Sort your classes, or cluster in Lab like iwanthue does.
- **Diverging data on a sequential map.** Forecast −5°…+5° plotted on `viridis` makes ±5° look "most" instead of "least" interesting. Use diverging maps with a light midpoint.
- **Too many classes.** Beyond ~8–9 categorical colors, humans can't reliably match legend → series. Collapse categories or use small multiples.
- **Uniform ≠ always right.** Perceptually uniform ramps are for *magnitude*; for categorical *identity*, equal lightness matters more than smoothness.

## 🧪 Try it now

Publication-grade plotting in three lines — Crameri's maps through matplotlib's API:

```python
# pip install matplotlib cmcrameri
import matplotlib.pyplot as plt
from cmcrameri import cm
plt.imshow([[0, 10, 20], [30, 40, 50]], cmap=cm.batlow); plt.colorbar(); plt.show()
```

## 🔗 Related guides

- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md) — OKLab/CIE Lab are *why* uniform maps exist
- [04 · Accessibility & Contrast](04-accessibility-contrast.md) — simulate color-vision deficiency before you publish
- [05 · Design Systems & Scales](05-design-systems-and-scales.md) — turn chart colors into shared tokens
- [11 · Libraries & SDKs](11-libraries-and-sdks.md) — chroma.js & culori build custom uniform ramps
- [15 · Tool Selection Matrix](15-tool-selection-matrix.md) — "which colormap?" answered in one row

---
*Part of [🔥 Chroma Forge](../README.md) — the ultimate color engineering toolkit.*
