# 🧭 Perceptual Color Spaces

> Why HSL lies, why OKLCH doesn't, and which color model to reach for when equal steps must actually *look* equal.

**[⬅ Back to Index](../README.md)**

## 🏆 TL;DR — Top Picks

| Pick | What | Why it wins | ⭐ |
|---|---|---|---|
| **OKLCH** | Perceptual L/C/H built on Björn Ottosson's OKLab (2020) | Equal steps look equal; CSS `oklch()` ships in every modern browser | ★★★★★ |
| **oklch.com** | Interactive OKLCH editor + converter | The fastest way to *feel* why L and C behave themselves | ★★★★★ |
| **HCT** | Google's Hue-Chroma-Tone (CAM16-based), behind Material 3 | Tonal palettes with excellent hue linearity at high chroma | ★★★★ |
| **ΔE (CIEDE2000)** | Perceptual difference metric on CIE Lab | The standard "how different are these two colors" number for QA | ★★★★ |
| **CSS Color 4 gamut mapping** | Standard algorithm for out-of-gamut colors | Predictable chroma reduction instead of ugly channel clamping | ★★★★ |
| **HSLuv** | CIELUV-based, max-chroma-per-lightness | Same-lightness hue rotation that stays inside sRGB | ★★★ |

⭐ legend: ★★★★★ must-know · ★★★★ excellent · ★★★ situational · ★ niche · ★ historical.

## 📖 The Catalog

### HSL — the charming liar
- **What:** Hue / Saturation / Lightness, retrofitted from 1970s RGB math and baked into every CSS engine and most design tools.
- **Why it's on the list:** Because you must know what it gets wrong. Equal steps in HSL are **not** equal perceived steps — and HSL's "L" is the main offender: `hsl(60 100% 50%)` yellow and `hsl(240 100% 50%)` blue both claim L=50%, yet the yellow glows like a lamp and the blue reads nearly navy.
- **Pro tip:** HSL is fine for quick tint tweaks. The moment steps must line up — scales, ramps, palettes — convert to OKLCH first.
- **Link:** https://en.wikipedia.org/wiki/HSL_and_HSV

### OKLab / OKLCH — the new default
- **What:** Björn Ottosson's 2020 perceptual space, engineered to fix CIE Lab's hue-linearity bugs in blues and purples. OKLCH is its cylindrical form: **L** lightness 0–100%, **C** chroma from 0 up to a theoretical ~0.37 (most real sRGB hues run out of gamut well below that), **h** hue 0–360°.
- **Why it's THE space:** Lightness is genuinely perceptual (yellow and blue at the same L *look* equally light), hue stays linear as chroma changes, and it's boring to use — exactly what you want from the infrastructure for **scales, palettes and gradients**.
- **Pro tip:** CSS `oklch()` is supported in **all modern browsers** (Chrome/Edge 111+, Safari 15.4+, Firefox 113+). Animate L for theme transitions and C for emphasis, hue untouched.
- **Link:** https://bottosson.github.io/posts/oklab/ · editor: https://oklch.com

### CIE Lab / LCH and ΔE — the QA standard
- **What:** The 1976 CIE spaces and their difference metrics. ΔE (delta-E) quantifies perceptual distance between two colors; **CIEDE2000** is the modern formulation, dramatically better than naive ΔE76 in the blue region.
- **Why it's great:** Print, packaging and brand compliance run on ΔE tolerances ("ΔE ≤ 2 against the reference chip"). It's a *difference* tool, not a *design* tool.
- **Pro tip:** ΔE of 1.0 ≈ a just-noticeable difference under lab conditions — real-world JNDs vary by hue, region and observer, so treat thresholds as contracts, not physics.
- **Link:** https://en.wikipedia.org/wiki/Color_difference

### HSLuv — safe same-lightness hues
- **What:** A human-friendly wrapper over CIELUV that, for any lightness, walks the max-chroma boundary of the sRGB gamut — so every hue at the same HSLuv lightness is equally light *and* displayable.
- **Why it's great:** "Rotate twelve hues at constant lightness and none of them accidentally gray out or blow up" — HSLuv was built for exactly that request.
- **Pro tip:** Prefer OKLCH for new work; reach for HSLuv when you need guaranteed in-gamut chroma ceilings at every lightness level.
- **Link:** https://hsluv.org

### HCT — Google's tonal engine
- **What:** Hue-Chroma-Tone, derived from CAM16 and powering **Material 3** tonal palettes. Tone is CIE L* lightness (0–100), and every Material role color is defined by tone.
- **Why it's great:** Better hue linearity than Lab at high chroma, and tone-based roles make dark mode a lightness remap instead of a redesign.
- **Pro tip:** Steal the model outside Android: pick a key color, generate tones 0–100, assign roles by tone band. (See guide 05.)
- **Link:** https://material-foundation.github.io

### CAM02 / CAM16 — context-aware appearance
- **What:** CIE color *appearance* models: they predict how a color *looks* given the viewing context — surround brightness, adapting white point, background.
- **Why it's great:** The science behind cross-media color rendering (screen vs print vs stage lighting). HCT is CAM16 with practicality bolted on.
- **Pro tip:** Daily UI rarely needs a full appearance model; reach for CAM16 when one design must hold across wildly different viewing conditions.
- **Link:** https://en.wikipedia.org/wiki/CIECAM02

### Gamut mapping — sRGB, Display-P3 and the gray cliff
- **What:** sRGB covers most of the web; **Display-P3** is noticeably wider, especially in saturated reds and greens.
- **Why it matters:** Vivid OKLCH values (high C at extreme L) simply don't exist in sRGB. Naively clamping RGB channels desaturates unpredictably and drags hue off-target — the dreaded "gray cliff".
- **Why it's great:** The **CSS Color 4 gamut mapping algorithm** does it right: hold hue, preserve lightness where possible, and binary-search chroma downward until the color fits — the behavior browsers implement for out-of-gamut CSS colors.
- **Pro tip:** Design with C ≤ ~0.2 for wide-hue, sRGB-safe scales; push chroma higher deliberately when P3 displays are part of the plan.
- **Link:** https://www.w3.org/TR/css-color-4/ (see "Gamut mapping")

### The toolkit at a glance
- **oklch.com** — interactive editor + converter: drag L, C, h and watch sRGB/P3 bounds react live. The single best OKLCH teacher. https://oklch.com
- **hsluv.org** — interactive HSLuv explorer with per-lightness gamut ceilings. https://hsluv.org
- **Material HCT tooling** — Google's HCT picker and Material Theme Builder for tone-based palettes. https://material-foundation.github.io
- **Libraries** — culori, colorjs.io and chroma.js all speak these spaces; see [11 · Libraries & SDKs](11-libraries-and-sdks.md).

### OKLCH in practice — working rules
- **What:** The field-tested defaults that keep OKLCH from biting once you build with it daily.
- **Why it's great:** OKLCH rewards structure — these four rules cover 95% of real work and prevent the classic "it looked fine in the editor" regressions.
- **Rules of thumb:**
  - **Scales:** hold `h` constant, step `L` evenly, taper `C` toward the extremes (very light and very dark rows have less gamut room for chroma).
  - **Palettes:** pick hues at C 0.12–0.2 for UI work; reserve C > 0.25 for hero moments and P3 displays.
  - **Gradients:** interpolate in OKLCH; if midpoints go dull, add a mid stop or flip the hue arc (short way vs long way around the wheel).
  - **Contrast:** aim for OKLCH ΔL gaps ≥ ~0.35 between text and background — then verify with real WCAG/APCA math ([04 · Accessibility & Contrast](04-accessibility-contrast.md)).
- **Pro tip:** Store OKLCH as the source of truth in tokens and let the build emit hex for legacy targets — one canonical space, many outputs.
- **Link:** [07 · CSS Gradients](07-css-gradients.md)

## ⚠️ Pitfalls

- Building brand scales by nudging HSL S/L per step — bands feel randomly lighter or darker. Fix C and h in OKLCH and walk L.
- Maxing chroma (C ≈ 0.37) — most hues exit sRGB and the browser silently maps them; design the ceiling, don't discover it.
- Confusing OKLCH **L** with CIE **L\*** — same idea, different scale, different numbers.
- Rotating hue in HSL for "even" ramps — HSL hue linearity is broken; rotate in OKLCH or HCT.
- Assuming ΔE 2000 = 1.0 is universally invisible — JNDs vary by hue, region and display.
- Judging P3-only colors on an sRGB monitor — you're reviewing a mapping, not the color.

## 🧪 Try it now

```css
/* Paste into a test page and watch HSL lie, OKLCH tell the truth */
.hsl-yellow { background: hsl(60 100% 50%); }  /* "L=50%" — screams */
.hsl-blue   { background: hsl(240 100% 50%); } /* "L=50%" — nearly navy */

.ok-yellow  { background: oklch(70% 0.15 95);  } /* same L, same perceived weight */
.ok-blue    { background: oklch(70% 0.15 250); }

/* A perceptually even ramp = walk L, hold C and h */
:root {
  --brand-100: oklch(92% 0.05 250);
  --brand-500: oklch(62% 0.17 250);
  --brand-900: oklch(32% 0.11 250);
}
```

## 🔗 Related guides

- [05 · Design Systems & Scales](05-design-systems-and-scales.md) — scales built directly on this math
- [07 · CSS Gradients](07-css-gradients.md) — interpolating in OKLCH instead of RGB mud
- [06 · Data Visualization Colormaps](06-data-visualization-colormaps.md) — uniform-perception colormaps, same principle
- [04 · Accessibility & Contrast](04-accessibility-contrast.md) — auto-fix contrast by moving only L in OKLCH
- [11 · Libraries & SDKs](11-libraries-and-sdks.md) — culori, colorjs.io and friends that implement all of this
- [13 · Color Science & Standards](13-color-science-and-standards.md) — the papers and CIE standards underneath
- [16 · Glossary](16-glossary.md) — gamut, chroma, tone, JND — decoded

---
*Part of [🎨 Chromary](../README.md) — the ultimate color engineering toolkit.*
