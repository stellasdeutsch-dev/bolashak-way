/** Pure date arithmetic for the month grid. Everything runs at noon UTC so that no
 *  time zone or DST change can push a day across a boundary. */

const DAY = 86_400_000

export const isoOf = (ms: number) => new Date(ms).toISOString().slice(0, 10)

export const atNoon = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d, 12)
}

export interface MonthCell {
  iso: string
  day: number
  /** False for the leading and trailing days borrowed from the neighbouring months. */
  inMonth: boolean
}

/**
 * Six weeks from a Monday — 42 cells, always. A grid that changes height between months
 * makes the whole page jump every time the reader presses an arrow.
 */
export function monthMatrix(year: number, month: number): MonthCell[] {
  const first = Date.UTC(year, month, 1, 12)
  const weekday = (new Date(first).getUTCDay() + 6) % 7 // Sun=0 → 6, Mon=1 → 0
  const start = first - weekday * DAY
  return Array.from({ length: 42 }, (_, i) => {
    const ms = start + i * DAY
    const d = new Date(ms)
    return { iso: isoOf(ms), day: d.getUTCDate(), inMonth: d.getUTCMonth() === month }
  })
}
