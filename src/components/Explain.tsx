import {
  AWARD_TIMELINE, CONTEST_FLOW, DEPARTURE_CHAIN, PATH_LANES, PATH_LANES_SOURCE, WORKBACK_TABLE,
  type ExplainTable, type FlowStep,
} from '@/content/explain'
import { CHAPTERS } from '@/content/stages'
import type { L, Profile, StageId } from '@/content/types'
import { evaluate } from '@/domain/applicability'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { SourceLink } from '@/components/ui'
import { useInView } from '@/components/Reveal'
import { useState } from 'react'
import s from './Explain.module.css'

/** A comparison table. Rows scroll sideways rather than squeezing the page. */
export function DataTable({ table }: { table: ExplainTable }) {
  const { c } = useI18n()
  return (
    <div className={s.block}>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              {table.head.map((h, i) => (
                <th key={i} className={i === table.accentColumn ? s.thAccent : ''}>
                  {c(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className={ci === table.accentColumn ? s.tdAccent : ''}>
                    {c(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.sources}>
        {table.sources.map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
    </div>
  )
}

export function WorkbackTable() {
  return <DataTable table={WORKBACK_TABLE} />
}

/**
 * Two lanes over the same five chapters. The chapters are identical for everyone;
 * what moves is the chapter in which you secure the university place — which is the
 * one thing the text kept failing to make obvious.
 */
export function PathLanes() {
  const { c } = useI18n()
  const [ref, seen] = useInView<HTMLDivElement>()

  return (
    <div className={s.block} ref={ref}>
      <div className={s.lanesScroll}>
        <div className={s.lanes}>
          <div className={s.laneHead} aria-hidden="true" />
          {CHAPTERS.map((ch, i) => (
            <div key={ch.id} className={s.chapterHead} style={{ transitionDelay: `${i * 55}ms` }}>
              <span className={s.chapterNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.chapterName}>{c(ch.title)}</span>
            </div>
          ))}

          {PATH_LANES.map((lane) => (
            <div key={lane.id} className={s.laneRow}>
              <div className={s.laneName}>
                <b>{c(lane.title)}</b>
                <span>{c(lane.note)}</span>
              </div>
              {CHAPTERS.map((ch, i) => {
                const here = lane.admissionAt === ch.id
                return (
                  <div key={ch.id} className={s.cell}>
                    <span
                      className={[s.track, seen ? s.trackOn : ''].join(' ')}
                      style={{ transitionDelay: `${i * 90}ms` }}
                    />
                    {here ? (
                      <span className={[s.marker, seen ? s.markerOn : ''].join(' ')} style={{ transitionDelay: `${i * 90 + 260}ms` }}>
                        {c(lane.admissionLabel)}
                      </span>
                    ) : (
                      <span className={[s.dot, seen ? s.dotOn : ''].join(' ')} style={{ transitionDelay: `${i * 90 + 160}ms` }} />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={s.sources}>
        <SourceLink id={PATH_LANES_SOURCE} />
      </div>
    </div>
  )
}

/**
 * The 0 → 60 → 90 day run after the award. `highlight` dims the mark that does not
 * apply to the reader, so a scientist is not left counting the wrong deadline.
 */
export function AwardTimeline({ highlight }: { highlight?: 'ns' | 'main' }) {
  const { c } = useI18n()
  const [ref, seen] = useInView<HTMLDivElement>()
  const { total, marks, note } = AWARD_TIMELINE

  return (
    <div className={s.block} ref={ref}>
      <div className={s.timeline}>
        <div className={s.rail}>
          <span className={[s.railFill, seen ? s.railFillOn : ''].join(' ')} />
          {marks.map((m) => (
            <span
              key={m.day}
              className={[s.tick, s[`tick_${m.tone}`], seen ? s.tickOn : '', highlight && m.tone !== 'start' && m.tone !== highlight ? s.tickMuted : ''].join(' ')}
              style={{ left: `${(m.day / total) * 100}%`, transitionDelay: `${300 + (m.day / total) * 500}ms` }}
            >
              <span className={s.tickDay}>{m.day}</span>
            </span>
          ))}
        </div>
        <ul className={s.legend}>
          {marks.map((m) => (
            <li
              key={m.day}
              className={[s.legendItem, s[`legend_${m.tone}`], highlight && m.tone !== 'start' && m.tone !== highlight ? s.legendMuted : ''].join(' ')}
            >
              <span className={s.legendDot} />
              <span>{c(m.label)}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className={s.note}>{c(note)}</p>
      {/* Both terms come from two acts between them; naming each once beats three long links. */}
      <div className={s.sources}>
        {[...new Set(marks.map((m) => m.source))].map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
    </div>
  )
}


/* ── the competition as a flowchart ── */

/** Stand-in profiles for the About page, where the reader has no profile yet. */
const FLOW_TRACKS: { id: 'main' | 'science'; label: L; profile: Pick<Profile, 'track'> }[] = [
  { id: 'main', label: { ru: 'Стипендия «Болашак»', kk: '«Болашақ» стипендиясы', en: 'The Bolashak scholarship' }, profile: { track: 'master' } },
  { id: 'science', label: { ru: 'Научная стажировка', kk: 'Ғылыми тағылымдама', en: 'Scientific internship' }, profile: { track: 'science_internship' } },
]

function FlowChart({ steps, hereStage, seen }: { steps: FlowStep[]; hereStage?: StageId; seen: boolean }) {
  const { c, t } = useI18n()
  return (
    <ol className={s.flow}>
      {steps.map((step, i) => {
        const here = hereStage !== undefined && step.stage === hereStage
        return (
          <li
            key={step.id}
            className={[s.flowRow, s[`flow_${step.kind}`], here ? s.flowHere : '', seen ? s.flowRowOn : ''].join(' ')}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className={s.flowSpine} aria-hidden="true">
              <span className={[s.flowLine, seen ? s.flowLineOn : ''].join(' ')} style={{ transitionDelay: `${i * 80 + 60}ms` }} />
              <span className={s.flowNode} />
            </span>
            <div className={s.flowBody}>
              <div className={s.flowLabel}>
                {c(step.label)}
                {here && <span className={s.hereTag}>{t('flow.here')}</span>}
              </div>
              {step.detail && <p className={s.flowDetail}>{c(step.detail)}</p>}
              {step.clause && <span className={s.clause}>{step.clause}</span>}
            </div>
            {step.exit && (
              <div className={[s.flowExit, seen ? s.flowExitOn : ''].join(' ')} style={{ transitionDelay: `${i * 80 + 220}ms` }}>
                <span className={s.exitArrow} aria-hidden="true" />
                <div className={s.exitCard}>
                  <span className={s.exitLabel}>{c(step.exit.label)}</span>
                  <span className={s.clause}>{step.exit.clause}</span>
                </div>
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

/**
 * On a stage screen the reader's own track decides which nodes show, and the node they
 * are standing on is marked. On the About page there is no profile yet, so the two
 * tracks sit behind a switch rather than one of them being quietly picked for everyone.
 */
export function ContestFlow({ hereStage }: { hereStage?: StageId }) {
  const { c } = useI18n()
  const profile = useAppStore((st) => st.profile)
  const [ref, seen] = useInView<HTMLDivElement>()
  const [track, setTrack] = useState<'main' | 'science'>(
    profile?.track === 'science_internship' ? 'science' : 'main',
  )

  const forProfile = profile ?? (FLOW_TRACKS.find((tr) => tr.id === track)!.profile as Profile)
  const steps = CONTEST_FLOW.filter((step) => evaluate(step.appliesTo, forProfile))

  return (
    <div className={s.block} ref={ref}>
      {!profile && (
        <div className={s.switch} role="group">
          {FLOW_TRACKS.map((tr) => (
            <button
              key={tr.id}
              className={[s.switchBtn, tr.id === track ? s.switchOn : ''].join(' ')}
              aria-pressed={tr.id === track}
              onClick={() => setTrack(tr.id)}
            >
              {c(tr.label)}
            </button>
          ))}
        </div>
      )}
      <FlowChart steps={steps} hereStage={hereStage} seen={seen} />
      <div className={s.sources}>
        {[...new Set(steps.flatMap((step) => [...(step.source ? [step.source] : []), ...(step.exit ? [step.exit.source] : [])]))].map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
    </div>
  )
}

/* ── the run-up to departure ── */

/** A chain, because the order is the fact worth showing. */
export function DepartureChain() {
  const { c } = useI18n()
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div className={s.block} ref={ref}>
      <ol className={s.chain}>
        {DEPARTURE_CHAIN.steps.map((step, i) => (
          <li key={i} className={[s.chainItem, seen ? s.chainItemOn : ''].join(' ')} style={{ transitionDelay: `${i * 90}ms` }}>
            <span className={s.chainNum}>{i + 1}</span>
            <span className={s.chainLabel}>{c(step)}</span>
          </li>
        ))}
      </ol>
      <p className={s.note}>{c(DEPARTURE_CHAIN.note)}</p>
      <div className={s.sources}>
        {DEPARTURE_CHAIN.sources.map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
    </div>
  )
}
