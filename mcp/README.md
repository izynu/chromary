# 🔌 Chroma Forge — MCP Registry

**MCP (Model Context Protocol)** lets AI agents call tools through a standard interface — schema'd, discoverable, no hallucinated endpoints. Wrap color APIs as MCP tools and your agent stops *guessing* hex codes and starts *computing* them.

## 🚀 The starter server (in this repo)

[`example-color-server/`](example-color-server/index.ts) is a complete, working MCP server (TypeScript, runs on [Bun](https://bun.sh)) exposing two tools:

| Tool | What it does |
|---|---|
| `generate_palette` | Color-theory palette from a seed hex (`analogic`, `complement`, `triad`, `quad`, `monochrome`…) via The Color API |
| `color_info` | Identify any hex: name, RGB, HSL, closest named match |

```bash
cd mcp/example-color-server
bun install
bun run index.ts          # starts on stdio
```

## 🔗 Wire it into your agent

<details open>
<summary><b>Claude Desktop</b> — <code>claude_desktop_config.json</code></summary>

```json
{
  "mcpServers": {
    "chroma-forge": {
      "command": "bun",
      "args": ["run", "/ABSOLUTE/PATH/TO/chroma-forge/mcp/example-color-server/index.ts"]
    }
  }
}
```
</details>

<details>
<summary><b>Cursor</b> — <code>.cursor/mcp.json</code></summary>

```json
{
  "mcpServers": {
    "chroma-forge": {
      "command": "bun",
      "args": ["run", "/ABSOLUTE/PATH/TO/chroma-forge/mcp/example-color-server/index.ts"]
    }
  }
}
```
</details>

<details>
<summary><b>VS Code</b> — <code>.vscode/mcp.json</code></summary>

```json
{
  "servers": {
    "chroma-forge": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "${workspaceFolder}/mcp/example-color-server/index.ts"]
    }
  }
}
```
</details>

**Test it:** `bunx @modelcontextprotocol/inspector bun run index.ts` → opens a UI to call your tools interactively.

## 🌍 Community registry

> ⚠️ The MCP ecosystem moves *fast* — servers appear weekly. The canonical source of truth is always the live registries: **[Smithery](https://smithery.ai)**, **[Glama](https://glama.ai/mcp/servers)**, **[PulseMCP](https://www.pulsemcp.com)**, **[mcp.so](https://mcp.so)**. Search "color", "palette", "design". Verify any third-party server before running it.

| Server (search the registries) | Capability | Notes |
|---|---|---|
| `chroma-forge example` (this repo) | palette generation + color identification | you own the code — extend freely |
| color-conversion MCPs | hex ↔ rgb ↔ hsl ↔ oklch conversions | great lightweight first tools |
| palette-generation MCPs | The Color API / Colormind wrappers | check rate limits before shipping |
| image-extraction MCPs | dominant colors from image URLs | pair with the `image-palette` skill |

**Machine-readable version:** [`servers.json`](servers.json) — PR your server in (see format inside).

## 🛠️ Add a tool to the starter (5 minutes)

Open `example-color-server/index.ts`, add a schema to `ListToolsRequestSchema`, and a branch in `CallToolRequestSchema`. Ideas:

- `check_contrast(fg, bg)` → WCAG ratio + APCA Lc (port [`recipes/javascript/wcag-apca-contrast.js`](../recipes/javascript/wcag-apca-contrast.js))
- `oklch_convert(hex)` → OKLCH triple (port culori)
- `name_that_color(hex)` → color.pizza lookup

---
*Part of [🔥 Chroma Forge](../README.md) · deep dive: [01 · REST APIs & MCP](../docs/01-rest-apis-and-mcp.md)*
