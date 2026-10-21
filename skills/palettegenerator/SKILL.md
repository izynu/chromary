
name: palettegenerator
description: Generate beautiful, perceptuallyuniform, accessible color palettes from a seed color, brand color, mood words, or context. Use when the user asks for a color palette, color scheme, brand colors, accent colors, UI colors, or colors that work together.


# Palette Generator

Build palettes that are *beautiful*, *perceptually uniform*, and *accessible by construction*, not lucky hex guesses.

## When to use
 "Give me a palette / color scheme / brand colors"
 "Colors that go with #0EA5A0" / "colors for a meditation app"
 User provides a logo, mood word, or competitor site and wants colors derived from it

## Workflow
1. **Clarify the context** (one question max): UI? brand? dataviz? print? If unclear, default to **UI palette**.
2. **Get a seed hue** `H`:
    User gave a color → extract its OKLCH hue.
    Mood words → map: calm→180 to 210, trust→150 to 170, energy→25 to 45, luxury→280 to 320, nature→120 to 150, warm/friendly→20 to 50. (If no web tools available, approximate by name; the gate in step 5 protects quality.)
    Optional API assist: `curl "https://www.thecolorapi.com/scheme?hex=<SEED>&mode=<MODE>&count=6"` with mode ∈ `analogic | complement | triad | quad | monochrome | analogiccomplement`. Treat results as *candidates*, not gospel.
3. **Choose a harmony** via the decision rules below; derive supporting hues in OKLCH hue space (rotate hue, keep L/C consistent).
4. **Build the neutral ramp**: neutral hue = brand hue but with `C ≤ 0.03` (tinted grays feel premium; pure `#000/#fff` feel cheap).
5. **Run the hard gates** (below). Fix by moving **lightness first, chroma second, hue last**.
6. **Output** in every format the user might use (below).

## Decision rules

| User says / context | Harmony | Supporting hues (OKLCH h) |
||||
| "clean, minimal, corporate" | Monochrome + 1 accent | accent = H+30, C+0.04 |
| "friendly, warm" | Analogic | H±25 |
| "bold, energetic, modern" | Complement pair | H and H+180 |
| "creative, playful" | Triad | H, H+120, H+240 |
| "complex dashboard, many categories" | Triad + neutrals | then cap saturation on all |
| Brand color already exists | Analogiccomplement | keep brand as primary, never restyle it |

## Hard gates (nonnegotiable)
 **Text pairs ≥ 4.5:1** (WCAG AA): primaryonbackground, backgroundonprimary, every text/text pair in the output.
 **Large text & UI borders ≥ 3:1.**
 **Chroma budget for UI colors:** `0.06 ≤ C ≤ 0.16` at `L 0.55 to 0.75`. Above that, colors vibrate and clash with text.
 **Lightness ladder must be monotonic** (50 is lightest → 950 darkest, or state the inversion for dark mode).
 **Never encode meaning by hue alone** (accessibility + CVD). Add lightness or icon differences.
 If an APCA check is available (`apcaw3`), finetune body text to `Lc ≥ 75`.

## Output format (always provide all three)
```text
1. Hex list:            #A2005F, #FF5CA8, #FFD1E7, #17100E, #FAF5F8
2. CSS custom props:
   brand500: oklch(55% 0.2 340);
   brand100: oklch(93% 0.05 340);
   textstrong: oklch(21% 0.03 340);
3. Role table:          primary / primaryhover / surface / text / mutedtext / accent / success / warning / danger
```
Finish with one line: which pairs were checked and their ratios (e.g. "text #17100E on #FFD1E7 = 14.2:1 ").

## Example
User: *"palette for a yoga studio, calm and premium"*
→ seed hue 170 (tealgreen), analogic support at 150 & 195, chroma capped at 0.09, neutrals tinted with C 0.02 → output ramp `oklch(98% .012 170)` … `oklch(30% .05 170)`, accent `oklch(70% .1 85)` (warm sand), verified `text 30% on surface 98% = 12.8:1 `.


*Part of [Chromary](../../README.md) · deep dive: [08 · AI palette generation](../../docs/08aipalettegeneration.md)*
