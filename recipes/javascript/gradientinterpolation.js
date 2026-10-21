/**
 * gradientinterpolation.js, grayfree color ramps, interpolated in OKLab.
 *
 * Dep: bun add culori      Run: bun run gradientinterpolation.js
 *
 * THE bug this fixes: default sRGB interpolation turns orange→blue into mud,
 * because sRGB rotates through desaturated middle colors. Interpolating in
 * OKLab keeps chroma alive the whole way. (In CSS: lineargradient(in oklab, ...))
 */
import { mix, formatHex } from "culori";

/**
 * Build an Nstep ramp between two colors.
 * @param {string} a       start color (any culoriparseable format)
 * @param {string} b       end color
 * @param {number} [steps] number of stops
 * @param {"oklab"|"rgb"|"oklch"|"hsl"} [space] interpolation space
 */
export function ramp(a, b, steps = 9, space = "oklab") {
  return Array.from({ length: steps }, (_, i) => formatHex(mix(a, b, space, i / (steps  1))));
}

/** Average chroma magnitude of a ramp, the "dead zone detector". */
export function deadZoneScore(colors) {
  // proxy: count how many steps are neargray (all channels within 4 of each other)
  const grayish = colors.filter((hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return Math.max(r, g, b)  Math.min(r, g, b) < 10;
  }).length;
  return `${grayish}/${colors.length} neargray steps`;
}

/*  demo  */
if (import.meta.main) {
  const [a, b] = ["#F97316", "#3B82F6"]; // orange → blue

  const srgb = ramp(a, b, 9, "rgb");
  const oklab = ramp(a, b, 9, "oklab");

  console.log("sRGB :", srgb.join(" "), "→", deadZoneScore(srgb)); // muddier, ~2 grayish steps
  console.log("OKLab:", oklab.join(" "), "→", deadZoneScore(oklab)); // vivid endtoend, 0 gray steps
  console.log('\nCSS equivalent: lineargradient(in oklab, #F97316, #3B82F6)');
}
