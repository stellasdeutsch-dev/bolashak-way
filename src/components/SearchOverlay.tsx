import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { IconSearch as Search, IconClose as X } from '@/components/icons'
import { MIN_QUERY, searchAll, type ResultKind, type SearchResult } from '@/domain/search'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { useModalFocus } from './useModalFocus'
import s from './SearchOverlay.module.css'

const KIND_KEY: Record<ResultKind, string> = {
  stage: 'search.kindStage',
  checklist: 'search.kindChecklist',
  mistake: 'search.kindMistake',
  document: 'search.kindDocument',
  faq: 'search.kindFaq',
}

/** Highlights every occurrence of the query inside a snippet. */
function Highlighted({ text, query }: { text: string; query: string }) {
  const parts = useMemo(() => {
    const norm = (v: string) => v.toLowerCase().replace(/ё/g, 'е')
    const hay = norm(text)
    const needle = norm(query)
    if (!needle) return [text]
    const out: (string | { hit: string })[] = []
    let i = 0
    for (;;) {
      const at = hay.indexOf(needle, i)
      if (at < 0) {
        out.push(text.slice(i))
        break
      }
      if (at > i) out.push(text.slice(i, at))
      out.push({ hit: text.slice(at, at + needle.length) })
      i = at + needle.length
    }
    return out
  }, [text, query])

  return (
    <>
      {parts.map((p, i) => (typeof p === 'string' ? <span key={i}>{p}</span> : <mark key={i}>{p.hit}</mark>))}
    </>
  )
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const profile = useAppStore((st) => st.profile)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => (profile && open ? searchAll(query, profile, locale) : []), [query, profile, locale, open])
  // Results are shown grouped by kind; arrows walk them in that on-screen order.
  const grouped = useMemo(
    () =>
      results.reduce<Record<string, SearchResult[]>>((acc, r) => {
        ;(acc[r.kind] ??= []).push(r)
        return acc
      }, {}),
    [results],
  )
  const ordered = useMemo(() => Object.values(grouped).flat(), [grouped])
  const [active, setActive] = useState(0)
  useEffect(() => setActive(0), [query])

  useModalFocus(panelRef, open, onClose, () => inputRef.current)

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  if (!open) return null

  const go = (r: SearchResult) => {
    onClose()
    navigate(r.href)
  }
  const searching = query.trim().length >= MIN_QUERY
  const optionId = (r: SearchResult) => `search-opt-${r.id.replace(/[^\w-]/g, '_')}`

  // Enter opens the highlighted result (the first one by default); arrows move the highlight.
  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (ordered.length === 0) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const next = (active + (e.key === 'ArrowDown' ? 1 : -1) + ordered.length) % ordered.length
      setActive(next)
      document.getElementById(optionId(ordered[next]))?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(ordered[active] ?? ordered[0])
    }
  }

  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={t('search.title')} onClick={onClose}>
      <div className={s.panel} ref={panelRef} onClick={(e) => e.stopPropagation()}>
        <div className={s.searchRow}>
          <Search size={18} aria-hidden="true" className={s.searchIcon} />
          <input
            ref={inputRef}
            className={s.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder={t('search.placeholder')}
            aria-label={t('search.title')}
            type="search"
            role="combobox"
            aria-expanded={ordered.length > 0}
            aria-controls="search-results"
            aria-autocomplete="list"
            aria-activedescendant={ordered[active] ? optionId(ordered[active]) : undefined}
          />
          <button className={s.closeBtn} onClick={onClose} aria-label={t('common.close')}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* The count is said aloud as it changes; the list itself stays silent. */}
        <p className="visually-hidden" role="status" aria-live="polite">
          {searching ? (results.length ? t('search.found', { n: results.length }) : t('search.empty')) : ''}
        </p>
        <div className={s.results} id="search-results" role="listbox" aria-label={t('search.title')}>
          {!searching && <p className={s.hint}>{t('search.hint')}</p>}
          {searching && results.length === 0 && <p className={s.hint}>{t('search.empty')}</p>}
          {Object.entries(grouped).map(([kind, list]) => (
            <section key={kind} className={s.group} role="group" aria-labelledby={`search-group-${kind}`}>
              <h3 className={s.groupTitle} id={`search-group-${kind}`}>
                {t(KIND_KEY[kind as ResultKind])}
              </h3>
              {list.map((r) => (
                <button
                  key={r.id}
                  id={optionId(r)}
                  role="option"
                  aria-selected={ordered[active]?.id === r.id}
                  tabIndex={-1}
                  className={[s.result, ordered[active]?.id === r.id ? s.resultActive : ''].join(' ')}
                  onClick={() => go(r)}
                  onMouseMove={() => setActive(ordered.indexOf(r))}
                >
                  <span className={s.resultTitle}>
                    <Highlighted text={r.title} query={query.trim()} />
                  </span>
                  <span className={s.resultSnippet}>
                    <Highlighted text={r.snippet} query={query.trim()} />
                  </span>
                </button>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
