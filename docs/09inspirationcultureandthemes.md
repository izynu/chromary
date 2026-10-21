# Inspiration, Culture & Themes

> Great palettes rarely come from a blank canvas, steal from curated galleries, real brands, centuries of traditional color, and themes developers already love.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|||||
| **Adobe Color** | Harmony rules, trends, extractfromimage | The full professional workbench in one page | ★★★★★ |
| **Coolors** | Fast generator + trending community palettes | The quickest ideatohex loop on the internet | ★★★★★ |
| **Nippon Colors** | 500 traditional Japanese colors, gorgeous interface | Centuries of tuned chroma & lightness to browse | ★★★★★ |
| **Catppuccin** | Four pastel flavors of a dev theme | The mostthievedfrom palette of the decade | ★★★★ |
| **Solarized** | The OG scientifically engineered editor palette | Proof a palette can be designed, not vibes'd | ★★★★ |
| **brandcolors / brandpalettes** | Real brand hex databases | Steal from brands that paid agencies millions | ★★★ |

## The Catalog

### Coolors
 **What:** The famous fast palette generator (spacebar to shuffle) plus trending and community palettes, contrast tools and exports.
 **Why it's great:** Fastest idea → hex loop anywhere; the trending gallery doubles as a designzeitgeist barometer.
 **Pro tip:** Use "Export → CSS variables" and open the contrast panel *before* you fall in love with a palette.
 **Link:** https://coolors.co

### Color Hunt
 **What:** Handcurated 4color palettes, communityvoted, oneclick hex copy.
 **Why it's great:** Human curation means every palette at least *tries* to work together; tag filters (pastel, vintage, neon) make browsing fast.
 **Pro tip:** Reorder the four stops by lightness before using, gallery order is aesthetic, not structural (see guide 05).
 **Link:** https://colorhunt.co

### Adobe Color
 **What:** Adobe's color workbench: harmony rules (complementary, triadic…), trending palettes from Behance, and extractthemefromimage.
 **Why it's great:** The harmony engine plus accessibility tools in one page; the trends tab shows what working designers actually ship.
 **Pro tip:** Run "Extract Theme" on photography, then normalize the extracted chroma in OKLCH (guide 03), camera colors run hot.
 **Link:** https://color.adobe.com

### brandcolors
 **What:** A onepage directory of official brand hexes, hundreds of real companies, from Stripe to Starbucks, copy paste ready.
 **Why it's great:** The fastest "steal like a designer" lookup when you need a realworld reference for a color decision.
 **Pro tip:** Compare five blues from five banks and you'll spot the industrywide hue consensus instantly.
 **Link:** https://brandcolors.net

### brandpalettes (bigtech palettes as reference)
 **What:** Brand palette breakdowns, plus the ultimate reference shelf: bigtech palettes (Stripe, IBM, Google) that double as miniature design systems.
 **Why it's great:** Bigtech palettes show not just the primary but the *support system*: tints, shades, semantic grays, darkmode variants.
 **Pro tip:** Study how they pair one loud primary with nearneutral surfaces, the ~90%neutral ratio is the real lesson.
 **Link:** https://brandpalettes.com

### Nippon Colors
 **What:**日本の伝統色, 500 traditional Japanese colors on a stunning singlepage interface, with kanji, romaji names and RGB/CMYK values.
 **Why it's great:** Centuries of textile and craft refinement: muted chroma, sophisticated lightness, palettes that already "agree" with each other.
 **Pro tip:** Pick a base (try 撫子 *nadeshiko*), then build neighbors by shifting hue ±30° while holding its restrained chroma.
 **Link:** https://nipponcolors.com

### Chinese traditional colors
 **What:** zhongguose.com, the Chinese traditional color system (中国传统色) with pinyin names and hex/RGB values.
 **Why it's great:** The same magic as Nippon Colors with a different lineage: imperial reds, celadon greens, inkwash neutrals.
 **Pro tip:** Traditional 五色 (fivecolor) groupings map beautifully onto background/surface/primary/accent/text roles.
 **Link:** https://zhongguose.com

### Developer themes to steal from
 **What:** The most battle tested dark & light palettes on earth, tuned daily by thousands of developers who stare at them for eight hours.
 **Why it's great:** Already contrastaudited, CVDconsidered, and shipped with full hex lists on GitHub.
 **Pro tip:** Steal *roles*, not just colors: every theme below has bg/surface/text/accent layers already semantically named.

| Theme | Flavors / variants | What makes it special |
||||
| [Catppuccin](https://catppuccin.com) | Latte · Frappé · Macchiato · Mocha | Four pastel flavors spanning light→dark; enormous ecosystem |
| [Dracula](https://draculatheme.com) | One iconic dark | Purpleforward, instantly recognizable, ported everywhere |
| [Nord](https://nordtheme.com) | Polar night · Snow storm · Frost | Muted arctic blues, calm and professional in 16 colors |
| [Rosé Pine](https://rosepinetheme.com) | Main · Moon · Dawn | Muted rose + pine; the tasteful designer's choice |
| [Solarized](https://ethanschoonover.com/solarized) | Light · Dark | The OG: CIELABengineered by Ethan Schoonover in 2011 |
| [Gruvbox](https://github.com/morhetz/gruvbox) | Dark · Light (+hard/soft) | Retrowarm, highcontrast; the vim community classic |
| [Tokyo Night](https://github.com/enkia/tokyonightvscodetheme) | Night · Storm · Day | Neononnavy cityscape with great accent hierarchy |
| [Everforest](https://github.com/sainnhe/everforest) | Dark · Light × 3 backgrounds | Cozy greendominant, lowfriction contrast |
| [Kanagawa](https://github.com/rebelot/kanagawa.nvim) | Wave · Dragon · Lotus | Inspired by *The Great Wave*; dark base, vibrant accents |

> Most of these themes ship as families (light/dark/multivariant). Always port the *family*, not one screenshot.

## Port a theme palette into your app

Ninety seconds, four moves (plus one bonus):

1. **Map to semantic roles, not theme names.** `surface0` means nothing in your app; `surface` does (bg / surface / text / primary / accent).
2. **Convert to OKLCH** and confirm the lightness ladder still steps evenly (guide 03).
3. **Reaudit contrast yourself**, a theme tuned for syntax highlighting ≠ AA for body text (guide 04).
4. **Wire into tokens**, CSS variables, Tailwind theme or shadcn, using the [themebuilder skill](../skills/themebuilder/SKILL.md) (guide 05).
5. **Ship every variant**, Catppuccin's four flavors or Rosé Pine's three map naturally onto light/dark/mid themes.

## Pitfalls

 **Stolen ≠ shippable.** Gallery palettes skip contrast work; validate before shipping (guide 04).
 **Traditional colors assume physical media.** Silk dyes ≠ screens, expect to retune chroma in OKLCH.
 **Dev themes are tuned for *code*.** Syntax themes optimize tiny monospace glyphs; pasted wholesale onto a marketing site they read muddy.
 **Name ≠ role.**"Mauve" is a color; "primary" is a contract. The renaming *is* the port.
 **Don't mix lineages.** Colors from different palettes carry different chroma levels and clash, pick one source per layer.
 **Trending ≠ timeless.** This year's pastelgradient zeitgeist ages fast; traditional colors and dev themes age gracefully.

## Try it now

Steal Catppuccin Mocha, rename to semantic tokens:

```css
:root {
  bg:      #1e1e2e;  /* base      */
  surface: #313244;  /* surface0  */
  text:    #cdd6f4;  /* text      */
  primary: #cba6f7;  /* mauve     */
  accent:  #f5e0dc;  /* rosewater */
}
```

## Related guides

 [04 · Accessibility & Contrast](04accessibilitycontrast.md), audit borrowed palettes before shipping
 [05 · Design Systems & Scales](05designsystemsandscales.md), the token mapping, step by step
 [08 · AI Palette Generation](08aipalettegeneration.md), feed stolen inspiration to generators as constraints
 [14 · Game & Pixel Palettes](14gameandpixelpalettes.md), more curated palettes, retro division


*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
