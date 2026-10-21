# Chromary, MCP Registry

**MCP (Model Context Protocol)** lets AI agents call tools through a standard interface, schema'd, discoverable, no hallucinated endpoints. Wrap color APIs as MCP tools and your agent stops *guessing* hex codes and starts *computing* them.

## The starter server (in this repo)

[`examplecolorserver/`](examplecolorserver/index.ts) is a complete, working MCP server (TypeScript, runs on [Bun](https://bun.sh)) exposing two tools:

| Tool | What it does |
|||
| `generate_palette` | Colortheory palette from a seed hex (`analogic`, `complement`, `triad`, `quad`, `monochrome`…) via The Color API |
| `color_info` | Identify any hex: name, RGB, HSL, closest named match |

```bash
cd mcp/examplecolorserver
bun install
bun run index.ts          # starts on stdio
```

## Wire it into your agent

<details open>
<summary><b>Claude Desktop</b>, <code>claude_desktop_config.json</code></summary>

```json
{
  "mcpServers": {
    "chromary": {
      "command": "bun",
      "args": ["run", "/ABSOLUTE/PATH/TO/chromary/mcp/examplecolorserver/index.ts"]
    }
  }
}
```
</details>

<details>
<summary><b>Cursor</b>, <code>.cursor/mcp.json</code></summary>

```json
{
  "mcpServers": {
    "chromary": {
      "command": "bun",
      "args": ["run", "/ABSOLUTE/PATH/TO/chromary/mcp/examplecolorserver/index.ts"]
    }
  }
}
```
</details>

<details>
<summary><b>VS Code</b>, <code>.vscode/mcp.json</code></summary>

```json
{
  "servers": {
    "chromary": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "${workspaceFolder}/mcp/examplecolorserver/index.ts"]
    }
  }
}
```
</details>

**Test it:** `bunx @modelcontextprotocol/inspector bun run index.ts` → opens a UI to call your tools interactively.

## Community registry

> The MCP ecosystem moves *fast*, servers appear weekly. The canonical source of truth is always the live registries: **[Smithery](https://smithery.ai)**, **[Glama](https://glama.ai/mcp/servers)**, **[PulseMCP](https://www.pulsemcp.com)**, **[mcp.so](https://mcp.so)**. Search "color", "palette", "design". Verify any thirdparty server before running it.

| Server (search the registries) | Capability | Notes |
||||
| `chromary example` (this repo) | palette generation + color identification | you own the code, extend freely |
| colorconversion MCPs | hex ↔ rgb ↔ hsl ↔ oklch conversions | great lightweight first tools |
| palettegeneration MCPs | The Color API / Colormind wrappers | check rate limits before shipping |
| imageextraction MCPs | dominant colors from image URLs | pair with the `imagepalette` skill |

**Machinereadable version:** [`servers.json`](servers.json), PR your server in (see format inside).

## Add a tool to the starter (5 minutes)

Open `examplecolorserver/index.ts`, add a schema to `ListToolsRequestSchema`, and a branch in `CallToolRequestSchema`. Ideas:

 `check_contrast(fg, bg)` → WCAG ratio + APCA Lc (port [`recipes/javascript/wcagapcacontrast.js`](../recipes/javascript/wcagapcacontrast.js))
 `oklch_convert(hex)` → OKLCH triple (port culori)
 `name_that_color(hex)` → color.pizza lookup


*Part of [Chromary](../README.md) · deep dive: [01 · REST APIs & MCP](../docs/01restapisandmcp.md)*
