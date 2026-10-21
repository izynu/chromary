# 🖨️ Print & Physical Standards

> Screens emit light, print absorbs it — here's the bridge: Pantone, RAL, NCS, Coloro, Munsell, and the ICC-powered CMYK workflow that keeps brand color from being betrayed by physics.

**[⬅ Back to Index](../README.md)**

## 🏆 TL;DR — Top Picks

| Pick | What | Why it wins | ⭐ |
|---|---|---|---|
| [Pantone](https://www.pantone.com) | Spot color system | The lingua franca of brand color since 1963 — "PMS 321 C" means the same ink on every continent. | ★★★★★ |
| [ICC profiles](https://www.color.org) | Device color recipes | The only sane RGB→CMYK path. Soft-proof with profiles, never with vibes. | ★★★★★ |
| [RAL](https://www.ral-farben.de) | European paint standard | ~200 RAL Classic colors that specify walls, machines and industrial paint. | ★★★★ |
| [NCS](https://www.ncscolour.com) | Swedish perceptual system | Codes derived from human vision itself; the architecture & interiors favorite. | ★★★★ |
| [Coloro](https://www.coloro.org) | Textile standard | 3,500 colors on a uniform grid; the rising standard for fashion & soft goods. | ★★★ |
| [Munsell](https://munsell.com) | The grandfather (1905) | Hue/Value/Chroma ordering — still official in soil science and art education. | ★★★ |

*Legend: ★★★★★ must-know → ★ historical. Full legend in the [README](../README.md).*

## 📖 The Catalog

### Screen vs. physical, in 30 seconds
- **What:** Screens are *additive* (RGB light emitted — more light, brighter); print is *subtractive* (inks absorbing light — more ink, darker). A hex code is a recipe for photons; a Pantone chip is a recipe for pigment — and the CMYK gamut is far smaller than sRGB.
- **Why it's great:** This one paragraph explains ~90% of print surprises: the same hex prints differently per press/paper/ink, and the same ink looks different per light source (hello, metamerism).
- **Pro tip:** Judge physical color only under controlled light (D50 booth) against physical chips. Screens are for *choosing* — swatches are for *proving*.
- **Link:** [13 · Color Science & Standards](13-color-science-and-standards.md)

### Pantone (PMS)
- **What:** The Pantone Matching System — thousands of numbered spot colors ("Pantone 321 C") with coated (C), uncoated (U) and plastic chip variants. The default answer to "what color is the brand?"
- **Why it's great:** Spot inks are pre-mixed, so a Pantone number reproduces *identically* anywhere — which is why brand guidelines worldwide say "PMS 321 C" instead of a hex.
- **Pro tip:** Coated and uncoated chips of the same number differ on purpose — the same ink on different paper. Spec both variants if you print on both.
- **Link:** https://www.pantone.com

### Spot vs. CMYK process
- **What:** Two ways to put color on paper: *spot* = one pre-mixed Pantone ink applied directly; *process* = four translucent CMYK inks layered to simulate it.
- **Why it's great:** Spot = exact, consistent, and the only route to metallics & fluorescents. Process = economical for photos and multi-color work. Logos go spot; imagery goes process.
- **Pro tip:** A "Pantone → CMYK" build can drift ΔE 5+ away from the chip. If the brand blue must be *exact*, budget for the spot ink.
- **Link:** https://www.pantone.com

### Pantone Connect & licensing
- **What:** Pantone's app + Adobe extension for browsing swatches, matching artwork and syncing palettes — plus the legal reality that Pantone's data is proprietary.
- **Why it's great:** Connect keeps physical books and digital tools talking. And licensing matters: the 2022 Adobe/Pantone split deleted swatches from Creative Cloud overnight, killing workflows that lived inside someone else's tool.
- **Pro tip:** Store the mapping in *your* design system (token → PMS number → photo of the chip), not inside a plugin you don't control.
- **Link:** https://www.pantone.com/connect

### RAL
- **What:** The German standard (since 1927). RAL Classic holds ~200 numbered colors ("RAL 3020 Traffic red") used for paints, powder coatings and industrial surfaces across Europe.
- **Why it's great:** It answers "which paint do I actually buy?" — any paint shop can mix a RAL number, making it the contract language for walls, tractors and trains.
- **Pro tip:** Every "RAL hex" online is an approximation; RAL is defined physically. Buy the sample pot, not the screenshot.
- **Link:** https://www.ral-farben.de

### NCS
- **What:** The Natural Color System — Sweden's notation built on Hering's opponent-color model of human vision. Codes like `NCS S 2050-Y10R` read as 20% blackness, 50% chromaticness, hue yellow-red.
- **Why it's great:** You can *derive* the code from how humans perceive color — no device involved — which is why architects and interior designers swear by it.
- **Pro tip:** The blackness/chromaticness split is a fantastic mental model for building tonal scales — see [05 · Design Systems & Scales](05-design-systems-and-scales.md).
- **Link:** https://www.ncscolour.com

### Coloro
- **What:** A textile-born system of 3,500 colors on a uniform 7-digit grid (hue × lightness × chroma-ish), developed with the China Textile Information Center and partnered with WGSN.
- **Why it's great:** Fashion needs reproducible color across mills, dyes and seasons — Coloro's even grid was engineered for exactly that, and the WGSN Color-of-the-Year partnership gives it industry pull.
- **Pro tip:** Dye houses don't speak hex. If it ships as fabric, spec Coloro (or Pantone TCX cotton chips).
- **Link:** https://www.coloro.org

### Munsell
- **What:** Albert Munsell's 1905 system — every color as Hue / Value / Chroma on a perceptual grid; the direct conceptual ancestor of Lab, LCh and modern scales.
- **Why it's great:** Still the official language of soil science (USDA soil-color charts), still taught in art schools, and still the clearest explanation of perceptual ordering ever written.
- **Pro tip:** Read Munsell's *A Color Notation* right after Ottosson's OKLab post ([13](13-color-science-and-standards.md)) — the 115-year echo is delightful.
- **Link:** https://munsell.com

### The CMYK workflow: ICC profiles + soft-proofing
- **What:** RGB→CMYK is a *device* conversion, not a formula: pick an ICC profile (FOGRA39/51 in Europe, GRACoL / US Web Coated in the US), choose a rendering intent, then soft-proof on screen *through that profile*.
- **Why it's great:** Profiles describe how a specific press/paper/ink combo actually behaves. Profiled conversion + soft-proofing is the closest a monitor ever gets to a proof sheet.
- **Pro tip:** In Photoshop/InDesign: View → Proof Setup → pick the printer's profile, then Proof Colors. And treat rich black (e.g. C60 M40 Y40 K100) vs. plain 100K as a deliberate design decision.
- **Link:** https://www.color.org

### Approximate hex → Pantone matching
- **What:** Reverse lookups: The Color API's `/id` endpoint returns the closest named match for any hex; encycolorpedia.com cross-references hexes with approximate Pantone/RAL values.
- **Why it's great:** Perfect for the "which PMS is *closest* to our teal?" scouting moment — an instant shortlist without a swatch book on the desk.
- **Pro tip:** Treat results as candidates, then verify with the physical chip under decent light. "Closest" always means closest-on-one-screen.
- **Link:** https://www.thecolorapi.com/id

## ⚠️ Pitfalls

- Blind hex→CMYK converters betray brand colors — naive math can land ΔE 5–10+ off a profiled conversion. Profile it or don't ship it.
- `#0000FF` is nearly unprintable: out-of-gamut sRGB blues go muddy in CMYK, which is why print designers reach for spot inks like Reflex Blue.
- One PMS number ≠ one color: coated, uncoated and plastic chips of the *same* Pantone visibly differ. Spec the finish.
- Uncalibrated screens are confident liars — a colorimeter and a D50/D65 viewing booth cost less than one reprinted run.
- Metamerism is real: inks that match in the studio can split under store lighting. Check matches in two light sources minimum.
- Pantone guides fade; a sun-bleached swatch book has killed more brand launches than bad taste ever did.

## 🧪 Try it now

```bash
# Closest named-color match for a brand hex — a *hint*, not a swatch book.
curl "https://www.thecolorapi.com/id?hex=0EA5A0"
# → JSON with name.closest_named_hex & exact_match — then verify against a real Pantone chip.
```

## 🔗 Related guides

- [01 · REST APIs & MCP](01-rest-apis-and-mcp.md) — The Color API and friends, in depth
- [13 · Color Science & Standards](13-color-science-and-standards.md) — CIE, ICC and the math behind ΔE
- [03 · Perceptual Color Spaces](03-perceptual-color-spaces.md) — why gamut gaps exist at all
- [05 · Design Systems & Scales](05-design-systems-and-scales.md) — storing physical refs as design tokens
- [16 · Glossary](16-glossary.md) — metamerism, gamut, ΔE — the words used above
- [15 · Tool Selection Matrix](15-tool-selection-matrix.md) — hex→Pantone is row 9

---
*Part of [🎨 Chromary](../README.md) — the ultimate color engineering toolkit.*
