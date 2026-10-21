
name: imagepalette
description: Extract a usable color palette from images, logos, screenshots or artwork and turn it into design tokens. Use when the user provides an image/logo/photo and asks for its colors, wants to theme an app around an image, or asks what colors are in a picture.


# Image Palette

From pixels to tokens: extract, normalize, and productionize the colors hiding in any image.

## When to use
 "What colors are in this logo/photo?" / "theme my app around this artwork"
 "match my UI to this screenshot" / brandasset intake
 Building album art style dynamic theming (Spotify vibe)

## Workflow
1. **Extract** with the right tool:
    **Role based** (best for UI): `nodevibrant` → swatches `Vibrant, Muted, DarkVibrant, LightVibrant, DarkMuted, LightMuted` with populations.
    **Dominant + palette**: Color Thief (js) / `colorthief` (python) via mediancut.
    **Custom control**: kmeans (scikitlearn) with k = 5 to 8; downsample to ≤ 200px wide first.
2. **Read the roles**: population tells you *area*, Vibrant roles tell you *utility*. A tiny logo mark on white yields low population but the highest brand value, trust roles over raw counts for logos.
3. **Normalize** every candidate in OKLCH:
    Clamp `C` into `0.06 to 0.16` for UI colors (photos scream, UIs shouldn't).
    Force the lightness ladder: pick the darkest healthy candidate as textish, brightest as surfaceish.
4. **Build the set**: 1 primary + 1 accent (huerotate 30 to 60° from primary, similar L) + 2 neutrals (primary hue, C ≤ 0.03, from the image's dark/light extremes).
5. **Gate**: primaryonsurface and text pairs ≥ 4.5:1 (see `contrastauditor`); CVDcheck primary vs accent (lightness gap required).
6. **Emit tokens** in the themebuilder output format.

## Decision rules

| Input | Extraction choice |
|||
| Flat logo / vectorish PNG | nodevibrant roles (mediancut works too) |
| Photo / album art | nodevibrant + population weighting |
| Screenshot of an app | kmeans k=6, then discard grays below C 0.02 |
| "Just the background vibe" | fastaveragecolor on center crop |

## Hard gates
 Never ship raw extracted hexes, photos carry JPEG mud (chroma noise ±0.03) and logos carry nearblack falsies.
 If extraction yields nothing vibrant (moody photos), build the accent by huerotating the dominant color instead of inventing an unrelated hue.
 State clearly that hex→Pantone/print matches need physical verification (link [12 · Print](../../docs/12printandphysicalstandards.md)).

## Output format
1. Role table: role → oklch() → hex → source swatch name.
2. Copy paste `:root { token: … }` block.
3. Verified pairs with ratios (primaryonbackground, foregroundonbackground).
4. Oneline provenance: "extracted 6 swatches from logo.png via nodevibrant, normalized in OKLCH".

## Example
Album art → `Vibrant #C2453C → oklch(56% 0.14 25)` clamped to `C 0.13`; `DarkVibrant` → surface; accent = hue 25+55 = 80 sand `oklch(75% 0.11 80)`; text `oklch(20% 0.02 25)` on surface = 11.9:1 ✓ → tokens emitted.


*Part of [Chromary](../../README.md) · deep dive: [10 · Image extraction](../../docs/10imagecolorextraction.md) · recipe: [imagepalette.js](../../recipes/javascript/imagepalette.js)*
