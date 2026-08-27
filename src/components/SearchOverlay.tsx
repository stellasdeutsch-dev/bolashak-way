import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, X } from 'lucide-react'
import { MIN_QUERY, searchAll, type ResultKind, type SearchResult } from '@/domain/search'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
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
  const restoreTo = useRef<HTMLElement | null>(null)

  const results = useMemo(() => (profile && open ? searchAll(query, profile, locale) : []), [query, profile, locale, open])

  useEffect(() => {
    if (!open) return
    restoreTo.current = document.activeElement as HTMLElement
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      // Keep focus inside the dialog while it is open.
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input')
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      restoreTo.current?.focus?.()
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  if (!open) return null

  const go = (r: SearchResult) => {
    onClose()
    navigate(r.href)
  }

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    ;(acc[r.kind] ??= []).push(r)
    return acc
  }, {})

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
            placeholder={t('search.placeholder')}
            aria-label={t('search.title')}
            type="search"
          />
          <button className={s.closeBtn} onClick={onClose} aria-label={t('common.close')}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={s.results}>
          {query.trim().length < MIN_QUERY && <p className={s.hint}>{t('search.hint')}</p>}
          {query.trim().length >= MIN_QUERY && results.length === 0 && <p className={s.hint}>{t('search.empty')}</p>}
          {Object.entries(grouped).map(([kind, list]) => (
            <section key={kind} className={s.group}>
              <h3 className={s.groupTitle}>{t(KIND_KEY[kind as ResultKind])}</h3>
              {list.map((r) => (
                <button key={r.id} className={s.result} onClick={() => go(r)}>
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
