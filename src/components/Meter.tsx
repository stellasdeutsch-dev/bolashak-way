import s from './Meter.module.css'

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
