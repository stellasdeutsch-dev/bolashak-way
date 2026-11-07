/**
 * Content-Security-Policy for the published site. GitHub Pages cannot send headers, so it
 * goes in a <meta>. Only the build gets it: the dev server injects inline styles and talks
 * over a websocket. What is allowed and why:
 * - scripts and styles: this site only (the theme script is public/theme.js, not inline);
 * - frames: the YouTube player (no-cookie host, after a click) and the official PDF blanks;
 * - images: i.ytimg.com only because a playing YouTube embed hands its cover to the
 *   browser's media controls, which load it in this page (after the click, never before);
 * - requests: this site, and the Center's site (VITE_SITE_URL) for the dates published in
 *   its news – the calendar's calendar.json. On github.io that is the same host anyway.
 * - no other images, fonts or requests to anyone else.
 */
const DEFAULT_SITE_URL = 'https://stellasdeutsch-dev.github.io/bolashak-site/'

/** The origin of the Center's site, from the same variable the app reads. */
export function siteOrigin(raw: string | undefined): string {
  try {
    const url = new URL((raw ?? '').trim() || DEFAULT_SITE_URL)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.origin : new URL(DEFAULT_SITE_URL).origin
  } catch {
    return new URL(DEFAULT_SITE_URL).origin
  }
}

export const buildCsp = (site: string) => [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: https://i.ytimg.com",
  "font-src 'self'",
  `connect-src 'self' ${site}`,
  'frame-src https://www.youtube-nocookie.com https://bolashak.gov.kz',
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ')
