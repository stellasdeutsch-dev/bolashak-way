import { useCallback } from 'react'
import type { L } from '@/content/types'
import { useAppStore } from '@/store/useAppStore'
import { UI, resolveUi, type UiKey } from './ui'
import { interpolate, pick } from './text'

export * from './text'
export type { UiKey }

export function useI18n() {
  const locale = useAppStore((s) => s.locale)
  const t = useCallback(
    (path: UiKey, params?: Record<string, string | number>) => interpolate(resolveUi(UI as never, path, locale), params),
    [locale],
  )
  const c = useCallback((l: L | undefined) => pick(l, locale).text, [locale])
  const cf = useCallback((l: L | undefined) => pick(l, locale), [locale])
  return { locale, t, c, cf }
}
