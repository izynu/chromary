# Color Science & Standards

> The standards bodies, ΔE formulas and landmark papers underneath every tool in this repo, read this once and you'll never quote a color number without knowing what it means.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|---|---|---|---|
| [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) | W3C spec | Made `oklch()`, `color-mix()` and real gamut mapping web-native, the most consequential color document of the decade. | ★★★★★ |
| **CIEDE2000** | ΔE formula | The industry-default "are these two colors *different*?" metric, the tolerance language of print and manufacturing. | ★★★★★ |
| [ICC profiles](https://www.color.org) | Device color descriptions | The only sane path from screen RGB to printed CMYK. Profiles, not vibes. | ★★★★★ |
| [Ottosson, OKLab (2020)](https://bottosson.github.io/posts/oklab/) | Blog post turned standard | Derives a perceptual space that actually behaves, the math behind OKLCH everywhere. | ★★★★★ |
| Crameri et al. (2020) | *Nature Communications* paper | "The misuse of colour in science communication", the citable paper that retired rainbow colormaps. | ★★★★ |
| **Munsell (1905)** | *A Color Notation* | The grandfather of perceptual ordering, Hue/Value/Chroma, still correct 120 years later. | ★ |

*Legend: ★★★★★ must-know → ★ historical. Full legend in the [README](../README.md).*

## The Catalog

### CIE, Commission Internationale de l'Éclairage
- **What:** The body that defined colorimetry itself: the 1931 standard observer, CIELAB/CIELUV, **CIE 15** (the colorimetry bible) and the **CIEDE2000** difference formula.
- **Why it's great:** Every "perceptual" claim in this repo traces back to a CIE publication. When a library says ΔE2000, it means this family of formulas.
- **Pro tip:** The standards themselves are paid documents, but the formulas are reproduced in the docs of every serious library ([11](11-libraries-and-sdks.md)).
- **Link:** https://cie.co.at

### ICC profiles, the device-translator standard
- **What:** The International Color Consortium's format for describing how a *specific* device (monitor, press, ink, paper) actually renders color, so conversions compensate for real behavior.
- **Why it's great:** RGB→CMYK without a profile is guesswork; with one, it's physics. Every print pipeline you trust runs on ICC underneath.
- **Pro tip:** You rarely parse profiles, you *use* the right one. The soft-proofing workflow lives in [12](12-print-and-physical-standards.md).
- **Link:** https://www.color.org

### sRGB, IEC 61966-2-1
- **What:** The 1996 IEC standard that froze "web color": the transfer curve (gamma ≈ 2.2), the RGB primaries and the D65 white point that your `#hex` values actually mean.
- **Why it's great:** It's the lowest common denominator every display speaks, the reason a hex code survives Windows, macOS, Android and a decade of hardware churn.
- **Pro tip:**"sRGB" names a *transfer curve + gamut* pair. Say "linear sRGB" when you remove the curve, blending bugs live in exactly that gap ([07](07-css-gradients.md)).
- **Link:** https://www.iec.ch

### Display-P3 & the wide-gamut wave
- **What:** Apple's display-adapted variant of DCI-P3, roughly 50% more area than sRGB, now a CSS predefined space: `color(display-p3 1 0.3 0.4)`.
- **Why it's great:** Modern iPhones and Macs render P3 natively; brand reds and greens visibly *pop* beyond sRGB. The first wide-gamut space that matters to web developers.
- **Pro tip:** Always ship an sRGB fallback, `@supports (color: color(display-p3 1 1 1))` is the canonical progressive-enhancement pattern.
- **Link:** https://www.w3.org/TR/css-color-4/#predefined

### ITU-R BT.709 / BT.2020
- **What:** The broadcast recommendations: BT.709 defined HDTV's primaries (a near-sRGB gamut with a different transfer curve); BT.2020 defines UHD/4K with a dramatically wider gamut.
- **Why it's great:** If your colors end up in video, these, not sRGB, are the delivery contract. BT.2020 plus HDR (PQ/HLG) is shaping up as the next sRGB moment.
- **Pro tip:** BT.709 and sRGB share gamut shape but differ in transfer function, conflating them is a classic video-pipeline bug.
- **Link:** https://www.itu.int

### W3C CSS Color Module Level 4 (+ Level 5 status)
- **What:** The spec that made browsers color-science-literate: `oklab()`/`oklch()`, `lab()`/`lch()`, `color-mix()`, predefined spaces (sRGB, Display-P3, Rec.2020) and a **defined gamut-mapping algorithm**.
- **Why it's great:** For the first time, CSS interpolation and gamut-clipping behavior is *specified*, which is why colorjs.io can promise "matches the browser".
- **Pro tip:** ** Level 5** (relative color syntax, hue/chroma modifiers, custom `color-mix` spaces) is still a Working Draft, check caniuse before shipping anything from it.
- **Link:** https://www.w3.org/TR/css-color-4/

### The ΔE ladder: CIE76 → CIE94 → CIEDE2000
- **What:** Three generations of "numerical color difference". **CIE76**= plain Lab distance (fast, wrong in blues). **CIE94**= adds weighting terms. **CIEDE2000**= fixes the hue/lightness interaction quirks; the modern default.
- **Why it's great:** The ladder explains *why* legacy code misjudges blues, and why "ΔE = 2" is meaningless until you name the formula.
- **Pro tip:** Rough ruler for **ΔE2000**: ≈1 imperceptible, **2.3 = the average just-noticeable difference (JND)**, >5 obviously different. Deltas from different formulas are *not* interchangeable.
- **Link:** https://cie.co.at

### Papers & books worth reading

| Work | Year | Why it matters |
|---|---|---|
| Ottosson, *A perceptual color space for image processing* (OKLab) | 2020 | The derivation behind OKLCH: fixes CIELAB's blue hue-twist with modern math. Read before trusting any "perceptual" claim. |
| Crameri, Shephard & Heron, *The misuse of colour in science communication*, Nature Communications | 2020 | The citable demolition of rainbow maps, and the source of the Scientific Colour Maps ([06](06-data-visualization-colormaps.md)). |
| Borland & Taylor, *Rainbow Color Map (Still) Considered Harmful*, IEEE CG&A | 2007 | The original jet takedown: random-order lightness invents data structure that isn't there. |
| APCA docs, Myndex (Andrew Somers) | 2019→ | *The* reference for perceptual contrast (Lc), and why WCAG 2.x math fails dark mode ([04](04-accessibility-contrast.md)). |
| Hunt, *Measuring Colour* · Fairchild, *Color Appearance Models* | books | The serious step up: color appearance, chromatic adaptation, CAM16. Fairchild is *the* appearance-models source. |
| Munsell, *A Color Notation* | 1905 | Hue/Value/Chroma and perceptual ordering, before "perceptual" was a buzzword. The ancestor of LCh, a joy to read. |

## Pitfalls

- Quoting ΔE without naming the formula is astrology: ΔE76 4.2 and ΔE2000 4.2 are different realities. Always say which.
- "Perceptually uniform" is an approximation for a *reference observer* under *reference conditions*, never true for every eye.
- Standards ≠ implementations: a library claiming "CSS Color 4 gamut mapping" may wing it. colorjs.io implements the actual algorithm.
- sRGB ≠ "RGB": every pipeline has a gamma story. Blending in gamma-encoded space muddies gradients ([07](07-css-gradients.md)).
- Don't ship CSS Color 5 features as if they were final, relative color syntax is still rolling out across browsers.
- JND (2.3) is a *statistic about averages*: two ΔE-2.3 pairs can sit on opposite sides of perception. Treat it as a zone, not a cliff.

## Try it now

Decide "same or different?" the way the standards intend, with ΔE2000:

```js
// npm i culori
import { differenceCie2000 } from "culori";

const pairs = [
  ["#0ea5a0", "#0ea5a1"], // ΔE2000 ≈ 1
  ["#0ea5a0", "#0d9488"], // close cousins
  ["#0ea5a0", "#6366f1"], // different league
];

for (const [a, b] of pairs) {
  const dE = differenceCie2000(a, b);
  const verdict = dE < 1 ? "imperceptible" : dE < 2.3 ? "just noticeable" : "clearly different";
  console.log(`${a} vs ${b}: ΔE2000 = ${dE.toFixed(2)} → ${verdict}`);
}
```

## Related guides

- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md), the spaces this science produced
- [12 · Print & Physical Standards](12-print-and-physical-standards.md), ICC profiles in the wild
- [06 · Data-Viz Colormaps](06-data-visualization-colormaps.md), Crameri 2020 put into practice
- [04 · Accessibility & Contrast](04-accessibility-contrast.md), APCA, the newest standard in the stack
- [11 · Libraries & SDKs](11-libraries-and-sdks.md), libraries that implement all of this correctly
- [16 · Glossary](16-glossary.md), ΔE, JND, gamut, the vocabulary, in plain English

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
