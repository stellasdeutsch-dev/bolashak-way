import { AWARD_TIMELINE, PATH_LANES, PATH_LANES_SOURCE, WORKBACK_TABLE, type ExplainTable } from '@/content/explain'
import { CHAPTERS } from '@/content/stages'
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
