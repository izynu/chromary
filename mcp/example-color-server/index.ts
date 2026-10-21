/**
 * Chromary, example MCP color server (stdio transport).
 *
 *   cd mcp/example-color-server && bun install && bun run index.ts
 *
 * Exposes two tools to any MCP client (Claude Desktop, Cursor, VS Code…):
 *   • generate_palette, color-theory palette from a seed hex (The Color API)
 *   • color_info      , name / rgb / hsl / closest named match for a hex
 *
 * Extend it: add a schema in ListToolsRequestSchema + a branch in
 * CallToolRequestSchema. See mcp/README.md for 5-minute tool ideas.
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const COLOR_API = "https://www.thecolorapi.com";

const MODES = [
  "monochrome", "monochrome-dark", "monochrome-light",
  "analogic", "analogic-complement", "complement", "triad", "quad",
];

async function generatePalette({ hex, mode = "triad", count = 6 }) {
  const clean = String(hex).replace("#", "");
  const url = `${COLOR_API}/scheme?hex=${encodeURIComponent(clean)}&mode=${mode}&count=${count}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`The Color API returned ${res.status}`);
  const json = await res.json();
  return {
    seed: `#${clean}`,
    mode: json.mode ?? mode,
    colors: (json.colors ?? []).map((c) => c.hex.value),
    tip: "Verify text pairs with the contrast-auditor skill before shipping.",
  };
}

async function colorInfo({ hex }) {
  const clean = String(hex).replace("#", "");
  const res = await fetch(`${COLOR_API}/id?hex=${encodeURIComponent(clean)}`);
  if (!res.ok) throw new Error(`The Color API returned ${res.status}`);
  const j = await res.json();
  return {
    hex: j.hex?.value,
    name: j.name?.value,
    rgb: j.rgb?.value,
    hsl: j.hsl?.value,
    closest_named: j.name?.closest_named_hex,
  };
}

const server = new Server(
  { name: "chromary", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "generate_palette",
      description:
        "Generate a color palette from a seed hex using color-theory harmony modes (analogic, complement, triad, quad, monochrome…).",
      inputSchema: {
        type: "object",
        properties: {
          hex: { type: "string", description: "Seed color, e.g. 264653 or #264653" },
          mode: { type: "string", enum: MODES, default: "triad", description: "Harmony mode" },
          count: { type: "number", minimum: 2, maximum: 10, default: 6, description: "Colors to return" },
        },
        required: ["hex"],
      },
    },
    {
      name: "color_info",
      description: "Identify a color: human name, RGB, HSL, and closest named match.",
      inputSchema: {
        type: "object",
        properties: {
          hex: { type: "string", description: "Color, e.g. 264653 or #264653" },
        },
        required: ["hex"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params ?? {};
  try {
    let data;
    if (name === "generate_palette") data = await generatePalette(args ?? {});
    else if (name === "color_info") data = await colorInfo(args ?? {});
    else throw new Error(`Unknown tool: ${name}`);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${err instanceof Error ? err.message : String(err)}` }],
      isError: true,
    };
  }
});

await server.connect(new StdioServerTransport());
console.error("🎨 chromary MCP server running on stdio");
