import { useCallback } from 'react'
import type { L, Locale } from '@/content/types'
import { useAppStore } from '@/store/useAppStore'
import { UI, resolveUi } from './ui'

export const LOCALES: { id: Locale; label: string; native: string }[] = [
  { id: 'ru', label: 'RU', native: 'Русский' },
  { id: 'kk', label: 'KK', native: 'Қазақша' },
  { id: 'en', label: 'EN', native: 'English' },
]

/** Resolve a localised content string with fallback to Russian. */
export function pick(l: L | undefined, locale: Locale): { text: string; fallback: boolean } {
  if (!l) return { text: '', fallback: false }
  const v = l[locale]
  if (v) return { text: v, fallback: false }
  return { text: l.ru, fallback: locale !== 'ru' }
}

/**
 * The Kazakh possessive ending after a number written in digits ("4 қадамның 2-сі"):
 * it follows the last word as it is read aloud – екі ends in a vowel, бір in a
 * consonant – and that word's vowel harmony (front -сі/-і, back -сы/-ы).
 */
const KK_UNITS = ['', 'бір', 'екі', 'үш', 'төрт', 'бес', 'алты', 'жеті', 'сегіз', 'тоғыз']
const KK_TENS = ['', 'он', 'жиырма', 'отыз', 'қырық', 'елу', 'алпыс', 'жетпіс', 'сексен', 'тоқсан']
export function kkPossessive(n: number): string {
  const v = Math.abs(Math.trunc(n))
  const word =
    v === 0 ? 'нөл' : v % 10 ? KK_UNITS[v % 10] : (v % 100) / 10 ? KK_TENS[(v % 100) / 10] : v % 1000 ? 'жүз' : v % 1_000_000 ? 'мың' : 'миллион'
  const back = /[аоұы]/.test(word.replace(/[^аоұыәөүіеи]/g, '').slice(-1))
  const vowelEnd = /[аеиоұүыіәө]$/.test(word)
  return vowelEnd ? (back ? 'сы' : 'сі') : back ? 'ы' : 'і'
}

function interpolate(s: string, params?: Record<string, string | number>) {
  if (!params) return s
  // {n:poss} prints the number with its Kazakh possessive ending: "2-сі", "1-і".
  return s.replace(/\{(\w+)(?::(poss))?\}/g, (whole, k, mod) => {
    if (params[k] === undefined) return whole
    return mod ? `${params[k]}-${kkPossessive(Number(params[k]))}` : String(params[k])
  })
}

export function useI18n() {
  const locale = useAppStore((s) => s.locale)
  const t = useCallback(
    (path: string, params?: Record<string, string | number>) => interpolate(resolveUi(UI as never, path, locale), params),
    [locale],
  )
  const c = useCallback((l: L | undefined) => pick(l, locale).text, [locale])
  const cf = useCallback((l: L | undefined) => pick(l, locale), [locale])
  return { locale, t, c, cf }
}

/** Russian needs three plural forms; Kazakh needs none; English needs two. */
function ruPlural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

/** "1 год" / "2 года" / "5 лет" – used wherever an experience figure is shown. */
export function formatYears(n: number, locale: Locale): string {
  if (locale === 'kk') return `${n} жыл`
  if (locale === 'en') return `${n} ${n === 1 ? 'year' : 'years'}`
  return `${n} ${ruPlural(n, 'год', 'года', 'лет')}`
}

export function formatMonths(n: number, locale: Locale): string {
  if (locale === 'kk') return `${n} ай`
  if (locale === 'en') return `${n} ${n === 1 ? 'month' : 'months'}`
  return `${n} ${ruPlural(n, 'месяц', 'месяца', 'месяцев')}`
}

/**
 * A calendar date ("2026-10-28") in the reader's language: "28 октября 2026 г.",
 * "28 October 2026". Read as UTC noon, so no time zone can shift it to the day before.
 */
export function formatDate(iso: string, locale: Locale, style: 'long' | 'short' = 'long'): string {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat(locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-GB' : 'ru-RU', {
    day: 'numeric',
    month: style === 'long' ? 'long' : '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
}

export function formatRange(min: number, max: number) {
  return min === max ? `${min}` : `${min}–${max}`
}
