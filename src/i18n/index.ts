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

export function formatRange(min: number, max: number) {
  return min === max ? `${min}` : `${min}–${max}`
}
