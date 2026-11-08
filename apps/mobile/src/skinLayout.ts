// SPDX-License-Identifier: GPL-3.0-only
// Pure layout math for screen skins (no React Native imports so it is unit-testable under vitest).

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
/** Fractions (0..1) of the container width (left/right) and height (top/bottom). */
export interface Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
/** Absolute safe-area insets in dp. */
export interface Safe {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Content window inside a container: the container inset by `insets` (fractions), then clamped so it never
 * enters the safe-area insets (status bar / gesture bar / cutout). Never returns negative size.
 */
export function computeContentRect(w: number, h: number, insets: Insets, safe: Safe = { top: 0, right: 0, bottom: 0, left: 0 }): Rect {
  const left = Math.max(insets.left * w, safe.left);
  const top = Math.max(insets.top * h, safe.top);
  const right = Math.max(insets.right * w, safe.right);
  const bottom = Math.max(insets.bottom * h, safe.bottom);
  return { x: left, y: top, w: Math.max(0, w - left - right), h: Math.max(0, h - top - bottom) };
}

/**
 * "cover" placement of a src-sized image into a dest box. `anchor` (0..1 per axis) says which part of the
 * image stays in view when it overflows: {0.5,0.5} centers, {0.5,0} keeps the top, {0.5,1} keeps the bottom.
 * Returns the image rectangle relative to the dest box (x/y <= 0).
 */
export function computeCoverRect(srcW: number, srcH: number, destW: number, destH: number, anchor = { x: 0.5, y: 0.5 }): Rect {
  if (srcW <= 0 || srcH <= 0) return { x: 0, y: 0, w: destW, h: destH };
  const s = Math.max(destW / srcW, destH / srcH);
  const w = srcW * s;
  const h = srcH * s;
  return { x: (destW - w) * anchor.x, y: (destH - h) * anchor.y, w, h };
}

export interface SlicePiece {
  /** Where the piece goes in the destination box. Non-last pieces are 1px larger so neighbours overlap (no seams). */
  dest: Rect;
  /** The whole source image, stretched and offset so that exactly this piece's source region shows through `dest`. */
  image: Rect;
}

/**
 * 9-slice split. `srcW x srcH` is the source size, `slice` the source cap thickness in source px, `cap` the
 * cap thickness to draw in dp. Returns [] when the destination is smaller than two caps in either axis.
 */
export function computeNineSlice(destW: number, destH: number, srcW: number, srcH: number, slice: number, cap: number): SlicePiece[] {
  if (destW < cap * 2 || destH < cap * 2 || srcW < slice * 2 || srcH < slice * 2) return [];
  const axis = (n: number, S: number): [number, number, number, number][] => [
    [0, cap, 0, slice],
    [cap, n - cap, slice, S - slice],
    [n - cap, n, S - slice, S],
  ];
  const pieces: SlicePiece[] = [];
  axis(destH, srcH).forEach(([y0, y1, sy0, sy1], i) => {
    axis(destW, srcW).forEach(([x0, x1, sx0, sx1], j) => {
      const kx = (x1 - x0) / (sx1 - sx0);
      const ky = (y1 - y0) / (sy1 - sy0);
      pieces.push({
        dest: { x: x0, y: y0, w: x1 - x0 + (j < 2 ? 1 : 0), h: y1 - y0 + (i < 2 ? 1 : 0) },
        image: { x: -sx0 * kx, y: -sy0 * ky, w: srcW * kx, h: srcH * ky },
      });
    });
  });
  return pieces;
}
