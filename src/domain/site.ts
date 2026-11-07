import type { Locale } from '@/content/types'

/**
 * The app is a section of the Center for International Programs site. Where that site
 * lives is set at build time (VITE_SITE_URL); the preview of the redesign is the default.
 */
const DEFAULT_SITE_URL = 'https://stellasdeutsch-dev.github.io/bolashak-site/'

/** Always ends with a slash, so a language path can be appended directly. */
export function normaliseSiteUrl(raw: string | undefined): string {
  const value = (raw ?? '').trim() || DEFAULT_SITE_URL
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return DEFAULT_SITE_URL
    url.search = ''
    url.hash = ''
    return url.href.endsWith('/') ? url.href : `${url.href}/`
  } catch {
    return DEFAULT_SITE_URL
  }
}

export const SITE_URL = normaliseSiteUrl(import.meta.env.VITE_SITE_URL)

/** The site keeps Kazakh under /kz/, the app calls it kk. */
export const siteLang = (locale: Locale): 'ru' | 'kz' | 'en' => (locale === 'kk' ? 'kz' : locale)

/** The site's home page in the reader's language. */
export const siteHome = (locale: Locale, base = SITE_URL) => `${base}${siteLang(locale)}/`

/**
 * `?lang=ru|kk|kz|en` lets the site open the app in the language the reader already uses.
 * Read from the query string or from the query of the hash route (#/master?lang=kz).
 */
export function localeFromUrl(loc: { search: string; hash: string } | undefined): Locale | null {
  if (!loc) return null
  const hashQuery = loc.hash.includes('?') ? loc.hash.slice(loc.hash.indexOf('?')) : ''
  for (const query of [loc.search, hashQuery]) {
    const value = new URLSearchParams(query).get('lang')?.trim().toLowerCase()
    if (value === 'ru' || value === 'en') return value
    if (value === 'kk' || value === 'kz') return 'kk'
  }
  return null
}
