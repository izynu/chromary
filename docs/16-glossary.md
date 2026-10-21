# Glossary

> Every color word in this repo, in plain English, one to three sentences per term, zero prerequisites.

**[Back to Index](../README.md)**

## TL;DR, The most-confused pairs

| Pick | The confusion, resolved | |
|---|---|---|
| **Lightness vs Luminance** | Lightness is how bright a color *looks*; luminance is physical light weighted by eye sensitivity. WCAG uses luminance. | ★★★★★ |
| **Saturation vs Chroma** | Saturation is a relative dial (0 to 100%); chroma is a measured amount against a reference white. Not interchangeable. | ★★★★★ |
| **Color space vs color model** | A model is the recipe (3 numbers + meaning); a space is the recipe *plus* its exact interpretation (primaries, white point, gamma). | ★★★★ |
| **Gamut vs color space** | A space *defines* colors; the gamut is what a device can *actually show* from it. | ★★★★ |
| **Palette vs colormap** | A palette is a set of identities (UI, sprites); a colormap is an ordered ramp encoding data values. | ★★★★ |
| **HSL vs HSV/HSB** | Two different non-perceptual dial models, same hue, different brightness math. Neither is "objective lightness". | ★★★ |
| **Tone vs Lightness** | Material's Tone is lightness 0 to 100 in HCT; OKLCH's L is lightness 0 to 100% in OKLab. Same idea, different math. | ★★★ |

*Legend: ★★★★★ must-know → ★ historical. Full legend in the [README](../README.md).*

## The Catalog

Grouped from first principles to final ship: foundations → spaces → measurement → data-viz → accessibility → tokens.

### Foundations
- **Hue**, Where a color sits on the color wheel: red, amber, teal. Measured in degrees, 0 to 360.
- **Saturation**, How intense versus gray a color appears. In HSL/HSV it's a 0 to 100% dial, but each model defines "saturation" differently, which is exactly why chroma exists.
- **Chroma**, The measured intensity of a color relative to a reference white, in absolute perceptual units (Munsell, CIE, OKLCH's `C`). Saturation is relative; chroma is a quantity.
- **Lightness vs Luminance**, Lightness is perceived brightness (0 to 100% in Lab/OKLCH's `L`); luminance is physical radiance weighted by eye sensitivity (0 to 1, the `Y` in XYZ). Contrast ratios are computed from luminance, but your eye judges lightness.
- **Value**, Munsell's brightness dimension (0 to 10): "lightness" before the term was standardized. Survives today as HSV's V and Material's "tone".
- **Additive vs subtractive**, Screens mix emitted light (RGB: add toward white); inks absorb light (CMYK: subtract toward black). The root reason screen color ≠ print color ([12](12-print-and-physical-standards.md)).
- **Color temperature**, The warm/cool axis of white light, in Kelvin: candle ≈ 1800K, daylight ≈ 6500K. It's a *white point choice*, not a property of a single color.
- **Chromaticity**, A color's quality independent of brightness: hue + colorfulness, projected onto a 2D diagram (hello, CIE 1931 horseshoe).

### Spaces
- **Hex / RGB**, sRGB colors written `#RRGGBB`, gamma-encoded. Universal and compact, but perceptually mute: nothing in `#F60` vs `#F70` tells you which looks lighter.
- **HSL**, Hue/Saturation/Lightness, CSS's classic dial model. Great for intuition, poor for perception: equal HSL lightness steps look wildly unequal to humans.
- **HSV / HSB**, The same hue/saturation with "Value" (brightness) instead of HSL's lightness, HSB in design tools *is* HSV in code. Also non-perceptual.
- **CMYK**, Cyan/Magenta/Yellow/Key(ink), the subtractive print model. Device-dependent by nature: a CMYK number without a profile and paper context is a rumor ([12](12-print-and-physical-standards.md)).
- **OKLab / OKLCH**, The 2020 perceptual spaces from Björn Ottosson: `L` lightness (0 to 100%), `C` chroma, `h` hue. The modern working space for UI scales and gradients, try [oklch.com](https://oklch.com) ([03](03-perceptual-color-spaces.md)).
- **CIE Lab**, The 1976 perceptual space (`L*`, `a*`, `b*`). OKLab's grandparent; still the official language of print tolerances and ΔE.
- **LCh**, Lab in polar coordinates (Lightness, Chroma, hue), same space, friendlier axes. `OKLCH : OKLab :: LCh : Lab`.
- **HCT**, Google's Hue/Chroma/Tone space behind Material You: CAM16-accurate, with Tone ≈ L* from 0 to 100. The contract for Material apps ([03](03-perceptual-color-spaces.md)).
- **CAM16**, A color *appearance* model: predicts how colors *look* under specific lighting and adaptation, not just how they measure. Heavy math, specialist tool, imported from colour-science ([11](11-libraries-and-sdks.md)).
- **Color space vs color model**, RGB is a *model* (three channels); sRGB is a *space* (that model + exact primaries, white point and gamma). Every confusion about "which RGB?" is really this.
- **Gamut**, The set of colors a device or space can actually produce. sRGB's gamut sits inside Display-P3's; wide-gamut colors must be mapped to fit old screens.
- **Gamut mapping**, The policy for out-of-gamut colors: CSS Color 4 specifies reducing chroma while preserving lightness and hue ([03](03-perceptual-color-spaces.md)).
- **Perceptual uniformity**, The property that equal numeric steps = equal perceived steps. Munsell, CIELAB and OKLab chase it; HSL laughs at it.
- **White point**, The exact color a space calls "white" (sRGB uses D65 daylight). Change it and every other color's meaning shifts, the reason conversions carry adaptation matrices.
- **Gamma / transfer function**, The curve between stored values and physical light (sRGB ≈ 2.2). Blend *after* removing it, or gradients go muddy ([07](07-css-gradients.md)).

### Measurement
- **ΔE (Delta-E)**, One number for "how different do these two colors look?", computed from Lab/OKLab distances. Rough ΔE2000 ruler: ≈1 imperceptible, 2.3 just noticeable, >5 obvious ([13](13-color-science-and-standards.md)).
- **JND**, Just-Noticeable Difference: the smallest change most observers can spot, about ΔE2000 = 2.3 under typical conditions.
- **Metamerism**, Two samples that match under one light source and diverge under another. The print-shop heartbreaker, and why you verify against physical swatches in two lights ([12](12-print-and-physical-standards.md)).

### Data-viz
- **Sequential colormap**, Lightness moves one direction with the data: low = light, high = dark (or vice versa). For magnitude: temperature, density, income.
- **Diverging colormap**, Two hues joined at a light midpoint, for data where deviation *from a midpoint* matters: anomalies, correlations, ±errors.
- **Categorical colormap**, N equally-weighted, mutually distinct colors for labels, no ordering implied. Capped near 8 to 9 before legend-matching fails.
- **Cyclic colormap**, Wraps around (hue angles, wind direction, time of day): the start and end values must look identical.
- *All four: [06 · Data-Viz Colormaps](06-data-visualization-colormaps.md).*
- **Dithering**, Simulating extra tones with dot patterns: a 50% checkerboard reads as a blend of its two colors. Pixel art's fake 17th color ([14](14-game-and-pixel-palettes.md)).
- **Swatch**, One stored color sample: a physical chip, a token in your theme, or a single line in a `.hex` file.

### Accessibility
- **CVD, protanopia / deuteranopia / tritanopia**, Color-vision deficiencies of the L, M and S cones respectively. Protan/deutan collapse the axis between red and green (about 8% of men); tritanopia (between blue and yellow) is rare. Simulate before you publish ([04](04-accessibility-contrast.md)).
- **WCAG contrast ratio**, `(L1 + 0.05) / (L2 + 0.05)` from relative luminance; AA = 4.5:1 (3:1 for large text). Cheap to compute, widely required, and unreliable for dark mode.
- **APCA Lc**, Lightness Contrast, Myndex/Somers's perceptual successor: context aware (font size & weight), scales ~0 to 108, powers the WCAG 3 draft ([04](04-accessibility-contrast.md)).

### Tokens
- **Color token, semantic vs literal**, Literal tokens name raw values (`--teal-500`); semantic tokens name *roles* (`--color-action`) that reference literals. Dark mode = rewiring semantics, not every literal ([05](05-design-systems-and-scales.md)).
- **Tonal palette**, One hue held constant while lightness (and sometimes chroma) steps through a ramp, the construction unit of Material, Radix and Tailwind scales.
- **Scale 50 to 950**, The Tailwind convention: eleven steps from 50 (near-white) to 950 (near-black), with 500 as the "brand" midpoint. A tonal palette with numbers on it ([05](05-design-systems-and-scales.md)).

## Pitfalls

- Tools use terms loosely: HSL "lightness" is not Lab `L*`, and HSL "saturation" is not chroma. Name the space when precision matters.
- A ΔE number without its formula is meaningless, ΔE76 and ΔE2000 scales disagree ([13](13-color-science-and-standards.md)).
- Hex and `rgb()` default to *sRGB*; say "linear sRGB" explicitly or blending math will betray you.
- Don't claim "colorblind safe" without naming which deficiency and which simulation verified it ([04](04-accessibility-contrast.md)).
- Hue angles are space-relative: hue 195 in HSL ≠ hue 195 in OKLCH. Never port hue numbers across spaces blindly.
- "Gamut" isn't badness, out-of-gamut just means "needs mapping", and CSS Color 4 tells you exactly how.

## Test yourself

1. **Q:** Lightness or luminance, which does WCAG use? **A:** Relative luminance, inside the `(L1+0.05)/(L2+0.05)` ratio.
2. **Q:** Is HSL's lightness perceptually uniform? **A:** No, equal steps look unequal, which is why OKLCH exists.
3. **Q:** Which ΔE formula is today's default, and what's the JND? **A:** CIEDE2000; the just-noticeable difference is ≈2.3.
4. **Q:** sRGB vs Display-P3, which gamut is bigger, and why care? **A:** P3 (~50% more area); wide-gamut displays show visibly richer reds and greens.
5. **Q:** Dark mode ships tomorrow, do you rewrite literal or semantic tokens? **A:** Semantic; literals stay, roles get remapped.

## Related guides

- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md), the Spaces section, expanded with math
- [04 · Accessibility & Contrast](04-accessibility-contrast.md), CVD and contrast, in depth
- [05 · Design Systems & Scales](05-design-systems-and-scales.md), tonal palettes and the 50 to 950 ladder
- [06 · Data-Viz Colormaps](06-data-visualization-colormaps.md), the four colormap flavors, illustrated
- [12 · Print & Physical Standards](12-print-and-physical-standards.md), metamerism and CMYK in the wild
- [13 · Color Science & Standards](13-color-science-and-standards.md), where ΔE, CIE and ICC come from
- [14 · Game & Pixel Palettes](14-game-and-pixel-palettes.md), dithering and swatches, applied

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
