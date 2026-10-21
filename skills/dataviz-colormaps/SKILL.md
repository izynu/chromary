---
name: dataviz-colormaps
description: Choose scientifically correct colormaps and categorical palettes for charts, heatmaps, and scientific figures. Use when the user asks about colormaps, viridis, heatmaps, chart colors, colorblind safe plots, or making data visualizations readable.
---

# Dataviz Colormaps

Match the colormap to the *data type* and the audience, including the ~5% of readers with color vision deficiency and the printers with 3 dull inks.

## When to use
- "Which colormap for my heatmap/plot?" / "is viridis right?"
- "colorblind safe chart colors" / "publication ready figure colors"
- Someone is using jet/rainbow (intervene kindly)

## Workflow
1. **Classify the data**:
   - **Sequential** (low→high, order matters, one direction)
   - **Diverging** (critical midpoint: zero, mean, control, two directions)
   - **Categorical** (unordered classes, order is meaningless)
   - **Cyclic** (angles, phases, days, wraps around)
2. **Pick from the decision table.**
3. **Scale chroma to the ink budget**: web charts can be brighter; print figures need Crameri/ColorBrewer print safe variants.
4. **Verify**: does the midpoint of a diverging map read as "nothing happening"? Squint test, blur your vision; the pattern must survive.
5. **Annotate**: direct labels on series beat legends; add a colorbar with units for continuous maps.

## Decision rules

| Data | First choice | Alternatives | Avoid |
|---|---|---|---|
| Sequential | `viridis` / `magma` | `batlow` (Crameri), `cividis` (max CVD safe), ColorBrewer `YlGnBu` | `jet`, rainbow |
| Diverging | Crameri `vik` / `berlin` | ColorBrewer `RdBu`, `PiYG` | two unrelated hues |
| Categorical (≤ 8) | iwanthue (Lab k-means) | Okabe-Ito 8, Tableau 10 | > 8 colors |
| Cyclic | `twilight` / `hsv-corrected` | Crameri `romaO` | linear maps on angles |
| Publication, any | cmcrameri set | | default matplotlib `hsv` |

- Web/d3: `d3.interpolateViridis`, `d3.interpolateCividis` (scale-chromatic).
- Python: `from cmcrameri import cm` → `cm.batlow`; matplotlib builtin viridis is already fine.
- Categorical with many classes → don't add hues; use lightness steps + direct labels, or small multiples.

## Hard gates
- **No rainbow/jet for ordered data.** It invents boundaries and hides real ones (Crameri 2020, *Nature Communications*; Borland & Taylor 2007).
- Adjacent categorical colors must differ in **lightness**, not just hue (CVD safety).
- Diverging maps must be symmetric around a *neutral* midpoint (whitish/gray, not saturated).
- Never encode with hue alone when the chart may be printed grayscale, check the grayscale conversion.

## Output format
1. One-line diagnosis: "Your data is diverging with a natural zero → use `vik`."
2. Code snippet (python or js) with the exact import.
3. Accessibility note: CVD simulation verdict + grayscale verdict.
4. If categorical: the actual hex list (6 to 8 colors, lightness-varying).

## Example
User: heatmap of anomaly scores centered at 0.
→ diverging `vik`; midpoint neutral dark (works on both light/dark slides); colorbar ticks at −max/0/+max; grayscale-check passed; snippet: `plt.imshow(z, cmap='vik', vmin=-3, vmax=3)`.

---
*Part of [Chromary](../../README.md) · deep dive: [06 · Data-viz colormaps](../../docs/06-data-visualization-colormaps.md)*
