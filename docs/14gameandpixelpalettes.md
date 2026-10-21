# Game & Pixel Palettes

> Sixteen colors, infinite worlds, the curated palettes, file formats and Aseprite workflows that make limited palettes look intentional instead of starved.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|||||
| [Lospec](https://lospec.com/palettelist) | The palette database | Hundreds of pixel palettes, filterable by color count & tags, exportable as `.hex`/`.gpl`. The front door of pixel color. | ★★★★★ |
| **PICO8 16** | Fantasyconsole palette | The most recognizable 16 colors in gaming, a locked constraint that spawned an entire art style and scene. | ★★★★★ |
| [Sweetie 16](https://lospec.com/palettelist/sweetie16) | The allrounder | GrafxKid's balanced 16: strong primaries, useful earth tones, clean ramps. The best "first palette". | ★★★★ |
| [ENDESGA 16/32](https://lospec.com/palettelist/endesga16) | Vibrant modern sets | Saturated, game ready palettes that stay coordinated; the 32 adds ramp depth for bigger projects. | ★★★★ |
| [DB16 / DB32](https://lospec.com/palettelist/db16) | DawnBringer classics | Engineered with hueshifted ramps and dithering in mind, the canon worth studying line by line. | ★★★★ |
| **Dithering** | The fake 17th color | Checkerboard patterns stretch a 16color palette into thousands of perceived tones. | ★★★ |

*Legend: ★★★★★ mustknow → ★ historical. Full legend in the [README](../README.md).*

## The Catalog

### Lospec
 **What:** The community database of pixelart palettes: filter by color count, tags and style; every palette exports as `.hex`, `.gpl`, PNG or JSON, with author credit on each page.
 **Why it's great:** Onestop discovery with consistent file formats. The "16" and "32" filter is the fastest way to find a wellformed starter set.
 **Pro tip:** Drag a downloaded `.hex` straight onto an Aseprite sprite, the colors land in your indexed swatches instantly.
 **Link:** https://lospec.com/palettelist

### PICO8, the fantasyconsole 16
 **What:** Lexaloffle's PICO8 fantasy console ships a locked 16color palette: black, darkblue, darkpurple, darkgreen, brown, darkgray, lightgray, white, red, orange, yellow, green, blue, indigo, pink, peach (indices 0 to 15).
 **Why it's great:** The constraint is the feature: shared hardware → shared aesthetic → a scene of thousands of games. The hue spread is surprisingly wellchosen for sprites, tiles and UI alike.
 **Pro tip:** The full palette as a `.hex` file is in  below, it doubles as a great default for retrostyled web UI.
 **Link:** https://www.lexaloffle.com/pico8.php

### Sweetie 16
 **What:** GrafxKid's 16color workhorse: confident primaries, a green/teal pair, warm browns, and just enough grays for UI.
 **Why it's great:** It covers ramp material for most sprite subjects without dead hues, which is why it's the default recommendation for beginners and jams alike.
 **Pro tip:** If your project outgrows it, port the *roles* (primary/accent/neutral) rather than redesigning from scratch.
 **Link:** https://lospec.com/palettelist/sweetie16

### ENDESGA 16 & 32
 **What:** ENDESGA's signature saturated palettes: ENDESGA 16 for tight projects, ENDESGA 32 when you need deeper ramps without going full 64.
 **Why it's great:** Loud yet coordinated, the hues are tuned to sit next to each other, so screens of sprites don't fight. A favorite for modern indie titles.
 **Pro tip:** The 32's extra colors are mostly *lightness steps*, not new hues, steal that philosophy for your own expansions.
 **Link:** https://lospec.com/palettelist/endesga32

### Arne 16 & the DawnBringer classics (DB16 / DB32)
 **What:** Arne 16, the NESadjacent classic that's cohabited with tile games for decades, plus DawnBringer's DB16 and DB32, the moststudied palettes in pixel art.
 **Why it's great:** DB palettes are engineered artifacts: ramps hueshift with lightness, chroma is rationed deliberately, and DB32 scales from sprites to full scenes.
 **Pro tip:** Study DB16's ramps as a course in **Bgrading**, each step moves hue, not just brightness.
 **Link:** https://lospec.com/palettelist/db32

### Why limited palettes work
 **What:** A shared 16color gamut guarantees cohesion (everything is preharmonized), forces clever composition, and indexes cleanly into engines and save formats.
 **Why it's great:** Constraints are a feature: fewer decisions, stronger identity, and persprite limits (often 3 to 4 colors *from* the global 16) keep silhouettes readable.
 **Pro tip:** UI teams should steal this too, a 16token cap is a maintainability superpower ([05](05designsystemsandscales.md)).
 **Link:** https://lospec.com/palettelist

### Dithering basics
 **What:** Simulating intermediate tones with dot patterns: a 50% checkerboard reads as a blend of two colors; ordered dithering (Bayer matrices) gives predictable 17%/33%/50% mixes; noise dithering trades structure for organic texture.
 **Why it's great:** Dithering is how 16 colors fake 16,000, it extends ramps, smooths gradients, and hides banding without adding a single palette entry.
 **Pro tip:** In Aseprite, the pencil tool has builtin dithering patterns (Bayer 2×2 and 4×4 are the daily drivers), dither band edges, not whole fills.
 **Link:** https://www.aseprite.org/docs/dithering/

### Aseprite workflows (Bgrading)
 **What:** Aseprite is the pixelart IDE (indexedcolor mode, palette locking, onionskinning). **Bgrading** is DawnBringer's shading method: color ramps that *hueshift* as lightness changes, shadows drift cool, highlights drift warm, applied in graded bands.
 **Why it's great:** Bgraded sprites look luminous; pure darkentowardblack shading looks dirty. The technique explains why DB palettes feel alive.
 **Pro tip:** Workflow: indexed mode → lock your 16 → build a 3 to 5 step hueshifted ramp per material → paint in bands → dither the boundaries.
 **Link:** https://www.aseprite.org

### Palette file formats: .hex / .gpl / .aseprite
 **What:** ** `.hex`**= one `#RRGGBB` per line (Lospec's default). **`.gpl`**= GIMP palette format (`R G B<Tab>Name` lines with a header). **`.aseprite`/`.ase`**= Aseprite's native format carrying sprites *and* their indexed palettes.
 **Why it's great:** These three cover the entire interop surface: Aseprite ↔ GIMP ↔ code ↔ design tools, no converters needed.
 **Pro tip:** `.hex` is trivially parseable, one `readlines()` away from design tokens ([05](05designsystemsandscales.md)).
 **Link:** https://lospec.com/palettelist

### Porting pixel palettes to UI tokens
 **What:** Treat a game palette as a brand system: pick neutrals + primary + accent from the 16, verify WCAG/APCA contrast for text pairs, then expand tonal ramps in OKLCH from the pixel hues.
 **Why it's great:** Pixel palettes arrive preharmonized, so PICO8 or Sweetiethemed sites inherit cohesion for free, it's why retro devthemes work so well ([09](09inspirationcultureandthemes.md)).
 **Pro tip:** Keep the original 16 as *literal* tokens and derive *semantic* ones, never redesign midport. Check every text pair ([04](04accessibilitycontrast.md)).
 **Link:** [15 · Tool Selection Matrix](15toolselectionmatrix.md), row 10 routes here

## Pitfalls

 Never resize pixel art with smooth interpolation, nearestneighbor or it turns to mush. Decide your integer scale (2×, 3×) up front.
 "16 colors" ≠ 16 *per sprite*: global palette ≠ persprite limit. Most classic sprites used 3 to 4 colors from the shared 16.
 Hueshift ≠ saturationshift: Bgrading moves *hue* across lightness bands. Shadows that go pure black and highlights that go pure white look flat.
 Dithering in moderation: a whole sprite at 50% checker reads as texture noise, not tone. Reserve it for edges and gradients.
 Dark pixel backgrounds eat UI contrast, verify any text you overlay on palette colors ([04](04accessibilitycontrast.md)).
 Classic palettes are artists' work, credit them (every Lospec page names its author).

## Try it now

The PICO8 palette as a Lospec `.hex` file, save as `pico8.hex`:

```text
#000000
#1D2B53
#7E2553
#008751
#AB5236
#5F574F
#C2C3C7
#FFF1E8
#FF004D
#FFA300
#FFEC27
#00E436
#29ADFF
#83769C
#FF77A8
#FFCCAA
```

Drop it onto an Aseprite sprite to load the 16 indexed swatches, or parse it anywhere: `fs.readFileSync("pico8.hex", "utf8").split("\n")` → 16 brand ready tokens.

## Related guides

 [05 · Design Systems & Scales](05designsystemsandscales.md), turn 16 swatches into semantic tokens
 [04 · Accessibility & Contrast](04accessibilitycontrast.md), check text pairs before shipping the retro theme
 [09 · Inspiration, Culture & Themes](09inspirationcultureandthemes.md), dev themes that share the limitedpalette soul
 [06 · DataViz Colormaps](06datavisualizationcolormaps.md), categorical distinctness, the chartside cousin
 [03 · Perceptual Color Spaces](03perceptualcolorspaces.md), OKLCH expansion of pixel hues, done right
 [16 · Glossary](16glossary.md), dithering, swatch, gamut, the words above


*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
