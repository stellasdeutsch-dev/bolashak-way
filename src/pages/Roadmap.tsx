import { useEffect, useMemo, type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router'
import { IconArrowDown as ArrowDown, IconCheck as Check, IconChevronRight as ChevronRight, IconLock as Lock, IconSparkles as Sparkles } from '@/components/icons'
import { CHAPTERS } from '@/content/stages'
import { CATEGORIES } from '@/content/categories'
import { CONTENT_META } from '@/content/meta'
import type { ChapterId } from '@/content/types'
import { computeProgress, type StageProgress } from '@/domain/progress'
import { computeDeadlines, nearestDeadline } from '@/domain/deadlines'
import { documentsFor } from '@/domain/documents'
import { staleness } from '@/domain/freshness'
import { useAppStore } from '@/store/useAppStore'
import { useI18n, formatRange } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { Button, Callout, Card, Pill, ProgressRing } from '@/components/ui'
import { StageIcon } from '@/components/StageIcon'
import s from './Roadmap.module.css'

type Row =
  | { kind: 'chapter'; id: string; chapter: (typeof CHAPTERS)[number]; number: number; done: number; total: number }
  | { kind: 'stage'; id: string; item: StageProgress }

/**
 * A straight vertical path: one spine on the left, every stage a row on it, the
 * content read left-to-right. Chosen over a winding trail because 17–19 stages
 * have to be scannable — the same shape Coursera and Khan Academy use for a syllabus.
 */
function RoadmapTrack({ rows, currentId, continueLabel }: { rows: Row[]; currentId?: string; continueLabel: string }) {
  const { t, c } = useI18n()
  const stageIds = rows.filter((r) => r.kind === 'stage').map((r) => r.id)
  const firstStageId = stageIds[0]
  const lastStageId = stageIds[stageIds.length - 1]

  return (
    <div className={s.track}>
      {rows.map((row, i) => {
        // The cascade should settle quickly even on a 19-stage path.
        const index = Math.min(i, 10)
        if (row.kind === 'chapter') {
          return (
            <div key={row.id} className={s.banner} style={{ '--i': index } as CSSProperties}>
              <span className={s.chapterNum}>{String(row.number).padStart(2, '0')}</span>
              <div className={s.chapterText}>
                <h2 className={s.chapterTitle}>{c(row.chapter.title)}</h2>
                <p className={s.chapterSub}>{c(row.chapter.subtitle)}</p>
              </div>
              <span className={[s.chapterCount, row.done === row.total ? s.chapterCountDone : ''].join(' ')}>
                {row.done === row.total && <Check size={13} strokeWidth={3} aria-hidden="true" />}
                {t('roadmap.chapterProgress', { done: row.done, total: row.total })}
              </span>
            </div>
          )
        }

        const item = row.item
        const isCurrent = item.stage.id === currentId
        const statusLabel =
          item.status === 'done'
            ? t('roadmap.doneState')
            : item.status === 'locked'
              ? t('roadmap.locked')
              : item.status === 'in-progress'
                ? t('roadmap.inProgress')
                : t('roadmap.available')

        return (
          <Link
            key={item.stage.id}
            id={`node-${item.stage.id}`}
            to={`/stage/${item.stage.id}`}
            className={[s.row, item.status === 'locked' ? s.rowLocked : '', isCurrent ? s.rowCurrent : ''].join(' ')}
            style={{ '--i': index } as CSSProperties}
            aria-label={`${c(item.stage.title)} — ${statusLabel}`}
          >
            <span
              className={[
                s.rail,
                item.stage.id === firstStageId ? s.railFirst : '',
                item.stage.id === lastStageId ? s.railLast : '',
                item.status === 'done' ? s.railDone : '',
              ].join(' ')}
            >
              <span
                className={[
                  s.bubble,
                  item.status === 'locked' ? s.bubbleLocked : '',
                  item.status === 'available' && !isCurrent ? s.bubbleAvailable : '',
                  item.status === 'in-progress' ? s.bubbleProgress : '',
                  item.status === 'done' ? s.bubbleDone : '',
                  isCurrent && item.status !== 'done' ? s.bubbleCurrent : '',
                ].join(' ')}
              >
                <StageIcon name={item.stage.icon} size={22} />
                <span className={[s.badge, item.status === 'done' ? s.badgeDone : ''].join(' ')}>
                  {item.status === 'done' ? (
                    <Check size={12} strokeWidth={3} />
                  ) : item.status === 'locked' ? (
                    <Lock size={10} />
                  ) : (
                    <span className={s.badgeNum}>{item.index + 1}</span>
                  )}
                </span>
              </span>
            </span>

            <span className={s.rowBody}>
              <span className={s.rowTitle}>
                {c(item.stage.title)}
                {isCurrent && item.status !== 'done' && <span className={s.nowTag}>{continueLabel}</span>}
              </span>
              <span className={s.rowSummary}>{c(item.stage.summary)}</span>
              <span className={s.rowMeta}>
                {item.status === 'done' && item.autoDone
                  ? t('roadmap.autoDone')
                  : t('roadmap.items', { done: item.requiredDone, total: item.requiredTotal })}
              </span>
            </span>

            <ChevronRight className={s.rowChevron} size={18} aria-hidden="true" />
          </Link>
        )
      })}
    </div>
  )
}

export function Roadmap() {
  const { t, c, locale } = useI18n()
  const navigate = useNavigate()
  const profile = useAppStore((st) => st.profile)
  const checked = useAppStore((st) => st.checked)
  const stagesDone = useAppStore((st) => st.stagesDone)

  useEffect(() => {
    if (!profile) navigate('/onboarding', { replace: true })
  }, [profile, navigate])

  const progress = useMemo(
    () => (profile ? computeProgress({ profile, checked, stagesDone }) : null),
    [profile, checked, stagesDone],
  )
  const dates = useAppStore((st) => st.dates)
  const nearest = useMemo(() => (profile ? nearestDeadline(computeDeadlines(profile, dates, new Date())) : null), [profile, dates])
  const stale = useMemo(() => staleness(CONTENT_META, new Date()), [])
  const docCount = useMemo(() => (profile ? documentsFor(profile).reduce((n, g) => n + g.items.length, 0) : 0), [profile])
  usePageChrome(t('nav.roadmap'))

  if (!profile || !progress) return null

  const category = CATEGORIES[profile.category]
  const current = progress.current

  const byChapter = CHAPTERS.map((ch) => ({
    chapter: ch,
    items: progress.stages.filter((s2) => s2.stage.chapter === (ch.id as ChapterId)),
  })).filter((g) => g.items.length > 0)

  const rows: Row[] = byChapter.flatMap((group, idx) => [
    {
      kind: 'chapter' as const,
      id: `chapter-${group.chapter.id}`,
      chapter: group.chapter,
      number: idx + 1,
      done: group.items.filter((i) => i.status === 'done').length,
      total: group.items.length,
    },
    ...group.items.map((item) => ({ kind: 'stage' as const, id: item.stage.id, item })),
  ])

  const jumpToCurrent = () => {
    if (!current) return
    const el = document.getElementById(`node-${current.stage.id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    else navigate(`/stage/${current.stage.id}`)
  }

  return (
    <div className={s.page}>
      {stale.stale && (
        <Callout tone="warn" source="pravila">
          <strong>{t('stale.title')}</strong>
          <br />
          {stale.staleByAge && <>{t('stale.byAge', { n: stale.monthsSinceVerified })} </>}
          {stale.staleByYear && <>{t('stale.byYear', { year: CONTENT_META.competitionYear })} </>}
          {t('stale.action')}
        </Callout>
      )}

      <Card className={s.intro}>
        <div className={s.introText}>
          <Pill tone="accent">
            <Sparkles size={13} aria-hidden="true" />
            {t('roadmap.forCategory')}
          </Pill>
          <h1 className={`display ${s.introTitle}`}>
            {t('roadmap.yourPath')}
            <b>{c(category.short)}</b>
          </h1>
          <p className={s.introSub}>{c(category.desc)}</p>
          <div className={s.stats}>
            <span className={s.stat}>
              <b className={s.statNum}>{String(progress.totalStages).padStart(2, '0')}</b>
              <span className={s.statLabel}>{t('roadmap.statStages')}</span>
            </span>
            <span className={s.stat}>
              <b className={s.statNum}>{String(docCount).padStart(2, '0')}</b>
              <span className={s.statLabel}>{t('roadmap.statDocuments')}</span>
            </span>
            {progress.estimateMonths && (
              <span className={s.stat} title={c(CONTENT_META.estimateNote)}>
                <b className={s.statNum}>{formatRange(progress.estimateMonths[0], progress.estimateMonths[1])}</b>
                <span className={s.statLabel}>
                  {t('common.months')} {t('roadmap.estimate')}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className={s.introRing}>
          <ProgressRing value={progress.ratio} size={104} stroke={10} />
          <span className={s.introRingLabel}>{t('roadmap.progress')}</span>
        </div>
      </Card>

      <div className={s.sticky}>
        <div className={s.hud}>
          <ProgressRing value={progress.ratio} size={54} stroke={6} dark />
          <div className={s.hudText}>
            <div className={s.hudKicker}>
              {current
                ? t('roadmap.stageOf', { n: current.index + 1, total: progress.totalStages })
                : t('roadmap.allDone')}
            </div>
            <div className={s.hudTitle}>{current ? c(current.stage.title) : c(category.workBack)}</div>
            {progress.nextItem && (
              <Link className={s.hudNext} to={`/stage/${progress.nextItem.stage.stage.id}`}>
                <span className={s.hudNextLabel}>{t('roadmap.nextAction')}</span>
                <span className={s.hudNextText}>{c(progress.nextItem.item.text)}</span>
              </Link>
            )}
            <div className={s.hudMeta}>
              <Pill tone="dark">
                {t('roadmap.stagesDoneOf', { done: progress.doneStages, total: progress.totalStages })}
              </Pill>
              {nearest && (
                <Link to={`/stage/${nearest.rule.stage}`} className={s.hudDeadline}>
                  <Pill tone={nearest.status === 'overdue' ? 'warn' : 'accent'}>
                    <span title={c(nearest.rule.label)}>
                      {nearest.daysLeft < 0
                        ? t('deadlines.overdue', { n: Math.abs(nearest.daysLeft) })
                        : nearest.daysLeft === 0
                          ? t('deadlines.today')
                          : t('deadlines.daysLeft', { n: nearest.daysLeft })}
                      {' · '}
                      {c(nearest.rule.label)}
                    </span>
                  </Pill>
                </Link>
              )}
              {progress.estimateMonths && (
                <span title={c(CONTENT_META.estimateNote)}>
                  <Pill tone="dark">
                    ≈ {formatRange(progress.estimateMonths[0], progress.estimateMonths[1])} {t('common.months')} {t('roadmap.estimate')}
                  </Pill>
                </span>
              )}
            </div>
          </div>
          {current && (
            <>
              <span className={s.hudBtnNarrow}>
                <Button size="sm" onClick={jumpToCurrent} ariaLabel={t('common.continue')}>
                  <ArrowDown size={16} aria-hidden="true" />
                </Button>
              </span>
              <span className={s.hudBtnWide}>
                <Button size="md" onClick={jumpToCurrent}>
                  {t('common.continue')}
                  <ArrowDown size={16} aria-hidden="true" />
                </Button>
              </span>
            </>
          )}
        </div>
      </div>

      <RoadmapTrack rows={rows} currentId={current?.stage.id} continueLabel={t('common.continue')} />

      <div className={s.legend}>
        <span className={s.legendItem}>
          <i className={`${s.dot} ${s.dotDone}`} /> {t('roadmap.doneState')}
        </span>
        <span className={s.legendItem}>
          <i className={`${s.dot} ${s.dotNow}`} /> {t('roadmap.current')}
        </span>
        <span className={s.legendItem}>
          <i className={`${s.dot} ${s.dotOpen}`} /> {t('roadmap.available')}
        </span>
        <span className={s.legendItem}>
          <i className={`${s.dot} ${s.dotLocked}`} /> {t('roadmap.locked')}
        </span>
      </div>

      <Card className={s.disclaimer}>
        <Pill>
          {t('common.year')}: {CONTENT_META.competitionYear}
        </Pill>{' '}
        <Pill>
          {t('common.verifiedOn')}: {new Date(CONTENT_META.lastVerified).toLocaleDateString(locale === 'en' ? 'en-GB' : locale === 'kk' ? 'kk-KZ' : 'ru-RU')}
        </Pill>
        <p className={s.introSub} style={{ marginTop: 12 }}>
          {c(CONTENT_META.disclaimer)}
        </p>
      </Card>
    </div>
  )
}
