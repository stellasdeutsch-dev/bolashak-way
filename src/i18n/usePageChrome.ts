import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

/**
 * Keeps <html lang> and the document title in step with the locale and the current page,
 * so screen readers announce the right language and browser history stays readable.
 */
export function usePageChrome(title?: string) {
  const locale = useAppStore((st) => st.locale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    document.title = title ? `${title} — Bolashak Way` : 'Bolashak Way'
  }, [title])
}
