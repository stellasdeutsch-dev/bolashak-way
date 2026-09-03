import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { DEADLINE_RULES } from '@/content/deadlines'
import { getSource } from '@/content/sources'
import { getStage } from '@/content/stages'
import type { DateKey } from '@/content/types'
import { computeDeadlines, type ComputedDeadline } from '@/domain/deadlines'
import { evaluate } from '@/domain/applicability'
import { buildIcs, downloadIcs } from '@/domain/ics'
import { atNoon, isoOf, monthMatrix } from '@/domain/calendar'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { Button, Callout, Card, Pill, SourceLink } from '@/components/ui'
import {
  IconArrowLeft as ArrowLeft, IconArrowRight as ArrowRight, IconCalendar as CalendarIcon,
  IconClose as Close, IconDownload as Download, IconLock as Lock,
} from '@/components/icons'
import s from './Calendar.module.css'

const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const

/** Anchors are the reader's own dates; deadlines are counted from them by an act. */
type CalEvent =
  | { kind: 'anchor'; id: string; key: DateKey; iso: string; title: string }
  | { kind: 'deadline'; id: string; iso: string; title: string; d: ComputedDeadline }

export function Calendar() {
  const { t, c, locale } = useI18n()
  const profile = useAppStore((st) => st.profile)
  const dates = useAppStore((st) => st.dates)
  const setDate = useAppStore((st) => st.setDate)
  usePageChrome(t('nav.calendar'))

  const today = isoOf(Date.now())
  const [cursor, setCursor] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [openDay, setOpenDay] = useState<string | null>(null)
  const [dragging, setDragging] = useState<DateKey | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)

  const fmtDate = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-GB' : 'ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }),
    [locale],
  )
  const fmtMonth = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-GB' : 'ru-RU', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }),
    [locale],
  )
  const showDate = (iso: string) => fmtDate.format(new Date(atNoon(iso)))

  /** Anchors this profile can even be asked for: a rule has to depend on them. */
  const usedAnchors = useMemo(() => {
    if (!profile) return [] as DateKey[]
    const keys: DateKey[] = []
    for (const r of DEADLINE_RULES) {
      if (!evaluate(r.appliesTo, profile)) continue
      if (!keys.includes(r.anchor)) keys.push(r.anchor)
    }
    return keys
  }, [profile])

  const deadlines = useMemo(
    () => (profile ? computeDeadlines(profile, dates, new Date()) : []),
    [profile, dates],
  )

  const events = useMemo(() => {
    const list: CalEvent[] = []
    for (const key of usedAnchors) {
      const iso = dates[key]
      if (iso) list.push({ kind: 'anchor', id: `anchor-${key}`, key, iso, title: t(`deadlines.${key}`) })
    }
    for (const d of deadlines) {
      list.push({
        kind: 'deadline',
        id: d.occurrence ? `${d.rule.id}-${d.occurrence}` : d.rule.id,
        iso: d.due,
        title: c(d.rule.label),
        d,
      })
    }
    return list
  }, [usedAnchors, dates, deadlines, t, c])

  const byDate = useMemo(() => {
    const map = new Map<string, CalEvent[]>()
    for (const e of events) {
      const bucket = map.get(e.iso)
      if (bucket) bucket.push(e)
      else map.set(e.iso, [e])
    }
    return map
  }, [events])

  const cells = monthMatrix(cursor.year, cursor.month)
  const monthEvents = events
    .filter((e) => {
      const d = new Date(atNoon(e.iso))
      return d.getUTCFullYear() === cursor.year && d.getUTCMonth() === cursor.month
    })
    .sort((a, b) => a.iso.localeCompare(b.iso))

  const missingAnchors = usedAnchors.filter((k) => !dates[k])

  function shiftMonth(delta: number) {
    const d = new Date(Date.UTC(cursor.year, cursor.month + delta, 1, 12))
    setCursor({ year: d.getUTCFullYear(), month: d.getUTCMonth() })
    setOpenDay(null)
  }

  function goToday() {
    const now = new Date()
    setCursor({ year: now.getFullYear(), month: now.getMonth() })
    setOpenDay(null)
  }

  function exportIcs() {
    if (deadlines.length === 0) return
    const text = buildIcs(
      deadlines.map((d) => ({
        id: d.occurrence ? `${d.rule.id}-${d.occurrence}` : d.rule.id,
        date: d.due,
        summary: c(d.rule.label),
        description: [
          c(getStage(d.rule.stage)?.title),
          `${getSource(d.rule.source).org}: ${getSource(d.rule.source).url}`,
        ].join('\n'),
        // Nothing already overdue should wake anybody up a week before it happened.
        reminderDays: d.status === 'overdue' ? 0 : 7,
      })),
      t('calendar.icsName'),
      new Date(),
    )
    downloadIcs(text, `bolashak-way-${today}.ics`)
  }

  /** Moving an anchor is the only drag that is allowed to change anything. */
  function moveAnchor(key: DateKey, iso: string) {
    if (dates[key] === iso) return
    setDate(key, iso)
    const d = new Date(atNoon(iso))
    setCursor({ year: d.getUTCFullYear(), month: d.getUTCMonth() })
    setOpenDay(iso)
  }

  if (!profile) {
    return (
      <div className={s.page}>
        <Card className={s.empty}>
          <CalendarIcon size={26} />
          <h1 className={s.emptyTitle}>{t('calendar.noProfileTitle')}</h1>
          <p className={s.emptyText}>{t('calendar.noProfileText')}</p>
          <Link to="/onboarding">
            <Button>{t('about.ctaButton')}</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const openEvents = openDay ? (byDate.get(openDay) ?? []) : []

  return (
    <div className={s.page}>
      <Card className={s.bar}>
        <div className={s.nav}>
          <button className={s.arrow} onClick={() => shiftMonth(-1)} aria-label={t('calendar.prevMonth')}>
            <ArrowLeft size={17} />
          </button>
          <Button variant="quiet" size="sm" onClick={goToday}>
            {t('calendar.today')}
          </Button>
          <button className={s.arrow} onClick={() => shiftMonth(1)} aria-label={t('calendar.nextMonth')}>
            <ArrowRight size={17} />
          </button>
        </div>
        <h1 className={s.title} aria-live="polite">
          {fmtMonth.format(new Date(Date.UTC(cursor.year, cursor.month, 1, 12)))}
        </h1>
        <Button variant="secondary" size="sm" onClick={exportIcs} disabled={deadlines.length === 0}>
          <Download size={15} />
          {t('calendar.ics')}
        </Button>
      </Card>

      <p className={s.hint}>{t('calendar.hint')}</p>

      <Card className={s.gridCard}>
        <table className={s.grid}>
          <caption className="visually-hidden">{t('calendar.caption')}</caption>
          <thead>
            <tr>
              {WEEKDAY_KEYS.map((k) => (
                <th key={k} scope="col">
                  {t(`calendar.${k}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4, 5].map((w) => (
              <tr key={w}>
                {cells.slice(w * 7, w * 7 + 7).map((cell) => {
                  const items = byDate.get(cell.iso) ?? []
                  const cls = [
                    s.cell,
                    cell.inMonth ? '' : s.outside,
                    cell.iso === today ? s.isToday : '',
                    cell.iso < today ? s.isPast : '',
                    dropTarget === cell.iso ? s.isDrop : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                  return (
                    <td
                      key={cell.iso}
                      className={cls}
                      onDragOver={(e) => {
                        if (!dragging) return
                        e.preventDefault()
                        e.dataTransfer.dropEffect = 'move'
                        setDropTarget(cell.iso)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        const key = (dragging ?? e.dataTransfer.getData('text/plain')) as DateKey
                        setDragging(null)
                        setDropTarget(null)
                        if (key) moveAnchor(key, cell.iso)
                      }}
                    >
                      <button className={s.dayNum} onClick={() => setOpenDay(cell.iso)}>
                        <span className="visually-hidden">
                          {showDate(cell.iso)}
                          {items.length ? `, ${t('calendar.eventsCount', { n: items.length })}` : `, ${t('calendar.emptyDay')}`}
                        </span>
                        <span aria-hidden="true">{cell.day}</span>
                      </button>
                      <div className={s.chips}>
                        {items.map((e) => (
                          <button
                            key={e.id}
                            className={[
                              s.chip,
                              e.kind === 'anchor' ? s.chipAnchor : s[`chip_${e.d.status}`],
                            ].join(' ')}
                            title={e.title}
                            // The label is the only accessible name once the chip
                            // collapses to a dot on a narrow screen.
                            aria-label={e.title}
                            draggable={e.kind === 'anchor'}
                            onDragStart={(ev) => {
                              if (e.kind !== 'anchor') return
                              setDragging(e.key)
                              ev.dataTransfer.effectAllowed = 'move'
                              // Safari refuses to start a drag with an empty dataTransfer.
                              ev.dataTransfer.setData('text/plain', e.key)
                            }}
                            onDragEnd={() => {
                              setDragging(null)
                              setDropTarget(null)
                            }}
                            onClick={() => setOpenDay(e.iso)}
                          >
                            <span className={s.chipDot} aria-hidden="true" />
                            <span className={s.chipText}>{e.title}</span>
                          </button>
                        ))}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {openDay && (
        <Card className={s.dayCard}>
          <div className={s.dayHead}>
            <h2 className={s.dayTitle}>{showDate(openDay)}</h2>
            <button className={s.close} onClick={() => setOpenDay(null)} aria-label={t('common.close')}>
              <Close size={17} />
            </button>
          </div>
          {openEvents.length === 0 ? (
            <p className={s.dayEmpty}>{t('calendar.nothingHere')}</p>
          ) : (
            openEvents.map((e) =>
              e.kind === 'anchor' ? (
                <div key={e.id} className={s.dayItem}>
                  <span className={s.dayItemTitle}>{e.title}</span>
                  <Pill tone="accent">{t('calendar.yourDate')}</Pill>
                  <label className={s.dayField}>
                    <span>{t('calendar.changeDate')}</span>
                    <input
                      type="date"
                      value={e.iso}
                      onChange={(ev) => {
                        // An empty field is a mis-click on the picker, not "remove the date";
                        // clearing an anchor is done deliberately on the stage screen.
                        if (ev.target.value) moveAnchor(e.key, ev.target.value)
                      }}
                    />
                  </label>
                </div>
              ) : (
                <div key={e.id} className={s.dayItem}>
                  <span className={s.dayItemTitle}>{e.title}</span>
                  <span className={s.dayItemMeta}>
                    <Lock size={13} aria-hidden="true" />
                    {t('calendar.officialTerm')}
                  </span>
                  <p className={s.dayItemNote}>
                    {t('calendar.countedFrom', { anchor: t(`deadlines.${e.d.rule.anchor}`) })}
                  </p>
                  <div className={s.dayItemLinks}>
                    <Link className={s.stageLink} to={`/stage/${e.d.rule.stage}`}>
                      {c(getStage(e.d.rule.stage)?.title)}
                    </Link>
                    <SourceLink id={e.d.rule.source} />
                  </div>
                </div>
              ),
            )
          )}
        </Card>
      )}

      <Card className={s.agenda}>
        <h2 className={s.agendaTitle}>{t('calendar.thisMonth')}</h2>
        {monthEvents.length === 0 ? (
          <p className={s.dayEmpty}>{t('calendar.monthEmpty')}</p>
        ) : (
          <ul className={s.agendaList}>
            {monthEvents.map((e) => (
              <li key={e.id} className={s.agendaRow}>
                <span className={[s.agendaDate, e.iso === today ? s.isTodayText : '', e.iso < today ? s.isPastText : ''].join(' ')}>
                  {showDate(e.iso)}
                </span>
                <button
                  className={[s.chip, e.kind === 'anchor' ? s.chipAnchor : s[`chip_${e.d.status}`]].join(' ')}
                  onClick={() => setOpenDay(e.iso)}
                >
                  <span className={s.chipDot} aria-hidden="true" />
                  <span className={s.chipText}>{e.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {missingAnchors.length > 0 && (
        <Card className={s.agenda}>
          <h2 className={s.agendaTitle}>{t('calendar.missingTitle')}</h2>
          <p className={s.dayEmpty}>{t('calendar.missingText')}</p>
          <div className={s.missing}>
            {missingAnchors.map((key) => (
              <label key={key} className={s.missingRow}>
                <span>{t(`deadlines.${key}`)}</span>
                <input
                  type="date"
                  value=""
                  onChange={(ev) => {
                    if (ev.target.value) moveAnchor(key, ev.target.value)
                  }}
                />
              </label>
            ))}
          </div>
        </Card>
      )}

      <div className={s.legend}>
        <span className={[s.legendItem, s.chipAnchor].join(' ')}>{t('calendar.legendAnchor')}</span>
        <span className={[s.legendItem, s.chip_upcoming].join(' ')}>{t('calendar.legendUpcoming')}</span>
        <span className={[s.legendItem, s.chip_soon].join(' ')}>{t('calendar.legendSoon')}</span>
        <span className={[s.legendItem, s.chip_overdue].join(' ')}>{t('calendar.legendOverdue')}</span>
      </div>

      {deadlines.length > 0 && (
        <Callout tone="info">
          {t('calendar.sourcesNote')}
          <div className={s.sources}>
            {[...new Set(deadlines.map((d) => d.rule.source))].map((src) => (
              <SourceLink key={src} id={src} />
            ))}
          </div>
        </Callout>
      )}
    </div>
  )
}
