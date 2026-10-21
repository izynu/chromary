/**
 * wcagapcacontrast.js, WCAG 2.1 ratio + APCA (WCAG 3) Lc, one module.
 *
 * Dep: bun add apcaw3     Run: bun run wcagapcacontrast.js
 *
 * WCAG 2.1 ratio is the legal AA/AAA standard; APCA predicts *perceived*
 * contrast far better, especially in dark mode and for thin fonts.
 * Always report both.
 */
import { calcAPCA } from "apcaw3";

/** hex → [r,g,b] 0 to 1 */
export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
}

/** WCAG 2.1 relative luminance (spec: linearize, then weight sRGB primaries) */
export function relLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.1 contrast ratio: 1 (same) → 21 (black/white) */
export function wcagRatio(fg, bg) {
  const [hi, lo] = [relLuminance(fg), relLuminance(bg)].sort((a, b) => b  a);
  return (hi + 0.05) / (lo + 0.05);
}

/** Humanreadable verdict for a pair. */
export function verdict(fg, bg, { large = false } = {}) {
  const r = wcagRatio(fg, bg);
  const aa = large ? 3 : 4.5;
  const aaa = large ? 4.5 : 7;
  const lc = Math.abs(calcAPCA(fg, bg)); // APCA is directional; magnitude = strength
  return {
    ratio: +r.toFixed(2),
    wcag: r >= aaa ? "AAA ✓" : r >= aa ? "AA ✓" : "✗ fail",
    apcaLc: +lc.toFixed(1),
    apcaNote: lc >= 75 ? "bodytext ok" : lc >= 60 ? "large/fluent only" : lc >= 30 ? "nontext / UI only" : "invisible, do not use",
  };
}

/*  demo  */
if (import.meta.main) {
  console.log("#777 on #fff →", verdict("#777777", "#ffffff"));
  // → ratio ≈ 4.48, WCAG "✗ fail" (body), APCA ≈ Lc 65 → "large/fluent only"
  console.log("#595959 on #fff →", verdict("#595959", "#ffffff"));
  // → ratio = 7.0, "AAA ✓", bodytext ok
}
