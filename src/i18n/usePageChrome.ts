import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'

/**
 * Keeps <html lang> and the meta description in step with the chosen language. Lives in
 * the Layout, so every screen – the 404 and the "other programme" screen included – is
 * read out in the right voice.
 */
export function useDocumentLocale() {
  const locale = useAppStore((st) => st.locale)
  const { t } = useI18n()
  useEffect(() => {
    document.documentElement.lang = locale
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('common.metaDescription'))
  }, [locale, t])
}

/** Sets the document title for the current page, so browser history stays readable. */
export function usePageChrome(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} – Bolashak Way` : 'Bolashak Way'
  }, [title])
}
