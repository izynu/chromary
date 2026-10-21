/**
 * image-palette.js, extract a role-based palette from any image.
 *
 * Dep: bun add node-vibrant     Run: bun run image-palette.js ./logo.png
 *
 * node-vibrant returns *roles* (Vibrant, Muted, Dark/Light variants):
 * far more useful for UIs than a raw dominant color. Normalize the results
 * in OKLCH before shipping (see the theme-builder skill).
 *
 * Note: v3 default-exports Vibrant; on v4 use `import { Vibrant } from "node-vibrant/node"`.
 */
import Vibrant from "node-vibrant"; // v3 API

const ROLE_ORDER = [
  "Vibrant",
  "DarkVibrant",
  "LightVibrant",
  "Muted",
  "DarkMuted",
  "LightMuted",
];

/**
 * @param {string} path path to jpg/png
 * @returns {{role: string, hex: string, population: number, text: string}[]}
 */
export async function extractRoles(path) {
  const palette = await Vibrant.from(path).getPalette();
  return ROLE_ORDER.filter((role) => palette[role]).map((role) => ({
    role,
    hex: palette[role].hex,
    population: palette[role].population,
    // contrast-checked text colors straight from the swatch:
    text: palette[role].titleTextColor,
  }));
}

/** Pick the best "primary" candidate: most vibrant, decent population. */
export function pickPrimary(roles) {
  const ranked = [...roles].sort(
    (a, b) => b.population * (b.role.includes("Vibrant") ? 2 : 1) - a.population * (a.role.includes("Vibrant") ? 2 : 1),
  );
  return ranked[0];
}

/* --- demo ------------------------------------------------------------ */
if (import.meta.main) {
  const file = process.argv[2];
  if (!file) {
    console.log("usage: bun run image-palette.js <image>");
  } else {
    const roles = await extractRoles(file);
    console.table(roles);
    console.log("→ suggested primary:", pickPrimary(roles).hex);
  }
}
