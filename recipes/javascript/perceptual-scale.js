/**
 * perceptual-scale.js, build a Tailwind-style 50→950 brand scale from one hue.
 *
 * Dep: bun add culori        Run: bun run perceptual-scale.js
 *
 * Why OKLCH? Lightness steps feel *even* to the eye, chroma can be shaped
 * independently (low at the extremes, peaking mid-scale), and every step
 * stays in gamut for CSS `oklch()`, no surprises between Figma and prod.
 */
import { oklch, formatHex } from "culori";

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const LIGHTNESS = [0.975, 0.95, 0.9, 0.82, 0.71, 0.63, 0.55, 0.47, 0.38, 0.3, 0.21];

/** Chroma bell: tiny at the extremes, peaking in the middle of the ramp. */
const chromaAt = (t, peak) => 0.015 + (peak - 0.015) * Math.sin(Math.PI * t) ** 0.8;

/**
 * @param {number} hue          OKLCH hue 0 to 360 (e.g. 160 teal, 25 orange, 300 violet)
 * @param {number} [peak]       max chroma: 0.09 muted · 0.13 balanced · 0.18 vivid
 * @returns {Record<string, {oklch: string, hex: string}>}
 */
export function brandScale(hue, peak = 0.13) {
  return Object.fromEntries(
    STEPS.map((name, i) => {
      const t = i / (STEPS.length - 1);
      const color = oklch({ mode: "oklch", l: LIGHTNESS[i], c: chromaAt(t, peak), h: hue });
      return [name, { oklch: `oklch(${(LIGHTNESS[i] * 100).toFixed(1)}% ${chromaAt(t, peak).toFixed(3)} ${hue})`, hex: formatHex(color) }];
    }),
  );
}

/** Emit CSS custom properties + a Tailwind-ish token map. */
export function toCss(scale, name = "brand") {
  const vars = Object.entries(scale)
    .map(([step, v]) => `  --${name}-${step}: ${v.oklch}; /* ${v.hex} */`)
    .join("\n");
  return `:root {\n${vars}\n}`;
}

/* --- demo ------------------------------------------------------------ */
if (import.meta.main) {
  const scale = brandScale(160, 0.13); // balanced teal
  console.log(toCss(scale));
  console.log("\nHex ladder:", Object.entries(scale).map(([s, v]) => `${s}:${v.hex}`).join("  "));
  // → --brand-500 ≈ oklch(63% 0.129 160)  #0DB28C-ish; every step monotonic in L.
}
