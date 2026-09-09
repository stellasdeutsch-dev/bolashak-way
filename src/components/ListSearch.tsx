import { useEffect, useMemo, useState } from 'react'
import type { PrioritySpecialty, RecommendedUniversity } from '@/content/lists'
import type { SourceId } from '@/content/types'
import { LIST_SOURCES, matches, matchingEquivalents } from '@/content/lists'
import { useI18n } from '@/i18n'
import { SourceLink } from '@/components/ui'
import { IconSearch as Search, IconExternal as ExternalLink } from '@/components/icons'
import s from './ListSearch.module.css'

interface Lists {
  SPECIALTIES: PrioritySpecialty[]
  UNIVERSITIES: RecommendedUniversity[]
  LISTS_TAKEN_ON: string
}

const LIMIT = 25

/**
 * The lists are a 300 KB snapshot of two official PDFs, so they load only when somebody
 * actually types — the roadmap itself must not pay for them.
 */
function useLists(active: boolean): Lists | null {
  const [data, setData] = useState<Lists | null>(null)
  useEffect(() => {
    if (!active || data) return
    let alive = true
    void import('@/content/lists.generated').then((m) => {
      if (alive) setData(m as unknown as Lists)
    })
    return () => {
      alive = false
    }
  }, [active, data])
  return data
}

function Shell({
  placeholder,
  query,
  onQuery,
  source,
  takenOn,
  children,
}: {
  placeholder: string
  query: string
  onQuery: (v: string) => void
  source: SourceId
  takenOn?: string
  children: React.ReactNode
}) {
  const { t, locale } = useI18n()
  return (
    <div className={s.wrap}>
      <label className={s.field}>
        <Search size={17} aria-hidden="true" />
        <input type="search" value={query} placeholder={placeholder} onChange={(e) => onQuery(e.target.value)} aria-label={placeholder} />
      </label>
      {children}
      <div className={s.foot}>
        <SourceLink id={source} />
        {takenOn && (
          <span className={s.taken}>
            {t('lists.takenOn')}: {new Date(takenOn).toLocaleDateString(locale === 'en' ? 'en-GB' : locale === 'kk' ? 'kk-KZ' : 'ru-RU')}
          </span>
        )}
      </div>
    </div>
  )
}

/** Is this field on the priority list, and for which degrees? */
export function SpecialtySearch() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const lists = useLists(query.trim().length >= 2)
  const hits = useMemo(() => {
    if (!lists || query.trim().length < 2) return []
    return lists.SPECIALTIES.filter((sp) => matches(`${sp.ru} ${sp.group} ${sp.en}`, query))
  }, [lists, query])

  return (
    <Shell placeholder={t('lists.specialtyPlaceholder')} query={query} onQuery={setQuery} source={LIST_SOURCES.specialties} takenOn={lists?.LISTS_TAKEN_ON}>
      <p className={s.hint}>{t('lists.specialtyHint')}</p>
      {query.trim().length >= 2 && !lists && <p className={s.status}>{t('lists.loading')}</p>}
      {lists && query.trim().length >= 2 && hits.length === 0 && <p className={s.status}>{t('lists.nothing')}</p>}
      {hits.length > 0 && (
        <>
          <p className={s.status}>{t('lists.found', { n: hits.length })}</p>
          <ul className={s.results}>
            {hits.slice(0, LIMIT).map((sp) => {
              const why = matchingEquivalents(sp.en, query)
              return (
                <li key={sp.n} className={s.row}>
                  <span className={s.rowHead}>
                    <b className={s.rowTitle}>{sp.ru}</b>
                    <span className={s.codes}>
                      {sp.levels.map((l) => (
                        <span key={l.code} className={s.code} title={l.level}>
                          {l.level} · {l.code}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className={s.rowMeta}>{sp.group}</span>
                  {why.length > 0 && <span className={s.why}>{why.join(' · ')}</span>}
                </li>
              )
            })}
          </ul>
          {hits.length > LIMIT && <p className={s.status}>{t('lists.more', { n: hits.length - LIMIT })}</p>}
        </>
      )}
    </Shell>
  )
}

/** Is this university on the list of the ones the scholarship recommends? */
export function UniversitySearch() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const lists = useLists(query.trim().length >= 2)
  const hits = useMemo(() => {
    if (!lists || query.trim().length < 2) return []
    return lists.UNIVERSITIES.filter((u) => matches(`${u.name} ${u.country}`, query))
  }, [lists, query])

  return (
    <Shell placeholder={t('lists.universityPlaceholder')} query={query} onQuery={setQuery} source={LIST_SOURCES.universities} takenOn={lists?.LISTS_TAKEN_ON}>
      <p className={s.hint}>{t('lists.universityHint')}</p>
      {query.trim().length >= 2 && !lists && <p className={s.status}>{t('lists.loading')}</p>}
      {lists && query.trim().length >= 2 && hits.length === 0 && <p className={s.status}>{t('lists.nothingUni')}</p>}
      {hits.length > 0 && (
        <>
          <p className={s.status}>{t('lists.found', { n: hits.length })}</p>
          <ul className={s.results}>
            {hits.slice(0, LIMIT).map((u) => (
              <li key={u.n} className={s.row}>
                <span className={s.rowHead}>
                  <b className={s.rowTitle}>{u.name}</b>
                  <a className={s.site} href={u.url} target="_blank" rel="noreferrer noopener">
                    {t('lists.site')}
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </span>
                <span className={s.rowMeta}>{u.country}</span>
              </li>
            ))}
          </ul>
          {hits.length > LIMIT && <p className={s.status}>{t('lists.more', { n: hits.length - LIMIT })}</p>}
        </>
      )}
    </Shell>
  )
}
