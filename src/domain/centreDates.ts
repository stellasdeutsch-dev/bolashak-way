import type { Locale } from '@/content/types'
import { SITE_URL, siteLang } from './site'

/**
 * Dates the Center publishes in its news. The Center has no fixed deadlines: each intake
 * is announced in a news item, and the site collects the sentences with a date in them
 * into <site>/{ru|kz|en}/calendar.json. The app shows them next to the reader's own dates,
 * quoted as published and linked to the news item – never mixed into the personal plan.
 */
export interface CentreDate {
  /** yyyy-mm-dd */
  date: string
  /** Last day of a period, yyyy-mm-dd, inclusive. */
  end?: string
  /** The sentence from the news item, verbatim. */
  text: string
  /** Title of the news item. */
  title: string
  /** Absolute address of the news item. */
  url: string
  /** When the news item was published, yyyy-mm-dd. */
  published?: string
}

export type FeedResult =
  | { status: 'ok'; entries: CentreDate[] }
  /** No feed yet (404): nothing to show and nothing to warn about. */
  | { status: 'missing' }
  /** Offline, timed out, server error or a feed that cannot be read. */
  | { status: 'failed' }

export const centreFeedUrl = (locale: Locale, base = SITE_URL) => `${base}${siteLang(locale)}/calendar.json`

const MAX_ENTRIES = 500
const MAX_TEXT = 2000
const MAX_TITLE = 500

export function isIsoDay(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [y, m, d] = value.split('-').map(Number)
  const t = new Date(Date.UTC(y, m - 1, d))
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d
}

function httpUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null
  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
  } catch {
    return null
  }
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const v = value.trim()
  // A sentence is quoted as published, so a too long one is dropped, never cut.
  return v && v.length <= max ? v : null
}

/**
 * Keeps only entries that can be shown as they are. Anything malformed is dropped one by
 * one, so a single bad line in the feed does not hide the rest. Returns null when the
 * feed itself is not a list.
 */
export function parseCentreDates(raw: unknown): CentreDate[] | null {
  if (!Array.isArray(raw)) return null
  const seen = new Set<string>()
  const out: CentreDate[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const r = item as Record<string, unknown>
    const sentence = text(r.text, MAX_TEXT)
    const title = text(r.title, MAX_TITLE)
    const url = httpUrl(r.url)
    if (!isIsoDay(r.date) || !sentence || !title || !url) continue
    const entry: CentreDate = { date: r.date, text: sentence, title, url }
    if (isIsoDay(r.end) && r.end > r.date) entry.end = r.end
    if (isIsoDay(r.published)) entry.published = r.published
    const key = [entry.date, entry.end ?? '', entry.url, entry.text].join('\u0000')
    if (seen.has(key)) continue
    seen.add(key)
    out.push(entry)
  }
  out.sort((a, b) => a.date.localeCompare(b.date) || (a.end ?? a.date).localeCompare(b.end ?? b.date))
  return out.slice(0, MAX_ENTRIES)
}

/** Loads the feed once, giving up after `timeoutMs`. Never throws. */
export async function fetchCentreDates(
  url: string,
  { timeoutMs = 6000, fetchImpl = globalThis.fetch }: { timeoutMs?: number; fetchImpl?: typeof fetch } = {},
): Promise<FeedResult> {
  if (typeof fetchImpl !== 'function') return { status: 'failed' }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    // no-cache: always ask the site, but let it answer "not modified" when nothing changed.
    const res = await fetchImpl(url, { signal: controller.signal, cache: 'no-cache', credentials: 'omit' })
    if (res.status === 404 || res.status === 410) return { status: 'missing' }
    if (!res.ok) return { status: 'failed' }
    const entries = parseCentreDates(await res.json())
    return entries ? { status: 'ok', entries } : { status: 'failed' }
  } catch {
    return { status: 'failed' }
  } finally {
    clearTimeout(timer)
  }
}

/* The last good copy, per site language, so the dates are there offline as well. It is
   the site's public data, not the reader's: a failed write is not worth a warning. */

const cacheKey = (locale: Locale) => `bolashak-way:centre-dates:${siteLang(locale)}`

export function readCachedCentreDates(locale: Locale, storage: () => Storage = () => localStorage): CentreDate[] | null {
  try {
    const raw = storage().getItem(cacheKey(locale))
    if (!raw) return null
    const data = JSON.parse(raw) as { entries?: unknown }
    return parseCentreDates(data?.entries)
  } catch {
    return null
  }
}

export function writeCachedCentreDates(locale: Locale, entries: CentreDate[], now = new Date(), storage: () => Storage = () => localStorage) {
  try {
    storage().setItem(cacheKey(locale), JSON.stringify({ savedAt: now.toISOString(), entries }))
  } catch {
    /* the copy on screen is still fine; next visit fetches again */
  }
}

export function dropCachedCentreDates(locale: Locale, storage: () => Storage = () => localStorage) {
  try {
    storage().removeItem(cacheKey(locale))
  } catch {
    /* nothing to do */
  }
}

/**
 * One visit: show the saved copy straight away, then ask the site. A fresh copy replaces
 * the saved one; a missing feed clears it; a failure keeps it and says so.
 */
export async function refreshCentreDates(
  locale: Locale,
  opts: { base?: string; fetchImpl?: typeof fetch; timeoutMs?: number; storage?: () => Storage; now?: Date } = {},
): Promise<{ entries: CentreDate[]; failed: boolean }> {
  const result = await fetchCentreDates(centreFeedUrl(locale, opts.base), opts)
  if (result.status === 'ok') {
    writeCachedCentreDates(locale, result.entries, opts.now, opts.storage)
    return { entries: result.entries, failed: false }
  }
  if (result.status === 'missing') {
    dropCachedCentreDates(locale, opts.storage)
    return { entries: [], failed: false }
  }
  return { entries: readCachedCentreDates(locale, opts.storage) ?? [], failed: true }
}

/** Does the entry touch the days from `first` to `last` (inclusive)? */
export const overlaps = (e: CentreDate, first: string, last: string) => e.date <= last && (e.end ?? e.date) >= first

/** A short stable id for calendar exports, so a re-import updates instead of duplicating. */
export function centreDateId(e: CentreDate): string {
  let h = 0x811c9dc5
  for (const ch of `${e.url}|${e.date}|${e.end ?? ''}|${e.text}`) {
    h ^= ch.codePointAt(0)!
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return `centre-${h.toString(16).padStart(8, '0')}`
}
