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

function interpolate(s: string, params?: Record<string, string | number>) {
  if (!params) return s
  return s.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? String(params[k]) : `{${k}}`))
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

/** "1 год" / "2 года" / "5 лет" — used wherever an experience figure is shown. */
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

export function formatRange(min: number, max: number) {
  return min === max ? `${min}` : `${min}–${max}`
}
