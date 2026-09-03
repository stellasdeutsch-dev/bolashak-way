import type { ReactNode } from 'react'
import { useInView } from '@/components/Reveal'
import s from './Meter.module.css'

/**
 * A score drawn on the exam's own scale, with the official thresholds marked on it.
 * Two numbers in a row never answer "am I close?" — a position on a line does.
 */
export function ScoreGauge({
  label,
  max,
  score,
  marks,
  passLabel,
  status,
}: {
  label: string
  max: number
  score: number | null
  /** Official cut-offs to draw on the track, lowest first. */
  marks: { at: number; title: string }[]
  passLabel: ReactNode
  status: 'pass' | 'partial' | 'below' | 'unknown'
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const pct = (v: number) => Math.max(0, Math.min(100, (v / max) * 100))
  const need = marks.length > 0 ? marks[marks.length - 1].at : null

  return (
    <div className={s.gauge} ref={ref}>
      <div className={s.gaugeHead}>
        {/* The axis under the track already carries the ceiling, so the label stays
            the exam name alone — the content's own scale string is Russian only. */}
        <span className={s.gaugeLabel}>{label}</span>
        <span className={[s.verdict, s[`verdict_${status}`]].join(' ')}>{passLabel}</span>
      </div>

      <div className={s.track}>
        {/* The band that clears the top threshold, so "enough" is a region, not a number. */}
        {need !== null && (
          <span
            className={[s.pass, seen ? s.passOn : ''].join(' ')}
            style={{ left: `${pct(need)}%`, right: 0 }}
          />
        )}
        {marks.map((m) => (
          <span key={m.at} className={s.mark} style={{ left: `${pct(m.at)}%` }} title={m.title}>
            <span className={s.markLabel}>{m.at}</span>
          </span>
        ))}
        {score !== null && (
          <span
            className={[s.you, seen ? s.youOn : '', s[`you_${status}`]].join(' ')}
            style={{ left: `${pct(score)}%` }}
          >
            <span className={s.youValue}>{score}</span>
          </span>
        )}
      </div>

      <div className={s.axis}>
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

/**
 * "You have X of the Y required" as a bar. Overshoot is clamped — the point is whether
 * the requirement is met, not how far past it you are.
 */
export function Meter({
  label,
  haveLabel,
  needLabel,
  have,
  need,
}: {
  label: string
  haveLabel: string
  needLabel: string
  have: number
  need: number
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const ratio = need <= 0 ? 1 : Math.min(1, have / need)
  const ok = have >= need

  return (
    <div className={s.meter} ref={ref}>
      <div className={s.meterHead}>
        <span className={s.meterLabel}>{label}</span>
        <span className={[s.meterValue, ok ? s.meterOk : s.meterShort].join(' ')}>
          {haveLabel} / {needLabel}
        </span>
      </div>
      <div className={s.meterTrack}>
        <span
          className={[s.meterFill, ok ? s.meterFillOk : ''].join(' ')}
          style={{ width: seen ? `${ratio * 100}%` : '0%' }}
        />
      </div>
    </div>
  )
}

/** A thin segmented bar: one notch per stage, filled ones first. */
export function StepBar({ done, total, dark }: { done: number; total: number; dark?: boolean }) {
  return (
    <span className={[s.steps, dark ? s.stepsDark : ''].join(' ')} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={[s.step, i < done ? s.stepDone : ''].join(' ')} />
      ))}
    </span>
  )
}
