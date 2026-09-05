import { useInView } from '@/components/Reveal'
import { StepBar } from '@/components/Meter'
import s from './admin.module.css'

export function StatTile({ value, label }: { value: number | string; label: string }) {
  return (
    <div className={s.tile}>
      <span className={s.tileValue}>{value}</span>
      <span className={s.tileLabel}>{label}</span>
    </div>
  )
}

/** Horizontal bars, longest first, in the Meter style. */
export function BarList({ items, empty }: { items: { label: string; value: number }[]; empty: string }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const max = Math.max(0, ...items.map((i) => i.value))
  if (items.length === 0 || max === 0) return <p className={s.empty}>{empty}</p>
  return (
    <div className={s.bars} ref={ref}>
      {[...items]
        .sort((a, b) => b.value - a.value)
        .map((i) => (
          <div key={i.label} className={s.bar}>
            <span className={s.barLabel}>{i.label}</span>
            <span className={s.barTrack}>
              <span className={s.barFill} style={{ width: seen ? `${(i.value / max) * 100}%` : '0%' }} />
            </span>
            <span className={s.barValue}>{i.value}</span>
          </div>
        ))}
    </div>
  )
}

/** One row per chapter with a notch per stage-bucket and the count of people there. */
export function Funnel({ rows, empty }: { rows: { label: string; value: number; total: number }[]; empty: string }) {
  const sum = rows.reduce((n, r) => n + r.value, 0)
  if (sum === 0) return <p className={s.empty}>{empty}</p>
  return (
    <div className={s.funnel}>
      {rows.map((r) => (
        <div key={r.label} className={s.funnelRow}>
          <span className={s.funnelLabel}>{r.label}</span>
          <StepBar done={r.value} total={Math.max(r.total, r.value, 1)} />
          <span className={s.funnelValue}>{r.value}</span>
        </div>
      ))}
    </div>
  )
}

/** Small inline SVG line for a short daily/weekly series. */
export function Sparkline({ points, empty, labelOf }: { points: { x: string; y: number }[]; empty: string; labelOf: (x: string) => string }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  if (points.length === 0 || points.every((p) => p.y === 0)) return <p className={s.empty}>{empty}</p>
  const w = 320
  const h = 80
  const max = Math.max(1, ...points.map((p) => p.y))
  const step = points.length > 1 ? w / (points.length - 1) : 0
  const coords = points.map((p, i) => [i * step, h - (p.y / max) * (h - 12) - 6] as const)
  const line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`
  const last = points[points.length - 1]
  const first = points[0]
  return (
    <div className={s.spark} ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={[s.sparkSvg, seen ? s.sparkOn : ''].join(' ')} aria-hidden="true">
        <path d={area} className={s.sparkArea} />
        <path d={line} className={s.sparkLine} />
      </svg>
      <div className={s.sparkAxis}>
        <span>{labelOf(first.x)}</span>
        <span>{labelOf(last.x)}</span>
      </div>
      <ul className="visually-hidden">
        {points.map((p) => (
          <li key={p.x}>
            {labelOf(p.x)}: {p.y}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Ten progress deciles as vertical bars. */
export function Buckets({ buckets, empty }: { buckets: Record<string, number>; empty: string }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const values = Array.from({ length: 10 }, (_, i) => buckets[String(i)] ?? 0)
  const max = Math.max(...values)
  if (max === 0) return <p className={s.empty}>{empty}</p>
  return (
    <div className={s.buckets} ref={ref}>
      {values.map((v, i) => (
        <div key={i} className={s.bucket} title={`${i * 10}–${i * 10 + 10}%: ${v}`}>
          <span className={s.bucketValue}>{v || ''}</span>
          <span className={s.bucketBar} style={{ height: seen ? `${(v / max) * 100}%` : '0%' }} />
          <span className={s.bucketLabel}>{i * 10}</span>
        </div>
      ))}
    </div>
  )
}
