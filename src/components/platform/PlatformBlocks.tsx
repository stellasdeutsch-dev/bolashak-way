import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { CATEGORIES, CATEGORIES_BY_TRACK, WORKER_GROUPS } from '@/content/categories'
import { getPlatform, type PlatformMeta } from '@/content/platforms'
import { STAGES } from '@/content/stages'
import { chaptersFor } from '@/content/platforms/chapters'
import { MASTER_LANES, REQUIREMENT_MATRIX, REQUIREMENT_MATRIX_SOURCES, type MatrixCell } from '@/content/requirementsMatrix'
import type { Category, CategoryId, L, PlatformHome, PlatformSlug, Profile, SourceId, Track } from '@/content/types'
import { evaluate } from '@/domain/applicability'
import { getStageFor, resolveStage } from '@/domain/resolve'
import { platformPaths } from '@/domain/paths'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { SourceLink } from '@/components/ui'
import { StageIcon } from '@/components/StageIcon'
import { useCountUp, useInView } from '@/components/Reveal'
import { IconCheck as Check, IconArrowRight as ArrowRight, IconClose as Cross, IconChevronDown as ChevronDown } from '@/components/icons'
import s from './Platform.module.css'

/* ── the figures ── */

function FactValue({ value, on }: { value: string; on: boolean }) {
  const numeric = /^\d+$/.test(value) ? Number(value) : null
  const shown = useCountUp(numeric ?? 0, on)
  return <span className={s.factValue}>{numeric === null ? value : shown}</span>
}

export function Facts({ home }: { home: PlatformHome }) {
  const { c } = useI18n()
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div className={s.facts} ref={ref}>
      {home.facts.map((f, i) => (
        <div key={f.value + i} className={[s.fact, seen ? s.factOn : ''].join(' ')} style={{ transitionDelay: `${i * 80}ms` }}>
          <FactValue value={f.value} on={seen} />
          <span className={s.factCaption}>{c(f.caption)}</span>
        </div>
      ))}
      <div className={s.factSources}>
        {[...new Set(home.facts.map((f) => f.source))].map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
    </div>
  )
}

/* ── is this my programme ── */

export function Fit({ home }: { home: PlatformHome }) {
  const { t, c } = useI18n()
  return (
    <div className={s.fit}>
      <div className={s.fitCol}>
        <span className={s.fitTitle}>{t('platform.fitYes')}</span>
        <ul className={s.fitList}>
          {home.fitYes.map((line, i) => (
            <li key={i} className={s.fitYes}>
              <span className={s.fitMark}>
                <Check size={14} aria-hidden="true" />
              </span>
              {c(line)}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.fitCol}>
        <span className={s.fitTitle}>{t('platform.fitNo')}</span>
        <ul className={s.fitList}>
          {home.fitNo.map((n) => {
            const other = getPlatform(n.go)
            return (
              <li key={n.go} className={s.fitNo}>
                <span className={[s.fitMark, s.fitMarkNo].join(' ')}>
                  <Cross size={12} aria-hidden="true" />
                </span>
                <span className={s.fitNoBody}>
                  {c(n.text)}
                  <Link to={platformPaths(n.go).home} className={s.fitGo} data-p={n.go}>
                    <StageIcon name={other.icon} size={13} />
                    {c(other.name)}
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={s.fitSources}>
        {home.fitSources.map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
    </div>
  )
}

/* ── requirements ── */

/**
 * Categories side by side, one requirement per row. The rows and the facts behind them live
 * in content/requirementsMatrix.ts, read from the same category data the roadmap runs on,
 * so the table cannot drift from what the stages ask.
 */
const MATRIX = REQUIREMENT_MATRIX

function CellView({ cell }: { cell: MatrixCell }) {
  const { t, c } = useI18n()
  if (cell.kind === 'yes')
    return (
      <span className={s.matrixYes} aria-label={t('common.yes')}>
        <Check size={14} aria-hidden="true" />
      </span>
    )
  if (cell.kind === 'no')
    return (
      <span className={s.matrixNo} aria-label={t('common.no')}>
        —
      </span>
    )
  return <span className={s.matrixText}>{c(cell.text)}</span>
}

function Matrix({ track }: { track: Track }) {
  const { t, c } = useI18n()
  const cats = CATEGORIES_BY_TRACK[track].map((id) => CATEGORIES[id])
  const profile = useAppStore((st) => st.profile)
  const [picked, setPicked] = useState<CategoryId>(profile?.track === track ? profile.category : cats[0].id)
  // A row nobody on this platform needs would only be noise.
  const rows = MATRIX.filter((r) => cats.some((cat) => r.cell(cat).kind !== 'no'))
  const one = CATEGORIES[picked]
  return (
    <>
      {/* Phones: pick a category, read its column as a card. */}
      <div className={s.catPick}>
        <div className={s.catChips} role="group">
          {cats.map((cat) => (
            <button key={cat.id} className={[s.catChip, picked === cat.id ? s.catChipOn : ''].join(' ')} aria-pressed={picked === cat.id} onClick={() => setPicked(cat.id)}>
              {c(cat.short)}
            </button>
          ))}
        </div>
        <div className={s.catCard}>
          <p className={s.catDesc}>{c(one.desc)}</p>
          <ul className={s.catRows}>
            {rows.map((r) => (
              <li key={r.id} className={s.catRow}>
                <span>{c(r.label)}</span>
                <CellView cell={r.cell(one)} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wider screens: every category side by side. */}
      <div className={s.matrixScroll} tabIndex={0} role="region" aria-label={t('platform.requirementsTitle')}>
        <table className={s.matrix}>
          <thead>
            <tr>
              <th className={s.matrixCorner} />
              {cats.map((cat) => (
                <th key={cat.id} title={c(cat.desc)}>
                  {c(cat.short)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <th scope="row" className={s.matrixLabel}>
                  {c(r.label)}
                </th>
                {cats.map((cat) => (
                  <td key={cat.id}>
                    <CellView cell={r.cell(cat)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.sources}>
        {REQUIREMENT_MATRIX_SOURCES.map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
    </>
  )
}

/** One category: its requirements as numbered cards, each with its own source. */
function Conditions({ category }: { category: Category }) {
  const { c } = useI18n()
  const [ref, seen] = useInView<HTMLOListElement>()
  return (
    <ol className={s.conditions} ref={ref}>
      {category.requirements.map((r, i) => (
        <li key={i} className={[s.condition, seen ? s.conditionOn : ''].join(' ')} style={{ transitionDelay: `${i * 90}ms` }}>
          <span className={s.conditionNum}>{i + 1}</span>
          <span className={s.conditionText}>{c(r.text)}</span>
          <SourceLink id={r.source} />
        </li>
      ))}
    </ol>
  )
}

/** Three years in total, the last twelve months unbroken — drawn, because prose kept losing it. */
function ExperienceBar() {
  const { t } = useI18n()
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div className={s.exp} ref={ref}>
      <div className={s.expRail}>
        {[0, 1, 2].map((y) => (
          <span key={y} className={[s.expYear, seen ? s.expYearOn : '', y === 2 ? s.expYearLast : ''].join(' ')} style={{ transitionDelay: `${y * 220}ms` }}>
            {t('platform.expYear', { n: y + 1 })}
          </span>
        ))}
        <span className={[s.expBrace, seen ? s.expBraceOn : ''].join(' ')}>{t('platform.expContinuous')}</span>
      </div>
      <div className={s.expLegend}>
        <span>
          <i className={s.expSwatchAll} /> {t('platform.expTotal')}
        </span>
        <span>
          <i className={s.expSwatchLast} /> {t('platform.expLast')}
        </span>
      </div>
      <p className={s.expNote}>{t('platform.expShort')}</p>
    </div>
  )
}

function WorkerGroups() {
  const { t, c } = useI18n()
  return (
    <ul className={s.groups}>
      {WORKER_GROUPS.map((g) => (
        <li key={g.id} className={s.group}>
          {c(g.title)}
          {g.shortMonths && <span className={s.groupBadge}>{t('onboarding.shortMonths', { n: g.shortMonths })}</span>}
        </li>
      ))}
    </ul>
  )
}

export function Requirements({ track }: { track: Track }) {
  const { t } = useI18n()
  const cats = CATEGORIES_BY_TRACK[track]
  return (
    <div className={s.reqs}>
      {cats.length > 1 ? <Matrix track={track} /> : <Conditions category={CATEGORIES[cats[0]]} />}
      {track === 'internship' && (
        <>
          <span className={s.subTitle}>{t('platform.workerGroups')}</span>
          <WorkerGroups />
          <span className={s.subTitle}>{t('platform.experience')}</span>
          <ExperienceBar />
        </>
      )}
    </div>
  )
}

/* ── the path, drawn from the platform's own stages ── */

/** Stand-in profile for a platform page: the reader may have none yet, or another one. */
const sample = (track: Track, category: CategoryId): Profile => ({
  track,
  category,
  workerGroup: track === 'internship' ? 'teacher' : null,
  invitation: 'none',
  foreignCert: null,
  kazakhCert: false,
  experience: null,
})

export function Journey({ platform }: { platform: PlatformMeta }) {
  const { t, c } = useI18n()
  const profile = useAppStore((st) => st.profile)
  const mine = profile?.track === platform.track
  const lanes: { id: string; category: CategoryId; label: L }[] =
    platform.track === 'master'
      ? MASTER_LANES
      : [{ id: 'one', category: CATEGORIES_BY_TRACK[platform.track][0], label: { ru: '', en: '' } }]
  const initial = mine && profile ? (CATEGORIES[profile.category].preferential ? 'pref' : 'self') : lanes[0].id
  const [lane, setLane] = useState(lanes.some((l) => l.id === initial) ? initial : lanes[0].id)
  const [ref, seen] = useInView<HTMLDivElement>()

  const p = mine && profile ? profile : sample(platform.track, lanes.find((l) => l.id === lane)!.category)
  const byChapter = useMemo(
    () =>
      chaptersFor(platform.track).map((ch) => ({
        chapter: ch,
        stages: STAGES.filter((st) => st.chapter === ch.id && evaluate(st.appliesTo, p)).map((st) => resolveStage(st, platform.track)),
      })).filter((g) => g.stages.length > 0),
    [p, platform.track],
  )
  const paths = platformPaths(platform.slug)
  let n = 0

  return (
    <div className={s.journey} ref={ref}>
      {lanes.length > 1 && !mine && (
        <div className={s.laneSwitch} role="group">
          {lanes.map((l) => (
            <button key={l.id} className={[s.laneBtn, lane === l.id ? s.laneBtnOn : ''].join(' ')} aria-pressed={lane === l.id} onClick={() => setLane(l.id)}>
              {c(l.label)}
            </button>
          ))}
        </div>
      )}
      <ol className={s.chapters}>
        {byChapter.map(({ chapter, stages }, ci) => (
          <li key={chapter.id} className={[s.chapter, seen ? s.chapterOn : ''].join(' ')} style={{ transitionDelay: `${ci * 110}ms` }}>
            <div className={s.chapterHead}>
              <span className={s.chapterNum}>{String(ci + 1).padStart(2, '0')}</span>
              <span className={s.chapterTitle}>{c(chapter.title)}</span>
            </div>
            <ol className={s.steps}>
              {stages.map((st) => {
                n += 1
                const body = (
                  <>
                    <span className={s.stepIcon}>
                      <StageIcon name={st.icon} size={16} />
                    </span>
                    <span className={s.stepBody}>
                      <span className={s.stepTitle}>
                        <span className={s.stepNum}>{n}</span>
                        {c(st.title)}
                      </span>
                      <span className={s.stepSummary}>{c(st.summary)}</span>
                    </span>
                  </>
                )
                return (
                  <li key={st.id}>
                    {mine ? (
                      <Link to={paths.stage(st.id)} className={[s.step, s.stepLink].join(' ')}>
                        {body}
                      </Link>
                    ) : (
                      <div className={s.step}>{body}</div>
                    )}
                  </li>
                )
              })}
            </ol>
          </li>
        ))}
      </ol>
      <p className={s.journeyNote}>{t(mine ? 'platform.journeyMine' : 'platform.journeySample')}</p>
    </div>
  )
}

/* ── what the programme pays for ── */

export function Coverage({ home }: { home: PlatformHome }) {
  const { c } = useI18n()
  const [ref, seen] = useInView<HTMLUListElement>()
  return (
    <>
      <ul className={s.coverage} ref={ref}>
        {home.coverage.map((item, i) => (
          <li key={i} className={[s.cover, seen ? s.coverOn : ''].join(' ')} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className={s.coverMark}>
              <Check size={14} aria-hidden="true" />
            </span>
            {c(item)}
          </li>
        ))}
      </ul>
      {home.coverageNote && <p className={s.coverNote}>{c(home.coverageNote)}</p>}
      <div className={s.sources}>
        <SourceLink id={home.coverageSource as SourceId} />
        {home.coverageNoteSource && home.coverageNoteSource !== home.coverageSource && <SourceLink id={home.coverageNoteSource} />}
      </div>
    </>
  )
}

export type { PlatformSlug }

/* ── the short version: five chapters at a glance ── */

/**
 * For someone who has never heard of the programme: the whole path as five chapters, one
 * line each. The seventeen stages are one tap away, not on the page by default.
 */
export function PathOverview({ platform }: { platform: PlatformMeta }) {
  const { t, c } = useI18n()
  const [open, setOpen] = useState(false)
  const [ref, seen] = useInView<HTMLOListElement>()
  const profile = useAppStore((st) => st.profile)
  const p = profile?.track === platform.track ? profile : sample(platform.track, CATEGORIES_BY_TRACK[platform.track][0])
  const stages = STAGES.filter((st) => evaluate(st.appliesTo, p))
  const chapters = chaptersFor(platform.track)
    .map((ch) => ({ ch, n: stages.filter((st) => st.chapter === ch.id).length }))
    .filter((x) => x.n > 0)

  return (
    <div className={s.overview}>
      <ol className={s.five} ref={ref}>
        {chapters.map(({ ch }, i) => (
          <li key={ch.id} className={[s.fiveItem, seen ? s.fiveItemOn : ''].join(' ')} style={{ transitionDelay: `${i * 110}ms` }}>
            <span className={s.fiveNum}>{i + 1}</span>
            <span className={s.fiveBody}>
              <b>{c(ch.title)}</b>
              <span>{c(ch.subtitle)}</span>
            </span>
          </li>
        ))}
      </ol>
      <button className={s.moreBtn} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {t(open ? 'platform.hideStages' : 'platform.showStages', { n: stages.length })}
        <ChevronDown size={15} aria-hidden="true" className={open ? s.chevOpen : ''} />
      </button>
      {open && <Journey platform={platform} />}
    </div>
  )
}

/* ── what you get and what you owe ── */

export function Deal({ home, track }: { home: PlatformHome; track: Track }) {
  const { t, c } = useI18n()
  const contract = getStageFor('contract', track)!
  const workback = getStageFor('workback', track)!
  return (
    <div className={s.deal}>
      <div className={s.dealCol}>
        <span className={s.dealTitle}>{t('platform.youGet')}</span>
        <Coverage home={home} />
      </div>
      <div className={[s.dealCol, s.dealOwe].join(' ')}>
        <span className={s.dealTitle}>{t('platform.youOwe')}</span>
        <ul className={s.oweList}>
          <li>
            <StageIcon name={contract.icon} size={18} />
            <span>
              <b>{c(contract.title)}</b>
              {c(contract.summary)}
            </span>
          </li>
          <li>
            <StageIcon name={workback.icon} size={18} />
            <span>
              <b>{c(workback.title)}</b>
              {c(workback.summary)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

/* ── the details, folded ── */

/** One folded topic. Its content mounts only when opened, so the page stays light. */
export function More({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={[s.more, open ? s.moreOpen : ''].join(' ')}>
      <button className={s.moreHead} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className={s.moreText}>
          <b>{title}</b>
          {hint && <span>{hint}</span>}
        </span>
        <ChevronDown size={18} aria-hidden="true" className={open ? s.chevOpen : ''} />
      </button>
      {open && <div className={s.moreBody}>{children}</div>}
    </div>
  )
}
