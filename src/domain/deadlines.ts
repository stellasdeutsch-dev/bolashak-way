import { DEADLINE_RULES } from '@/content/deadlines'
import type { DateKey, DeadlineRule, Profile } from '@/content/types'
import { evaluate } from './applicability'

export type DeadlineStatus = 'upcoming' | 'soon' | 'overdue'

export interface ComputedDeadline {
  rule: DeadlineRule
  /** ISO yyyy-mm-dd the obligation falls due. */
  due: string
  daysLeft: number
  status: DeadlineStatus
  /** For recurring rules: which occurrence this is, 1-based. */
  occurrence?: number
}

const DAY = 86_400_000
/** Anchors dates at noon UTC so that DST and time-zone offsets can never shift a day. */
const atNoon = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d, 12)
}
const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10)

function addMonths(ms: number, months: number): number {
  const d = new Date(ms)
  const targetMonth = d.getUTCMonth() + months
  const result = new Date(Date.UTC(d.getUTCFullYear(), targetMonth, d.getUTCDate(), 12))
  // Clamp overflow (31 Jan + 1 month → 28/29 Feb rather than 2/3 March).
  if (result.getUTCMonth() !== ((targetMonth % 12) + 12) % 12) result.setUTCDate(0)
  return result.getTime()
}

const dueFor = (rule: DeadlineRule, anchorMs: number, step = 1): number =>
  rule.days != null ? anchorMs + rule.days * DAY * step : addMonths(anchorMs, (rule.months ?? 0) * step)

/**
 * Turns the user's anchor dates into concrete obligations. `now` is always passed in
 * so the result is deterministic and testable.
 */
export function computeDeadlines(profile: Profile, dates: Partial<Record<DateKey, string>>, now: Date): ComputedDeadline[] {
  const today = atNoon(now.toISOString().slice(0, 10))
  const out: ComputedDeadline[] = []

  for (const rule of DEADLINE_RULES) {
    const anchorIso = dates[rule.anchor]
    if (!anchorIso) continue
    if (!evaluate(rule.appliesTo, profile)) continue
    const anchor = atNoon(anchorIso)
    if (Number.isNaN(anchor)) continue

    if (rule.recurring) {
      // Show the next occurrence that has not passed yet (the first one if all are ahead).
      let step = 1
      let due = dueFor(rule, anchor, step)
      while (due < today && step < 200) due = dueFor(rule, anchor, ++step)
      out.push({ rule, due: toIso(due), daysLeft: Math.round((due - today) / DAY), status: statusOf(due, today), occurrence: step })
    } else {
      const due = dueFor(rule, anchor)
      out.push({ rule, due: toIso(due), daysLeft: Math.round((due - today) / DAY), status: statusOf(due, today) })
    }
  }

  return out.sort((a, b) => a.due.localeCompare(b.due))
}

function statusOf(due: number, today: number): DeadlineStatus {
  const days = Math.round((due - today) / DAY)
  if (days < 0) return 'overdue'
  return days <= 14 ? 'soon' : 'upcoming'
}

/** The single most pressing obligation, for the roadmap header. */
export function nearestDeadline(list: ComputedDeadline[]): ComputedDeadline | null {
  if (list.length === 0) return null
  const overdue = list.filter((d) => d.status === 'overdue')
  if (overdue.length > 0) return overdue[overdue.length - 1]
  return list[0]
}
