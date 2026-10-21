
name: gradientsmith
description: Create smooth, perceptual CSS gradients with no gray dead zones. Handles linear, radial, conic, mesh and grainy gradients interpolated in OKLab/OKLCH. Use when the user asks for a gradient, says their gradient looks muddy or gray in the middle, or wants modern CSS gradient code.


# Gradient Smith

Gradients that stay vivid from stop to stop, because they're interpolated in a perceptual space, not sRGB.

## When to use
 "Make a gradient from X to Y" / hero backgrounds / buttons / borders
 "My gradient goes gray/brown in the middle" ← the classic sRGB bug
 Mesh backgrounds, animated gradients, grainy textures

## Workflow
1. **Diagnose the pair**: two colors, or a color list? Huespan crossing 180°+ (e.g. yellow→blue) is where sRGB dies.
2. **Choose the space**:
    2 similarhue stops → `in oklab` is enough.
    Big hue sweep or pastelcritical work → `in oklch` (or explicit multistops).
3. **Write the CSS** with CSS Color 4 interpolation syntax.
4. **Hunt dead zones**: mentally walk the ramp; if any midpoint desaturates, insert explicit midpoint stop(s) with full chroma.
5. **Finish the surface**: grain overlay for banding, size/units check, motion rules if animated.
6. **Verify text on it**: pick the *worstcase* region of the gradient and check 4.5:1 for any text that sits there.

## Decision rules

| Want | Recipe |
|||
| Simple smooth ramp | `lineargradient(in oklab, #F97316, #22C55E)` |
| Big hue sweep, keep punch | `lineargradient(in oklch longer hue, gold, dodgerblue)` or add midpoint stops |
| Radial glow | `radialgradient(in oklab, oklch(80% .15 150 / .9), transparent 70%)` |
| Angular / conic wheel | `conicgradient(in oklch longer hue, red, red)` (hue wheel, constant L/C) |
| Mesh hero | 3 to 5 layered radialgradients + base color (see recipe) |
| Kill banding | overlay `feTurbulence` SVG noise at 4 to 8% opacity |
| Animate cheaply | `@property angle` + rotate a conic; or translate an oversized gradient layer, never animate `filter: blur()` on large areas |

## Hard gates
 **Never interpolate brandtobrand hues in raw sRGB** when `in oklab` is one keyword away.
 Any text over a gradient: verified ≥ 4.5:1 against the gradient's lightest *and* darkest region.
 Animated gradients must respect `prefersreducedmotion`.
 No gradientongradientongradient soup: max 2 competing gradient layers per section (texture overlays don't count).

## Output format
A single copy paste CSS block (with the `in oklab/oklch` keywords) + one line naming the interpolation space and why + any midpoint stops you added and why.

## Example
User: "yellow → blue gradient keeps turning greengray."
→ `lineargradient(in oklab, oklch(90% .18 95), oklch(65% .17 250))`; if a dull middle persists, insert `oklch(78% .16 170 / 1) 50%`. Report: interpolated in OKLab, midpoint added to preserve chroma; white text passes only over the left 40% → recommended scrim.


*Part of [Chromary](../../README.md) · deep dive: [07 · CSS gradients](../../docs/07cssgradients.md) · recipe: [gradientinterpolation.js](../../recipes/javascript/gradientinterpolation.js)*
