# Image Color Extraction

> Pull a usable palette out of any image, then normalize it until a design system would actually accept it.

**[Back to Index](../README.md)**

## Which extractor when?

| Situation | Reach for |
|---|---|
| Auto-theming album art / covers | node-vibrant |
| One dominant color for a card accent | Color Thief |
| Ambient tint behind content, as fast as possible | fast-average-color |
| Custom weighting, masking or exact k | k-means (scikit-learn) |
| Already processing images with Pillow | Pillow quantize |
| Batch a folder of images in Python | colorthief (Python) |

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|---|---|---|---|
| **node-vibrant** | Role based swatches (Vibrant, Muted, Dark/Light variants) | Purpose-built for auto-theming & album-art UIs | ★★★★★ |
| **Color Thief** | Dominant color + palette via median cut (JS & Python) | The simplest "what color is this image" answer | ★★★★ |
| **fast-average-color** | Blazing average color of a region or whole image | Fastest option, browser & node, tiny footprint | ★★★★ |
| **k-means (scikit-learn)** | Cluster pixels yourself for full control | When you need weighting, masking, or exact k | ★★★ |
| **colorthief (Python)** | Batch median-cut extraction in pip form | The same results inside Python pipelines | ★★★ |
| **Pillow quantize** | Median cut in one Python line | Zero extra dependencies for quick checks | ★★★ |

## The Catalog

### node-vibrant (the Vibrant.js successor)
- **What:** Extracts six *role based* swatches, Vibrant, Muted, DarkVibrant, LightVibrant, DarkMuted, LightMuted, each with suggested title/body text colors. `npm i node-vibrant` (the original Vibrant.js lives on here; works in browser and node).
- **Why it's great:** The roles map 1:1 to UI slots, DarkVibrant for accent cards, LightMuted for soft backgrounds, which is why it powered the Spotify-era auto-theming wave.
- **Pro tip:** Always null-check swatches: low-quality or monochrome images leave roles empty. Fall back to sensible defaults instead of crashing.
- **Link:** https://github.com/Vibrant-Colors/node-vibrant

### Color Thief (JavaScript)
- **What:** The classic browser/node lib: one dominant color plus a palette (default 10 colors) via median cut.
- **Why it's great:** Two functions, zero config, instant "color of this image", fast and deterministic, great for thumbnails, cards and previews.
- **Pro tip:** Lower the color count for busy photos (5 to 6); raise it for flat graphic art (10+).
- **Link:** https://github.com/lokesh/color-thief

### colorthief (Python port)
- **What:** The faithful Python version: `ColorThief("img.jpg").get_palette(color_count=8)`.
- **Why it's great:** Same median-cut results in a pip install, ideal for batch jobs over image folders.
- **Pro tip:** `get_color(quality=1)` gives the most accurate dominant color (quality trades speed for precision).
- **Link:** https://github.com/fengsp/color-thief-py

### fast-average-color
- **What:** Computes the average color of an image, whole or by region, with sync/async APIs, in browser and node. `npm i fast-average-color`.
- **Why it's great:** The fastest tool here by design: perfect for hover-tinting, ambient backgrounds behind covers, or ranking images by brightness at scale.
- **Pro tip:** Use the region options (left/top/width/height) to sample a *corner* for chrome-tinting while ignoring busy subject matter in the center.
- **Link:** https://github.com/fast-average-color/fast-average-color

### k-means on pixels (scikit-learn), the custom build
- **What:** Cluster raw pixel RGB values yourself: full control over k, sampling, masking and weighting.
- **Why it's great:** k-means adapts clusters to *dominant colors* (natural photos win), while median cut splits boxes by spread (flat/graphic art wins). Knowing both lets you choose per input.
- **Pro tip:** Downsample to ~128×128 first, clustering 12 million pixels buys you latency, not accuracy.

```python
# pip install scikit-learn pillow numpy
import numpy as np
from PIL import Image
from sklearn.cluster import KMeans

pixels = np.asarray(Image.open("logo.png").convert("RGB").resize((128, 128))).reshape(-1, 3)
centers = KMeans(n_clusters=6, n_init=10).fit(pixels).cluster_centers_.astype(int)
print([f"#{r:02x}{g:02x}{b:02x}" for r, g, b in centers])
```

- **Link:** https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html

### Pillow quantize (zero dependency quick check)
- **What:** Median cut is already inside Pillow: `.convert("RGB").quantize(colors=6, method=Image.Quantize.MEDIANCUT).getpalette()`.
- **Why it's great:** No new dependencies beyond Pillow, perfect inside existing image-processing scripts and cron jobs.
- **Pro tip:** Always `convert("RGB")` first: quantizing an RGBA image folds alpha into the palette and ghosts your results.
- **Link:** https://pillow.readthedocs.io/en/stable/reference/Image.html

### The brand-extraction pipeline
- **What:** Four steps from pixels to production:
  1. **Extract** with node-vibrant or k-means, sample the logo region, not the backdrop.
  2. **Normalize** chroma in OKLCH, keep the hue, clamp C to your UI budget (guide 03).
  3. **Build a scale**, a 50→950 lightness ladder from the normalized hue (guide 05).
  4. **Check contrast**, every text/primary pair ≥ 4.5:1 (guide 04).
- **Why it's great:** Raw extracted colors are never design-system grade, chroma is arbitrary and lightness uncontrolled. Normalization is the difference between "picture of a logo" and "tokens".
- **Pro tip:** Saturate-then-clamp: if the brand color lands at C 0.25 in OKLCH, keep the *hue* and step chroma down to ~0.15 for UI chrome; save the raw value for hero moments.
- **Link:** [the image-palette skill](../skills/image-palette/SKILL.md)

## Pitfalls

- **JPEG artifacts lie.** Blocking and chroma subsampling pollute edge colors, extract from PNGs, or blur/denoise first.
- **Photos bias toward large areas.** Sky and background dominate; the *brand* color might be 5% of pixels. Crop to the subject or mask before clustering.
- **Transparent PNGs ghost your results.** Fully transparent pixels read as black or white garbage, composite onto a known background color before extracting.
- **Downsample before extracting.** 4000×3000 is 12M pixels of waste; 128×128 preserves the color distribution at ~0.1% of the cost.
- **Dominant ≠ usable.** The top color can fail contrast or run neon, normalize in OKLCH and re-check contrast (guides 03 to 04) before shipping.
- **UI screenshots carry antialiasing grays.** Pixel-blended edges form their own gray cluster, crop or mask before clustering.

## Try it now

Auto-theme an image in node with role based swatches:

```js
// npm i node-vibrant
import Vibrant from 'node-vibrant'; // browser bundle: 'node-vibrant/browser'

const palette = await Vibrant.from('album-art.jpg').getPalette();

for (const [role, swatch] of Object.entries(palette)) {
  if (!swatch) continue; // monochrome images leave roles empty
  console.log(role.padEnd(12), swatch.hex, `title:${swatch.titleTextColor} body:${swatch.bodyTextColor}`);
}
```

## Related guides

- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md), the OKLCH normalization step
- [04 · Accessibility & Contrast](04-accessibility-contrast.md), extracted colors must still pass contrast
- [05 · Design Systems & Scales](05-design-systems-and-scales.md), from one extracted color to a 50 to 950 scale
- [08 · AI Palette Generation](08-ai-palette-generation.md), use the extraction as the AI's seed

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
