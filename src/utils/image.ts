/**
 * Image optimization utilities for Next.js and Cloudinary
 */

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#2a221b" offset="20%" />
      <stop stop-color="#4a3c2e" offset="50%" />
      <stop stop-color="#2a221b" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#2a221b" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/**
 * Generates an inlined base64 SVG shimmer placeholder.
 * Zero network request, zero layout shift (CLS = 0).
 */
export const getShimmerDataUrl = (w = 800, h = 600): string =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

/**
 * Generates a lightweight Cloudinary low-quality image placeholder (LQIP) URL.
 */
export const getCloudinaryBlurUrl = (url: string): string => {
  if (!url || !url.includes("/upload/")) return url;
  // If transformations already exist after /upload/, insert blur params
  return url.replace("/upload/", "/upload/w_40,e_blur:1000,q_10,f_auto/");
};
