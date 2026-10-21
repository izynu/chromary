/**
 * imagepalette.js, extract a rolebased palette from any image.
 *
 * Dep: bun add nodevibrant     Run: bun run imagepalette.js ./logo.png
 *
 * nodevibrant returns *roles* (Vibrant, Muted, Dark/Light variants):
 * far more useful for UIs than a raw dominant color. Normalize the results
 * in OKLCH before shipping (see the themebuilder skill).
 *
 * Note: v3 defaultexports Vibrant; on v4 use `import { Vibrant } from "nodevibrant/node"`.
 */
import Vibrant from "nodevibrant"; // v3 API

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
    // contrastchecked text colors straight from the swatch:
    text: palette[role].titleTextColor,
  }));
}

/** Pick the best "primary" candidate: most vibrant, decent population. */
export function pickPrimary(roles) {
  const ranked = [...roles].sort(
    (a, b) => b.population * (b.role.includes("Vibrant") ? 2 : 1)  a.population * (a.role.includes("Vibrant") ? 2 : 1),
  );
  return ranked[0];
}

/*  demo  */
if (import.meta.main) {
  const file = process.argv[2];
  if (!file) {
    console.log("usage: bun run imagepalette.js <image>");
  } else {
    const roles = await extractRoles(file);
    console.table(roles);
    console.log("→ suggested primary:", pickPrimary(roles).hex);
  }
}
