# REST Color APIs & MCP

> Typed HTTP endpoints for palette generation, color naming and conversion, plus how to wrap them as MCP tools so AI agents call them like natives.

**[Back to Index](../README.md)**

## TL;DR, Top Picks

| Pick | What | Why it wins | |
|---|---|---|---|
| **The Color API** | Scheme generation + color naming over plain GET | No key for casual use, CORS-friendly, one JSON payload with names, RGB, HSL, CMYK | ★★★★★ |
| **MCP color server** | Color APIs wrapped as Model Context Protocol tools | Schema'd, discoverable tools, the agent literally cannot hallucinate an endpoint | ★★★★★ |
| **Colormind** | Deep-learning palette generation via POST | Lock / unlock / neutral slots make it a true human-in-the-loop collaborator | ★★★★ |
| **color.pizza** | Curated color-name lookup | 30k+ hand-curated names, far tastier than "grayish blue" | ★★★★ |
| **ColourLovers API** | Community palettes, patterns and colors | A historic archive of human-made palettes; legacy and aging, handle with care | ★★ |
| **APIVerve / x-colors** | Commercial color-utility APIs | Keyed, hosted fallbacks for naming and conversions when you need an SLA | ★★ |

 legend: ★★★★★ must-know · ★★★★ excellent · ★★★ situational · ★ niche · ★ historical.

## The Catalog

### The Color API
- **What:** Two workhorse GET endpoints. `GET /scheme?hex=264653&mode=analogic&count=6` builds a palette; `GET /id?hex=264653` describes a single color in depth.
- **Why it's great:** No API key for typical use, CORS-friendly (call it straight from browser code for demos), and the JSON carries the full works: human name, closest named hex, RGB, HSL, HSV, XYZ, CMYK.
- **Pro tip:** The eight scheme modes: `monochrome`, `monochrome-dark`, `monochrome-light`, `analogic`, `analogic-complement`, `complement`, `triad`, `quad`. `/scheme`'s first color is your seed hex, don't append it twice.
- **Link:** https://www.thecolorapi.com

Response shape (trimmed) for `GET /id?hex=264653`:

```json
{
  "hex": {
    "value": "#264653",
    "rgb": { "r": 38, "g": 70, "b": 83 },
    "hsl": { "h": 197, "s": 37, "l": 24 },
    "name": {
      "value": "Charade",
      "closest_named_hex": "#2e3a46",
      "exact_match_name": false,
      "distance": 1405
    }
  }
}
```

For `/scheme` the same rich color objects arrive as `colors_v2[]` (names + conversions per color), alongside a flat `colors[]` hex array, `mode`, `count`, and `_links` for paging. Parse `colors_v2` when you need names; `colors` when you just want hexes.

### color.pizza
- **What:** A color-naming API built on a curated list of 30,000+ names, from "Space Cadet" to "Pizza".
- **Why it's great:** Naming is secretly a UX feature, logs, alt text, design docs and error states all read better with real names. Hand-curated beats algorithmic "dark slate-ish" every time.
- **Pro tip:** Batch it, pass multiple values in one call and you get a `paletteTitle` summarizing the set. Perfect for palette captions and alt text.
- **Link:** https://color.pizza

### Colormind
- **What:** A deep-learning palette generator. `POST http://colormind.io/api/` with body `{"model":"default"}` returns a 5-color palette as `{"result":[[r,g,b],…]}`.
- **Why it's great:** It's not rule based, the model has taste. You control it slot-by-slot: send an `input` array of five slots, each either an `[r,g,b]` color or a string, `"l"` locks the exact color, `"u"` leaves it unlocked (a hint the model may refine), `"n"` is neutral (model's free choice).
- **Pro tip:** Output is *sampled*, not deterministic, the same request can return different palettes. A feature for exploration, a bug for caching (see below).
- **Link:** http://colormind.io

### APIVerve Colors API
- **What:** A hosted, key-authenticated utility API covering hex/RGB/name conversion and palette lookups, part of the APIVerve API marketplace.
- **Why it's great:** Predictable JSON, real docs and a key model, handy for internal tooling where "no key, no guarantees" services feel too loose.
- **Pro tip:** Before paying for a color API, check whether a local library (culori, chroma.js, colorjs.io) does the same offline, you're often about to pay for what `npm install` gives you free.
- **Link:** https://apiverve.com

### x-colors API
- **What:** A RapidAPI-hosted color service offering color names, shades/tints and format conversions.
- **Why it's great:** A solid secondary source when you need redundancy or richer naming data than your primary provider.
- **Pro tip:** RapidAPI free tiers are tiny, cache hard and add per-IP quotas before exposing it to a public frontend.
- **Link:** https://rapidapi.com

### ColourLovers API
- **What:** REST endpoints (`/api/palettes/top`, `/api/palettes/new`, `/api/colors/…`) over more than a decade of community-made palettes, colors and patterns.
- **Why it's great:** Real palettes curated by humans across 15+ years, a unique corpus for inspiration mining and dataset building.
- **Pro tip:** It's aging: XML by default (add `?format=json`), historically HTTP-only (mixed-content blocks on HTTPS pages), and quality varies. Treat it as an archive, not a production dependency.
- **Link:** https://www.colourlovers.com/api

### Rate limits & caching, the survival guide
- **Cache by `hex+mode+count`**, deterministic GET endpoints map perfectly onto HTTP caching: browser `Cache-Control`, CDN edge, or localStorage/IndexedDB for client demos. Same key, same answer, forever.
- **Debounce pickers**, dragging a hue slider at 60 fps must not fire 60 requests a second. Emit on pointer-up or wrap in a 250 ms debounce.
- **Batch when possible**, color.pizza accepts multiple values per call; one request beats six.
- **Respect the "no key" deal**, free keyless APIs survive because people cache. Cache aggressively, and route heavy production traffic to paid tiers.
- **Never cache Colormind globally**, its sampling *is* the product. Cache per-session or per-user at most.

### API or local library? Decide in 10 seconds
- **Go local** (culori, chroma.js, colorjs.io, colord) when you need offline/air-gapped use, deterministic output for tests and builds, sub-millisecond latency in interaction-heavy UI, or zero third-party data flow.
- **Go API** when you need curated human color names (color.pizza), ML-generated palettes (Colormind), community corpora (ColourLovers), or server-side enrichment your bundle shouldn't ship.
- **Hybrid wins**, local math for everything deterministic, one cached API call for the "name this color" flourish.

### MCP in 2 minutes
- **What:** The [Model Context Protocol](https://modelcontextprotocol.io) is the open standard (introduced by Anthropic, 2024) for connecting AI applications to tools and data. An MCP **server** exposes **tools** with typed JSON-Schema parameters; MCP **hosts** (Claude Desktop, Claude Code, Cursor, Windsurf, custom agents) discover and call them at runtime.
- **Why wrap color APIs as MCP tools instead of letting the agent `fetch`?**
  1. **Schema'd tools**, the model sees typed parameters (`hex`, `mode`, `count`) with valid enums, so malformed calls collapse to ~zero.
  2. **Discoverability**, the agent lists available tools; no "what was that query param again?" archaeology at inference time.
  3. **No hallucinated endpoints**, the model can only call registered tools; invented URLs simply aren't callable.
  4. **Server-side smarts**, API keys, caching, rate-limit backoff and friendly error messages live in your server, not in the prompt.
- **Start here:** the curated registry in [../mcp/README.md](../mcp/README.md) and a working starter at [../mcp/example-color-server/index.ts](../mcp/example-color-server/index.ts), `bun install && bun run index.ts`, add it to your MCP client config, and your agent gains real color tools.

## Pitfalls

- Calling a scheme API per pixel during a picker drag, debounce, or you'll rate-limit yourself inside one demo.
- Treating Colormind output as deterministic, it samples the model; cache per session, never globally.
- Double-counting the seed: `/scheme` returns your input hex as the first color.
- Mixed content: ColourLovers' HTTP-only endpoints get blocked from HTTPS pages.
- Hardcoding provider URLs in client bundles, proxy via your backend or an MCP server so you can swap providers and hide keys.
- Trusting `closest_named_hex` distance as a design similarity metric, it's name lookup, not color science.

## Try it now

```bash
# A real triad scheme with human names, straight from The Color API
curl -s "https://www.thecolorapi.com/scheme?hex=264653&mode=triad&count=6" \
  | jq '{mode, count, colors: .colors, names: [.colors_v2[].name.value]}'
```

## Related guides

- [02 · AI Agent Skills](02-ai-agent-skills.md), skills carry the knowledge; MCP tools make the live calls
- [08 · AI Palette Generation](08-ai-palette-generation.md), Colormind and other model-driven generators, compared
- [09 · Inspiration, Culture & Themes](09-inspiration-culture-and-themes.md), where community palettes fit when APIs run dry
- [11 · Libraries & SDKs](11-libraries-and-sdks.md), the local-library alternative to every HTTP call above
- [15 · Tool Selection Matrix](15-tool-selection-matrix.md), API vs library, decided per scenario
- [16 · Glossary](16-glossary.md), scheme modes and color-math terms, decoded

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
