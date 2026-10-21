# 🌈 CSS Gradients

> Your gradients go gray because sRGB interpolation is where color math goes to die — interpolate in OKLab and they come back to life.

**[⬅ Back to Index](../README.md)**

## 🏆 TL;DR — Top Picks

| Pick | What | Why it wins | ⭐ |
|---|---|---|---|
| **`in oklab` interpolation** | `linear-gradient(in oklab, #f6d365, #4f6df5)` | One keyword kills the gray dead-zone between hue shifts | ★★★★★ |
| **`color-mix()`** | `color-mix(in oklab, #f00 50%, #00f)` | Perceptual tints/shades/blends with zero libraries | ★★★★★ |
| **Multi-stop ramps** | Midpoint stops in long gradients | The official cure for muddy mid-ramps | ★★★★ |
| **Mesh gradients** | Layered radial-gradients (+ optional blur/blend) | Designer-grade hero backgrounds, zero image assets | ★★★★ |
| **Grainy gradients** | SVG `feTurbulence` noise overlay | Kills banding and looks expensive | ★★★★ |
| **Shader (WebGL) gradients** | Fragment-shader color fields, Stripe-style | Fluid motion & reactivity CSS can't fake | ★★★ |

## 🕳️ The gray dead-zone problem

Blend `#f6d365` (yellow) into `#4f6df5` (blue) in plain CSS and the middle turns **muddy gray**. That's sRGB interpolation: it averages RGB channels blindly, dragging lightness and chroma toward the floor between two vivid endpoints.

The fix is one keyword — CSS Color 4 lets every gradient and `color-mix()` declare its interpolation space:

```css
background: linear-gradient(in oklab, #f6d365, #4f6df5);   /* vivid all the way */
background: linear-gradient(in oklch, #f6d365, #4f6df5);   /* hue-aware variant */
background: linear-gradient(in srgb,  #f6d365, #4f6df5);   /* the old, muddy way */
```

Supported in all modern evergreen browsers (Chrome/Edge 111+, Safari 16.2+, Firefox 113+). Ship it.

## 📖 The Catalog

### OKLab / OKLCH interpolation (CSS Color 4)
- **What:** Perceptual interpolation built into every gradient function and `color-mix()`: `in oklab`, `in oklch`, plus legacy `in srgb`/`in hsl`. Hue-bearing spaces add explicit hue control (`longer hue`, `shorter hue`).
- **Why it's great:** OKLab is tuned so equal steps *look* equal — gradients stop sagging into gray and hues travel the path your eye expects.
- **Pro tip:** For ramps that should sweep a big hue arc, declare `in oklch longer hue` explicitly — the default is shortest-hue, which can take a shortcut through red.
- **Link:** https://www.w3.org/TR/css-color-4/

### color-mix()
- **What:** Mix two colors with percentages in any interpolation space: `color-mix(in oklab, #0ea5a0 70%, white)`.
- **Why it's great:** Perceptually even tints and shades for hovers, borders and badges — without generating a token for every step.
- **Pro tip:** It's the cheapest perceptual upgrade in CSS: mixing `#f00` + `#00f` in oklab gives a vivid violet, in srgb a muddy puddle.
- **Link:** https://developer.mozilla.org/en-US/docs/Web/CSS/color-mix

### Multi-stop ramps (the gradient-smith rule)
- **What:** The repo's rule of thumb: a 2-stop ramp in oklab ≈ the sRGB classic *fixed*; but long ramps (4+ hues, big lightness swings) deserve oklch — and careful chroma.
- **Why it's great:** Even in oklab, chroma still drifts on long journeys (orange → violet loses its punch); holding chroma in oklch keeps every stop vivid.
- **Pro tip:** Insert midpoints manually — place an intermediate stop near the perceptual middle and nudge it until the gray valley disappears. Two stops in sRGB ≈ two stops in oklab; a rainbow ramp = oklch + midpoints.
- **Link:** https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl

### Mesh gradients (the layered radial trick)
- **What:** CSS has no native mesh gradients — fake them with stacked `radial-gradient`s (color → transparent), optionally blurred, or unified with `background-blend-mode`.
- **Why it's great:** Instant aurora/hero backgrounds with zero image assets and near-zero bytes.
- **Pro tip:** Generate a starting point at meshgradient.in (or CSS Hero's Mesher), then add `filter: blur(60px)` on a slightly scaled pseudo-element to melt hard radial edges into mesh soup.
- **Link:** https://meshgradient.in — generator · https://csshero.org/mesher — alternative

### Grainy gradients (feTurbulence)
- **What:** Overlay SVG noise — inline `feTurbulence` filter or a data-URI background image — at low opacity with a blend mode to add film grain to any gradient.
- **Why it's great:** Banding on dark gradients disappears under noise, and texture reads "premium" for free.
- **Pro tip:** The canonical technique is CSS-Tricks' *Grainy Gradients* article: boost turbulence contrast, then `mix-blend-mode: overlay` at 10–30% opacity.
- **Link:** https://css-tricks.com/grainy-gradients/

### Animated gradients (@property)
- **What:** Animate `background-position` for moving panoramas, or register custom properties with `@property` and animate gradient angles and OKLCH hue values.
- **Why it's great:** Registered custom properties interpolate numerically — unregistered ones jump discretely between keyframes.
- **Pro tip:** Compositor-cheap motion only: prefer `transform`/`opacity`, keep blur radii small (animating a 100px blur repaints the world every frame), and always honor `prefers-reduced-motion`.
- **Link:** https://developer.mozilla.org/en-US/docs/Web/CSS/@property

### Shader / WebGL gradients (the Stripe tier)
- **What:** Full fragment-shader color fields — animated blobs, fBm noise fields, mouse-reactive auroras. Stripe's famous hero lives on this tier.
- **Why it's great:** CSS can't do fluid dynamics or true noise animation cheaply; shaders can.
- **Pro tip:** Audit honestly first: a static mesh + slow `background-position` pan + grain reads "premium" at zero JS. Reach for WebGL (or a tiny canvas blob loop) only when you need interactivity or organic motion.
- **Link:** https://stripe.com

## 🧑‍🍳 Three gradients, three recipes

```css
/* linear — hero banner, perceptually interpolated */
.linear {
  background: linear-gradient(in oklab, oklch(85% 0.16 95), oklch(60% 0.2 265));
}

/* radial — glow / spotlight (combine with a position: circle at 30% 30%) */
.radial {
  background: radial-gradient(in oklab, #ffb56b, #6b2fb3 55%, #0b0420);
}

/* conic — the color wheel; `longer hue` forces the full 360° sweep */
.conic {
  background: conic-gradient(in oklch longer hue, red, red);
}
```

## ⚠️ Pitfalls

- **The sRGB default = gray dead-zones** on any two-color hue shift. One keyword fixes it — say `in oklab`.
- **Long ramps sag even in oklab.** Chroma drifts on big hue journeys; switch to `in oklch` and hold chroma (~0.1–0.18) through your midpoints.
- **`transparent` ≠ your color.** Fading to `transparent` can leave muddy edges in older engines — fade to a fully translucent copy of the same color instead (e.g. `#6b2fb300`).
- **Unregistered custom properties don't animate.** Gradient values jump instead of tweening — register them with `@property` first.
- **Animating huge blurs repaints every frame.** `transform` and `opacity` are compositor-cheap; a 200px blur is not. Keep blurs static or pre-render the art.
- **Ignoring `prefers-reduced-motion`.** Animated heroes should freeze into their prettiest frame, not trigger vestibular chaos.

## 🧪 Try it now

The yellow → blue killer, fixed in one keyword — paste and compare:

```css
.bad  { background: linear-gradient(#f6d365, #4f6df5); }            /* muddy gray middle  */
.good { background: linear-gradient(in oklab, #f6d365, #4f6df5); }  /* vivid all the way  */
```

## 🔗 Related guides

- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md) — what OKLab/OKLCH actually are
- [06 · Data-Viz Colormaps](06-data-visualization-colormaps.md) — continuous ramps for *data*, not decoration
- [05 · Design Systems & Scales](05-design-systems-and-scales.md) — gradients that use your token scale
- [11 · Libraries & SDKs](11-libraries-and-sdks.md) — JS-side interpolation with culori/chroma.js

---
*Part of [🎨 Chromary](../README.md) — the ultimate color engineering toolkit.*
