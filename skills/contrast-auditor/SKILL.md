---
name: contrast-auditor
description: Audit and fix color contrast for accessibility. Computes WCAG 2.1 ratios and APCA (WCAG 3) Lc scores, then auto-adjusts colors minimally until they pass. Use when the user asks about accessibility, WCAG, contrast, readability, or fixing text that's hard to read.
---

# Contrast Auditor

Audit any foreground/background pair against WCAG 2.1 **and** APCA, then fix it with the smallest possible change, never restyle the whole design.

## When to use
- "Is this accessible?" / "does this pass WCAG?" / "this text is hard to read"
- Before shipping any theme (pair with `theme-builder`)
- Dark-mode conversions (WCAG 2 math is unreliable there, APCA is required)

## Workflow
1. **Collect pairs**, every text-on-background combo the user mentions or provides. If they gave a whole theme, list: body text, muted text, headings, buttons (fg+bg), links, borders/icons.
2. **Compute** both metrics:
   - **WCAG 2.1 ratio** (1 to 21): linearize sRGB channels (`c ≤ 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`), luminance `L = 0.2126R + 0.7152G + 0.0722B`, ratio `(Llight + 0.05) / (Ldark + 0.05)`.
   - **APCA Lc** (0 to about 106) via `apca-w3` (`import { calcAPCA } from 'apca-w3'`), or the checker at https://apcacontrast.com. Remember APCA is directional: text-on-background ≠ background-on-text.
3. **Classify** against the thresholds table.
4. **Auto-fix minimally** in OKLCH: binary-search lightness `L` (keep hue & chroma!) until the pair passes with a small safety margin (+0.3:1 for WCAG, +5 Lc for APCA). Prefer fixing the *text* color; only touch the background if the user says the background is fixed.
5. **Re-verify** and report before/after numbers.

## Thresholds

| Context | WCAG 2.1 | APCA Lc (body-size dependent) |
|---|---|---|
| Body text (< 24px) | ≥ 4.5:1 (AA) · ≥ 7:1 (AAA) | ≥ 75 (90 preferred) |
| Large text (≥ 24px or 18.66px bold) | ≥ 3:1 | ≥ 60 |
| UI components, icons, borders | ≥ 3:1 | ≥ 30 |
| Disabled / decorative | exempt | ≥ 15 minimum |
| Dark mode, thin/light fonts | use APCA as source of truth | |

## Hard gates
- Never ship a "fix" that changes the brand hue. Lightness first, chroma second, hue never.
- Never fix by adding text-shadow or outlines when a color fix exists.
- Flag (don't silently fix) any case where meaning depends on hue alone, suggest adding icons/labels.
- If user's pair is borderline (e.g. 4.6:1), push to 5:1 anyway, screenshots and compression eat margin.

## Output format
```text
| Pair | Before | Verdict | After | Verdict |
| #999 on #fff | 2.8:1 ✗ | body fails AA | #595959 | 7.0:1 ✓ AAA |
```
Plus a one-line APCA note for any pair used at small sizes, and the exact OKLCH recipe for every changed color.

## Example
Input: muted text `oklch(70% 0.02 260)` on `oklch(99% 0.01 260)`.
→ WCAG ≈ 2.6:1 ✗. Binary-search L while `C=0.02, h=260` → passes at `L ≈ 43%`. Output `oklch(43% 0.02 260)` → 7.1:1 ✓, APCA Lc ≈ 78 ✓. Hue untouched.

---
*Part of [Chromary](../../README.md) · deep dive: [04 · Accessibility & Contrast](../../docs/04-accessibility-contrast.md)*
