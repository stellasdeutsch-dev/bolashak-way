import {
  CONTEST_FLOW, PATH_LANES, PATH_LANES_SOURCE, awardTimeline, departureChain, workbackTable,
  type ExplainTable, type FlowStep,
} from '@/content/explain'
import { CHAPTERS } from '@/content/stages'
import type { Profile, StageId, Track } from '@/content/types'
import { evaluate } from '@/domain/applicability'
import { useI18n } from '@/i18n'
import { SourceLink } from '@/components/ui'
import { useInView } from '@/components/Reveal'
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

/** Who owes how much — only the rows that are true for this programme. */
export function WorkbackTable({ track }: { track: Track }) {
  return <DataTable table={workbackTable(track)} />
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

/** The run after the award: 0 → 90 days under ПП 573 and under Order 422 for scientific internships. */
export function AwardTimeline({ track }: { track: Track }) {
  const { c } = useI18n()
  const [ref, seen] = useInView<HTMLDivElement>()
  const { total, marks, note } = awardTimeline(track)

  return (
    <div className={s.block} ref={ref}>
      <div className={s.timeline}>
        <div className={s.rail}>
          <span className={[s.railFill, seen ? s.railFillOn : ''].join(' ')} />
          {marks.map((m) => (
            <span
              key={m.day}
              className={[s.tick, s[`tick_${m.tone}`], seen ? s.tickOn : ''].join(' ')}
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
              className={[s.legendItem, s[`legend_${m.tone}`]].join(' ')}
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

/** The three rounds of this programme, with the exits drawn in and this stage marked. */
export function ContestFlow({ track, hereStage }: { track: Track; hereStage?: StageId }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const steps = CONTEST_FLOW.filter((step) => evaluate(step.appliesTo, { track } as Profile))

  return (
    <div className={s.block} ref={ref}>
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
export function DepartureChain({ track }: { track: Track }) {
  const { c } = useI18n()
  const [ref, seen] = useInView<HTMLDivElement>()
  const DEPARTURE_CHAIN = departureChain(track)
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
