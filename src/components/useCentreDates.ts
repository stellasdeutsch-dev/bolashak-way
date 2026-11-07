import { useEffect, useState } from 'react'
import type { Locale } from '@/content/types'
import { readCachedCentreDates, refreshCentreDates, type CentreDate } from '@/domain/centreDates'
import { siteLang } from '@/domain/site'

type State = { lang: string; entries: CentreDate[]; failed: boolean }

/**
 * The Center's dates for the reader's language: the saved copy at once, then a fresh one
 * from the site on every visit. A failed refresh keeps the saved copy and sets `failed`.
 */
export function useCentreDates(locale: Locale): { entries: CentreDate[]; failed: boolean } {
  const lang = siteLang(locale)
  const [state, setState] = useState<State>(() => ({ lang, entries: readCachedCentreDates(locale) ?? [], failed: false }))

  useEffect(() => {
    let alive = true
    setState({ lang, entries: readCachedCentreDates(locale) ?? [], failed: false })
    void refreshCentreDates(locale).then((r) => {
      if (alive) setState({ lang, ...r })
    })
    return () => {
      alive = false
    }
  }, [lang, locale])

  // Until the effect has run for a new language, do not show the other language's copy.
  return state.lang === lang ? state : { entries: readCachedCentreDates(locale) ?? [], failed: false }
}
