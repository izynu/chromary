# Libraries & SDKs

> Every color library worth typing `npm install` or `pip install` for, grouped by language, ranked by reputation, and matched to the job you're actually doing.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|---|---|---|---|
| [culori](https://culori.org) | JS/TS toolkit | OKLab/OKLCH first-class, tree-shakeable ESM, every ΔE formula. The 2024+ default. | ★★★★★ |
| [colorjs.io](https://colorjs.io) | JS/TS spec engine | Built with W3C spec authors, implements CSS Color 4/5 algorithms to the letter. | ★★★★★ |
| [coloraide](https://github.com/facelessuser/coloraide) | Python library | The Python culori: 60+ spaces, interpolation, gamut mapping, the full ΔE family. | ★★★★★ |
| [chroma.js](https://gka.github.io/chroma.js) | JS scales | A decade of the most ergonomic scale API ever shipped. Fastest data → ramp path. | ★★★★ |
| [colord](https://github.com/omgovich/colord) | Tiny JS parser | ~1.7 kB core with an opt-in plugin system. The bundle-size champion. | ★★★★ |
| [go-colorful](https://github.com/lucasb-eyer/go-colorful) | Go library | The one serious Go color lib: Lab, Luv, HSLuv, OKLab, sane blending. | ★★★ |

*Legend: ★★★★★ must-know → ★ historical. Full legend in the [README](../README.md).*

## The Catalog

**JavaScript / TypeScript**

### culori
- **What:** The modern JS/TS color toolkit: parse & format anything, convert between RGB, HSL, Lab, LCh, OKLab, OKLCH, okhsl/okhsv, Display-P3 and Rec.2020, plus interpolation, blending, and the full ΔE family.
- **Why it's great:** Functional and tree-shakeable, `import { oklch, formatHex } from "culori"` ships two functions, not a framework. Immutable objects, zero config, OKLab/OKLCH as natives instead of afterthoughts.
- **Pro tip:** Perceptual deltas in one call: `differenceCie2000(a, b)`, or `difference("oklab")` for a modern alternative. Scale-building recipes live in [05](05-design-systems-and-scales.md).
- **Link:** https://culori.org

### colorjs.io
- **What:** The spec-faithful library from W3C-adjacent authors (Lea Verou, Chris Lilley & co.): OKLab/OKLCH, Lab, CAM16, `color-mix()`-accurate mixing, and the exact CSS gamut-mapping algorithm.
- **Why it's great:** If CSS Color 4 defines an algorithm, colorjs.io matches it, including the gamut mapping browsers ship. First-class `color(display-p3 …)` and wide-gamut support.
- **Pro tip:** `new Color("p3", [1, 0.3, 0.4]).to("srgb").toString({ precision: 3 })`, wide-gamut → sRGB conversion plus fallback formatting in one line.
- **Link:** https://colorjs.io

### chroma.js
- **What:** The 2011 classic by Gregor Aisch, `chroma.scale()`, bézier blending, `average()`, `contrast()`, ColorBrewer and cubehelix schemes built right in.
- **Why it's great:** Still the most ergonomic scale API in any language: chainable, interpolates in any mode (lab, lch, oklab…), and turns a data range into N ready colors in one line.
- **Pro tip:** `chroma.scale(['#f7fbff', '#08306b']).mode('oklab').correctLightness().colors(9)`, `.correctLightness()` is the perceptual cheat code.
- **Link:** https://gka.github.io/chroma.js

### TinyColor
- **What:** Brian Grinstead's 2011 workhorse (`tinycolor2` on npm): parse anything, lighten/darken/mix, `isReadable()`, triads & tetrads. Installed hundreds of millions of times.
- **Why it's great:** Ubiquity is the feature, half the legacy dashboards you inherit speak TinyColor. Zero deps, tiny API, runs everywhere.
- **Pro tip:** Great for parsing & pretty-printing; wrong for scales (no perceptual spaces). New code → culori or colord; legacy patches → TinyColor forever.
- **Link:** https://github.com/bgrins/TinyColor

### colord
- **What:** The ~1.7 kB immutable color manager with a plugin system: `a11y` (readability), `lch`/`lab`, `mix`, `names`, harmonies, by omgovich.
- **Why it's great:** The smallest serious option, fully typed, runs in browser/node/edge. Plugins keep the core on a bundle diet while real functionality stays opt-in.
- **Pro tip:** Pay for features only when you use them: `import a11yPlugin from "colord/plugins/a11y"; colord.extend([a11yPlugin]);` → `colord("#0ea5a0").isReadable("#fff")`.
- **Link:** https://github.com/omgovich/colord

### color2k
- **What:** A ~2 kB "modern TinyColor" from Rico Kahler: parse, mix, darken/lighten, `transparentize`, `readableColor()`, APIs that read like CSS intentions.
- **Why it's great:** The styled-components-era favorite: tiny, tree-shakeable, zero dependencies, and boring in the best possible way.
- **Pro tip:** `readableColor(bg)` returns black or white, the fastest accessible-text decision you'll ever ship (then verify with [04](04-accessibility-contrast.md)).
- **Link:** https://github.com/ricokahler/color2k

### polished
- **What:** The styling helper belt from the styled-components team: `lighten`, `darken`, `mix`, `tint`/`shade`, `transparentize`, `readableColor`, "Sass for JS" in ~100 pure functions.
- **Why it's great:** The shadcn-era workhorse for computing colors inside design-token pipelines: pure, typed, tree-shakeable, framework-agnostic.
- **Pro tip:** It operates in HSL, perceptually approximate. Pair it with culori when a *perceptual* shift actually matters.
- **Link:** https://polished.js.org

### d3-color + d3-interpolate
- **What:** The viz grade duo underneath D3: color spaces (rgb, hsl, lab, hcl, cubehelix) plus the interpolation machinery (`interpolateLab`, `interpolateHcl`, `interpolateRgb.gamma(2.2)`) that powers d3-scale.
- **Why it's great:** A decade of data-viz hardening; colors and scales speak the same interpolation language, which keeps charts coherent end to end.
- **Pro tip:** For chart ramps use `d3.interpolateHcl` (or OKLCH via culori), raw RGB lerp is where chart gradients go to die (see [06](06-data-visualization-colormaps.md)).
- **Link:** https://github.com/d3/d3-color

**Python**

### coloraide
- **What:**"The Python culori" by facelessuser: 60+ color spaces, interpolation, the full ΔE family, gamut mapping, chromatic adaptation, one `Color` object that does everything.
- **Why it's great:** The most complete Python color library, period: `Color("oklch(0.7 0.12 195)").convert("srgb").to_string(precision=3)` just works, and the docs double as a color-science course.
- **Pro tip:** `pip install coloraide`; read the space pages even if you never code, they explain each model better than most textbooks.
- **Link:** https://github.com/facelessuser/coloraide

### colour-science
- **What:** Academic grade CIE colorimetry for Python (import name `colour`): spectral data, standard observers, illuminants, chromatic adaptation, appearance models, CAM16 included.
- **Why it's great:** When a paper says "CIE 15 / CIEDE2000 / CAM16", this is the implementation with citations. It's the reference library the academic world actually uses.
- **Pro tip:** Install as `pip install colour-science`, plain `pip install colour` is an unrelated, abandoned package. Classic trap.
- **Link:** https://www.colour-science.org

### palettable
- **What:** Python wrappers around the classic colormap collections: ColorBrewer, CartoColors, cubehelix, matplotlib, Tableau, LibreOffice, even Wes Anderson.
- **Why it's great:** One import = decades of cartography grade palettes: `from palettable.cartocolors.sequential import Sunset_7`, and `.mpl_colormap` plugs straight into matplotlib.
- **Pro tip:** The qualitative sets make great starting points for categorical charts, then verify distinctness with distinctipy below.
- **Link:** https://github.com/jiffyclub/palettable

### distinctipy
- **What:** From the Alan Turing Institute: generates N maximally distinct colors, aware of background color and color-vision deficiency.
- **Why it's great:** Categorical chart colors that are *computed* to be distinguishable, not vibes-picked, and it can invert itself for dark backgrounds.
- **Pro tip:** `distinctipy.get_colors(12, exclude_colors=[(1, 1, 1), (0, 0, 0)])` keeps your chart away from background and pitch-black collisions.
- **Link:** https://github.com/alan-turing-institute/distinctipy

### webcolors
- **What:** The veteran utility for CSS named colors: name↔hex/rgb24/rgb1 conversions across the HTML4/CSS2/CSS21/CSS3 keyword sets.
- **Why it's great:** Boring, correct, stable since forever, exactly what a name-lookup library should be.
- **Pro tip:** `webcolors.name_to_hex("rebeccapurple")`, the color added to CSS for a six-year-old, and the one everyone forgets exists.
- **Link:** https://github.com/ubernostrum/webcolors

**Rust & Go**

### palette (Rust)
- **What:** THE Rust color crate: sRGB, linear RGB, OKLab, Lab, HSL, HSV, Luma, generic over pixel types (`Srgb<u8>`, `LinSrgb<f32>`).
- **Why it's great:** Pixel-format aware at the type level: gamma-encoded vs linear values are *different types*, which kills an entire species of blending bug at compile time.
- **Pro tip:** Blend in linear space (`LinSrgb`), then convert back to `Srgb` for output, the "why do my gradients look dirty" fix, enforced by the compiler.
- **Link:** https://github.com/Ogeon/palette

### go-colorful (Go)
- **What:** Go's color workhorse: Hex/RGB plus Lab, Luv, HSLuv, OKLab/OKLCH, blending helpers (`BlendLab`, `BlendHSLuv`) and distance functions.
- **Why it's great:** stdlib-friendly API (compatible with `color.Color`) with real perceptual spaces, a rarity in Go-land, and well-maintained for years.
- **Pro tip:** `colorful.Hex("#0ea5a0").BlendLab(colorful.Hex("#f43f5e"), 0.5)`, Lab-space blending, zero gray dead-zone.
- **Link:** https://github.com/lucasb-eyer/go-colorful

### Pick by need

| Need | Reach for |
|---|---|
| Smallest bundle | colord |
| Most standards-correct | colorjs.io |
| Best DX for scales | chroma.js |
| OKLCH power-user | culori |
| Python, everything | coloraide |
| Academic CIE math | colour-science |

## Pitfalls

- Stars ≠ suitability: check *color-space support* and recent commits, not GitHub hype.
- Legacy libs interpolate in sRGB/HSL → gray dead-zones and muddy blends. The fix is perceptual interpolation ([07](07-css-gradients.md)).
- `pip install colour` is **not** colour-science. PyPI name: `colour-science`; import name: `colour`.
- Beware libraries that round-trip everything through sRGB: feed them Display-P3 colors and your reds will clip ([03](03-perceptual-color-spaces.md)).
- TinyColor's `isReadable` uses old WCAG math, fine as a hint, wrong as your APCA source of truth ([04](04-accessibility-contrast.md)).
- Don't hand-roll ΔE, everyone gets the Lab↔XYZ matrix wrong exactly once. Use culori, colorjs.io or coloraide.

## Try it now

```js
// npm i culori
import { oklch, formatHex } from "culori";

// One brand color → a 9-step perceptually even ramp (vary ONLY lightness).
const brand = oklch("#0ea5a0");

const ramp = Array.from({ length: 9 }, (_, i) =>
  formatHex({ ...brand, l: 0.97 - i * 0.11 })
);

console.log(ramp);
// → 9 hex steps, evenly spaced in *perceived* lightness, no muddy mids.
```

## Related guides

- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md), the math every library above implements
- [05 · Design Systems & Scales](05-design-systems-and-scales.md), what to build with them (Tailwind 50 to 950, Radix 12-step)
- [06 · Data-Viz Colormaps](06-data-visualization-colormaps.md), chroma.js & d3 in their natural habitat
- [10 · Image Color Extraction](10-image-color-extraction.md), the other half of the JS palette pipeline
- [01 · REST APIs & MCP](01-rest-apis-and-mcp.md), when you'd rather call an API than ship a dependency
- [15 · Tool Selection Matrix](15-tool-selection-matrix.md), "choose a JS library" is row 12

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
