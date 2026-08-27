import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowDown, Check, Lock, Sparkles } from 'lucide-react'
import { CHAPTERS } from '@/content/stages'
import { CATEGORIES } from '@/content/categories'
import { CONTENT_META } from '@/content/meta'
import type { ChapterId } from '@/content/types'
import { computeProgress, type StageProgress } from '@/domain/progress'
import { computeDeadlines, nearestDeadline } from '@/domain/deadlines'
import { useAppStore } from '@/store/useAppStore'
import { useI18n, formatRange } from '@/i18n'
import { Button, Card, Pill, ProgressRing } from '@/components/ui'
import { StageIcon } from '@/components/StageIcon'
import s from './Roadmap.module.css'

const TOP_PAD = 12
/** Nodes need more vertical room on narrow screens, where labels wrap to two lines. */
const gapFor = (width: number) => (width < 420 ? 158 : width < 720 ? 146 : 134)

function useTrackWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(360)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setWidth(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return { ref, width }
}

/** Winding column of nodes for one chapter, connected by a dotted curve. */
function ChapterTrack({ items, currentId }: { items: StageProgress[]; currentId?: string }) {
  const { ref, width } = useTrackWidth()
  const { t, c } = useI18n()

  const gap = gapFor(width)
  const points = useMemo(() => {
    const amp = Math.min(110, Math.max(0, width / 2 - 96))
    return items.map((_, i) => ({
      x: width / 2 + Math.sin(i * 1.05 + 0.4) * amp,
      y: TOP_PAD + 40 + i * gap,
    }))
  }, [items, width, gap])

  const height = TOP_PAD + 40 + Math.max(0, items.length - 1) * gap + 104

  const path = useMemo(() => {
    if (points.length < 2) return ''
    return points
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`
        const prev = points[i - 1]
        const midY = (prev.y + p.y) / 2
        return `C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
      })
      .join(' ')
  }, [points])

  const donePath = useMemo(() => {
    // Only the unbroken run of completed nodes from the start counts as "walked".
    let lastDone = -1
    for (const [i, it] of items.entries()) {
      if (it.status !== 'done') break
      lastDone = i
    }
    if (lastDone < 1) return ''
    return points
      .slice(0, lastDone + 1)
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`
        const prev = points[i - 1]
        const midY = (prev.y + p.y) / 2
        return `C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
      })
      .join(' ')
  }, [items, points])

  return (
    <div className={s.track} ref={ref} style={{ height }}>
      <svg className={s.trackSvg} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        <path className={s.trackLine} d={path} />
        {donePath && <path className={s.trackLineDone} d={donePath} />}
      </svg>

      {items.map((item, i) => {
        const p = points[i]
        const isCurrent = item.stage.id === currentId
        const bubbleClass = [
          s.bubble,
          item.status === 'locked' ? s.bubbleLocked : '',
          item.status === 'available' && !isCurrent ? s.bubbleAvailable : '',
          item.status === 'in-progress' ? s.bubbleProgress : '',
          item.status === 'done' ? s.bubbleDone : '',
          isCurrent && item.status !== 'done' ? `${s.bubbleCurrent} ${s.pulse}` : '',
        ].join(' ')
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
            className={[s.node, item.status === 'locked' ? s.nodeLocked : ''].join(' ')}
            style={{ left: p.x, top: p.y - 37 }}
            aria-label={`${c(item.stage.title)} — ${statusLabel}`}
          >
            <span className={bubbleClass}>
              {item.status === 'in-progress' && (
                <span className={s.ringWrap}>
                  <ProgressRing value={item.requiredTotal ? item.requiredDone / item.requiredTotal : 0} size={74} stroke={4} label="" />
                </span>
              )}
              <StageIcon name={item.stage.icon} size={26} />
              <span className={[s.badge, item.status === 'done' ? s.badgeDone : ''].join(' ')}>
                {item.status === 'done' ? <Check size={14} strokeWidth={3} /> : item.status === 'locked' ? <Lock size={12} /> : <span style={{ fontSize: 11, fontWeight: 700 }}>{item.index + 1}</span>}
              </span>
            </span>
            <span className={s.nodeLabel}>{c(item.stage.title)}</span>
            <span className={s.nodeMeta}>
              {item.status === 'done' && item.autoDone
                ? t('roadmap.autoDone')
                : t('roadmap.items', { done: item.requiredDone, total: item.requiredTotal })}
            </span>
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

  if (!profile || !progress) return null

  const category = CATEGORIES[profile.category]
  const current = progress.current

  const byChapter = CHAPTERS.map((ch) => ({
    chapter: ch,
    items: progress.stages.filter((s2) => s2.stage.chapter === (ch.id as ChapterId)),
  })).filter((g) => g.items.length > 0)

  const jumpToCurrent = () => {
    if (!current) return
    const el = document.getElementById(`node-${current.stage.id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    else navigate(`/stage/${current.stage.id}`)
  }

  return (
    <div className={s.page}>
      <Card className={s.intro}>
        <div className={s.introText}>
          <Pill tone="accent">
            <Sparkles size={13} aria-hidden="true" />
            {t('roadmap.forCategory')}
          </Pill>
          <h1 className={`display ${s.introTitle}`} style={{ marginTop: 12 }}>
            {t('roadmap.yourPath')}
            <b>{c(category.short)}</b>
          </h1>
          <p className={s.introSub}>{c(category.desc)}</p>
        </div>
        <ProgressRing value={progress.ratio} size={92} stroke={9} />
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
                {progress.doneStages} / {progress.totalStages} · {t('roadmap.stages')}
              </Pill>
              {nearest && (
                <Link to={`/stage/${nearest.rule.stage}`} className={s.hudDeadline}>
                  <Pill tone={nearest.status === 'overdue' ? 'warn' : 'accent'}>
                    {c(nearest.rule.label).slice(0, 42)}
                    {c(nearest.rule.label).length > 42 ? '…' : ''} ·{' '}
                    {nearest.daysLeft < 0
                      ? t('deadlines.overdue', { n: Math.abs(nearest.daysLeft) })
                      : nearest.daysLeft === 0
                        ? t('deadlines.today')
                        : t('deadlines.daysLeft', { n: nearest.daysLeft })}
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

      {byChapter.map((group, idx) => (
        <section key={group.chapter.id} className={s.chapter}>
          <header className={s.chapterHead}>
            <span className={s.chapterNum}>{String(idx + 1).padStart(2, '0')}</span>
            <div>
              <h2 className={s.chapterTitle}>{c(group.chapter.title)}</h2>
              <p className={s.chapterSub}>{c(group.chapter.subtitle)}</p>
            </div>
          </header>
          <ChapterTrack items={group.items} currentId={current?.stage.id} />
        </section>
      ))}

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
