import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type {
  InternshipSpecialty, PrioritySpecialty, RecommendedUniversity, ScienceArea, ScienceDirection, ScienceOrg,
} from '@/content/lists'
import type { SourceId } from '@/content/types'
import { LIST_SOURCES, matches, matchingEquivalents } from '@/content/lists'
import { useI18n } from '@/i18n'
import { SourceLink } from '@/components/ui'
import { IconSearch as Search, IconExternal as ExternalLink, IconClose as Close } from '@/components/icons'
import s from './ListSearch.module.css'

const LIMIT = 25

/**
 * Each list is a snapshot of an official PDF — hundreds of kilobytes nobody needs until
 * they search. They load the first time somebody types, never with the page.
 */
function useLazy<T>(active: boolean, load: () => Promise<T>): T | null {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    if (!active || data) return
    let alive = true
    void load().then((m) => {
      if (alive) setData(m)
    })
    return () => {
      alive = false
    }
    // `load` is a stable module import per call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, data])
  return data
}

interface AcademicLists {
  SPECIALTIES: PrioritySpecialty[]
  UNIVERSITIES: RecommendedUniversity[]
  LISTS_TAKEN_ON: string
}
interface InternshipLists {
  INTERNSHIP_SPECIALTIES: InternshipSpecialty[]
  INTERNSHIP_TAKEN_ON: string
}
interface ScienceLists {
  SCIENCE_AREAS: ScienceArea[]
  SCIENCE_DIRECTIONS: ScienceDirection[]
  SCIENCE_ORGS: ScienceOrg[]
  SCIENCE_TAKEN_ON: string
}

const loadAcademic = () => import('@/content/lists.generated') as unknown as Promise<AcademicLists>
const loadInternship = () => import('@/content/lists.internship.generated') as unknown as Promise<InternshipLists>
const loadScience = () => import('@/content/lists.science.generated') as unknown as Promise<ScienceLists>

const active = (q: string) => q.trim().length >= 2

function Shell({
  placeholder,
  query,
  onQuery,
  sources,
  takenOn,
  children,
}: {
  placeholder: string
  query: string
  onQuery: (v: string) => void
  sources: SourceId[]
  takenOn?: string
  children: ReactNode
}) {
  const { t, locale } = useI18n()
  return (
    <div className={s.wrap}>
      <label className={s.field}>
        <Search size={17} aria-hidden="true" />
        {/* type="text" with a role: iOS Safari styles type="search" with its own rounded box. */}
        <input type="text" role="searchbox" inputMode="search" enterKeyHint="search" autoComplete="off" value={query} placeholder={placeholder} onChange={(e) => onQuery(e.target.value)} aria-label={placeholder} />
        {query && (
          <button className={s.clear} onClick={() => onQuery('')} aria-label={t('common.clear')}>
            <Close size={15} aria-hidden="true" />
          </button>
        )}
      </label>
      {children}
      <div className={s.foot}>
        {sources.map((src) => (
          <SourceLink key={src} id={src} />
        ))}
        {takenOn && (
          <span className={s.taken}>
            {t('lists.takenOn')}: {new Date(takenOn).toLocaleDateString(locale === 'en' ? 'en-GB' : locale === 'kk' ? 'kk-KZ' : 'ru-RU')}
          </span>
        )}
      </div>
    </div>
  )
}

function Status({ query, loaded, found, nothing }: { query: string; loaded: boolean; found: number; nothing: string }) {
  const { t } = useI18n()
  if (!active(query)) return null
  if (!loaded) return <p className={s.status}>{t('lists.loading')}</p>
  if (found === 0) return <p className={s.status}>{nothing}</p>
  return <p className={s.status}>{t('lists.found', { n: found })}</p>
}

function More({ total }: { total: number }) {
  const { t } = useI18n()
  return total > LIMIT ? <p className={s.status}>{t('lists.more', { n: total - LIMIT })}</p> : null
}

/* ── academic specialties: one level per platform ── */

export type SpecialtyLevel = 'Бакалавриат' | 'Магистратура' | 'Докторантура'

const LEVEL_HINT: Record<SpecialtyLevel, string> = {
  Бакалавриат: 'lists.hintBachelor',
  Магистратура: 'lists.hintMaster',
  Докторантура: 'lists.hintDoctorate',
}

/** Is this field on the priority list at my level? */
export function SpecialtySearch({ level }: { level?: SpecialtyLevel }) {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const lists = useLazy(active(query), loadAcademic)
  const hits = useMemo(() => {
    if (!lists || !active(query)) return []
    return lists.SPECIALTIES.filter(
      (sp) => (!level || sp.levels.some((l) => l.level === level)) && matches(`${sp.ru} ${sp.group} ${sp.en}`, query),
    )
  }, [lists, query, level])

  return (
    <Shell placeholder={t('lists.specialtyPlaceholder')} query={query} onQuery={setQuery} sources={[LIST_SOURCES.specialties]} takenOn={lists?.LISTS_TAKEN_ON}>
      <p className={s.hint}>{t(level ? LEVEL_HINT[level] : 'lists.specialtyHint')}</p>
      <Status query={query} loaded={!!lists} found={hits.length} nothing={t('lists.nothing')} />
      {hits.length > 0 && (
        <>
          <ul className={s.results}>
            {hits.slice(0, LIMIT).map((sp) => {
              const why = matchingEquivalents(sp.en, query)
              const levels = level ? sp.levels.filter((l) => l.level === level) : sp.levels
              return (
                <li key={sp.n} className={s.row}>
                  <span className={s.rowHead}>
                    <b className={s.rowTitle}>{sp.ru}</b>
                    <span className={s.codes}>
                      {levels.map((l) => (
                        <span key={l.code} className={s.code} title={l.level}>
                          {level ? l.code : `${l.level} · ${l.code}`}
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
          <More total={hits.length} />
        </>
      )}
    </Shell>
  )
}

/** Is this university on the list the scholarship recommends? */
export function UniversitySearch() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const lists = useLazy(active(query), loadAcademic)
  const hits = useMemo(() => {
    if (!lists || !active(query)) return []
    return lists.UNIVERSITIES.filter((u) => matches(`${u.name} ${u.country}`, query))
  }, [lists, query])

  return (
    <Shell placeholder={t('lists.universityPlaceholder')} query={query} onQuery={setQuery} sources={[LIST_SOURCES.universities]} takenOn={lists?.LISTS_TAKEN_ON}>
      <p className={s.hint}>{t('lists.universityHint')}</p>
      <Status query={query} loaded={!!lists} found={hits.length} nothing={t('lists.nothingUni')} />
      {hits.length > 0 && (
        <>
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
          <More total={hits.length} />
        </>
      )}
    </Shell>
  )
}

/* ── internships: their own specialty list ── */

export function InternshipSpecialtySearch() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const lists = useLazy(active(query), loadInternship)
  const hits = useMemo(() => {
    if (!lists || !active(query)) return []
    return lists.INTERNSHIP_SPECIALTIES.filter((sp) => matches(`${sp.name} ${sp.group} ${sp.direction} ${sp.code}`, query))
  }, [lists, query])

  return (
    <Shell placeholder={t('lists.internshipPlaceholder')} query={query} onQuery={setQuery} sources={['pps_internship_pdf']} takenOn={lists?.INTERNSHIP_TAKEN_ON}>
      <p className={s.hint}>{t('lists.internshipHint')}</p>
      <Status query={query} loaded={!!lists} found={hits.length} nothing={t('lists.nothing')} />
      {hits.length > 0 && (
        <>
          <ul className={s.results}>
            {hits.slice(0, LIMIT).map((sp) => (
              <li key={sp.n} className={s.row}>
                <span className={s.rowHead}>
                  <b className={s.rowTitle}>{sp.name}</b>
                  <span className={s.code}>{sp.code}</span>
                </span>
                <span className={s.rowMeta}>
                  {sp.direction} · {sp.group}
                </span>
              </li>
            ))}
          </ul>
          <More total={hits.length} />
        </>
      )}
    </Shell>
  )
}

/* ── scientific internships: directions, and the hosts that take them ── */

/**
 * Two questions in one box: "is my research a priority direction" and "who takes it".
 * Picking a direction narrows the hosts to the universities that list its code plus the
 * research centres, which take every direction.
 */
export function ScienceSearch() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<ScienceDirection | null>(null)
  const [country, setCountry] = useState('')
  const lists = useLazy(active(query) || picked !== null, loadScience)

  const directions = useMemo(() => {
    if (!lists || !active(query) || picked) return []
    return lists.SCIENCE_DIRECTIONS.filter((d) => d.code.split('.').length > 1 && matches(`${d.code} ${d.name}`, query))
  }, [lists, query, picked])

  const allOrgs = useMemo(() => {
    if (!lists) return []
    if (picked) return lists.SCIENCE_ORGS.filter((o) => o.kind === 'centre' || o.codes.includes(picked.code))
    if (!active(query)) return []
    return lists.SCIENCE_ORGS.filter((o) => matches(`${o.name} ${o.country}`, query))
  }, [lists, query, picked])
  // Countries of what is on screen, most hosts first — a direction can bring back hundreds.
  const countries = useMemo(() => {
    const n = new Map<string, number>()
    for (const o of allOrgs) n.set(o.country, (n.get(o.country) ?? 0) + 1)
    return [...n.entries()].sort((a, b) => b[1] - a[1])
  }, [allOrgs])
  const orgs = country ? allOrgs.filter((o) => o.country === country) : allOrgs

  const area = picked && lists ? lists.SCIENCE_AREAS.find((a) => a.code === picked.code.split('.')[0]) : null

  return (
    <Shell
      placeholder={t('lists.sciencePlaceholder')}
      query={query}
      onQuery={(v) => {
        setQuery(v)
        setPicked(null)
        setCountry('')
      }}
      sources={['ns_priorities', 'ns_orgs_pdf']}
      takenOn={lists?.SCIENCE_TAKEN_ON}
    >
      <p className={s.hint}>{t('lists.scienceHint')}</p>
      {!lists && active(query) && <p className={s.status}>{t('lists.loading')}</p>}

      {picked && (
        <div className={s.picked}>
          <span className={s.code}>{picked.code}</span>
          <span className={s.pickedText}>
            <b>{picked.name}</b>
            {area && <span>{area.name}</span>}
          </span>
          <button className={s.clear} onClick={() => { setPicked(null); setCountry('') }} aria-label={t('common.clear')}>
            <Close size={15} aria-hidden="true" />
          </button>
        </div>
      )}

      {directions.length > 0 && (
        <>
          <p className={s.subhead}>{t('lists.directions', { n: directions.length })}</p>
          <ul className={s.results}>
            {directions.slice(0, 12).map((d) => (
              <li key={d.code}>
                <button className={[s.row, s.rowButton].join(' ')} onClick={() => setPicked(d)}>
                  <span className={s.rowHead}>
                    <b className={s.rowTitle}>{d.name}</b>
                    <span className={s.code}>{d.code}</span>
                  </span>
                  <span className={s.rowMeta}>{t('lists.pickDirection')}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {lists && (active(query) || picked) && orgs.length === 0 && directions.length === 0 && <p className={s.status}>{t('lists.nothingOrg')}</p>}
      {countries.length > 1 && (
        <label className={s.countryPick}>
          <span>{t('lists.country')}</span>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">{t('lists.allCountries', { n: allOrgs.length })}</option>
            {countries.map(([name, n]) => (
              <option key={name} value={name}>
                {name} · {n}
              </option>
            ))}
          </select>
        </label>
      )}
      {lists && orgs.length > 0 && (
        <>
          <p className={s.subhead}>
            {picked ? t('lists.hostsFor', { n: orgs.length }) : t('lists.hosts', { n: orgs.length })}
          </p>
          <ul className={s.results}>
            {orgs.slice(0, LIMIT).map((o) => (
              <li key={`${o.kind}-${o.n}`} className={s.row}>
                <span className={s.rowHead}>
                  <b className={s.rowTitle}>{o.name}</b>
                  <span className={[s.code, o.kind === 'centre' ? s.codeAlt : ''].join(' ')}>
                    {t(o.kind === 'centre' ? 'lists.kindCentre' : 'lists.kindUniversity')}
                  </span>
                </span>
                <span className={s.rowMeta}>
                  {o.country}
                  {o.kind === 'university' && !picked && ` · ${t('lists.directionsCount', { n: o.codes.length })}`}
                  {o.kind === 'centre' && ` · ${t('lists.allDirections')}`}
                </span>
              </li>
            ))}
          </ul>
          <More total={orgs.length} />
        </>
      )}
    </Shell>
  )
}
