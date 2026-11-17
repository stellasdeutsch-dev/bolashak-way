/**
 * The reader's own calendar date as yyyy-mm-dd. Deadlines count whole days in the
 * reader's time zone: in Almaty (UTC+5) the UTC date is still "yesterday" until 05:00.
 */
export function localIso(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** A real calendar date in yyyy-mm-dd form – 2026-02-31 is rejected, not rolled over. */
export function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [y, m, d] = value.split('-').map(Number)
  const probe = new Date(Date.UTC(y, m - 1, d))
  return probe.getUTCFullYear() === y && probe.getUTCMonth() === m - 1 && probe.getUTCDate() === d
}

/**
 * A date someone actually meant. While a year is being typed the browser already reports
 * it – 0002, 0020, 0202 – each a valid ISO date; saving those put October 1902 or year 2
 * into the plan. Anything outside 1900–2100 is a date still being typed.
 */
export function isPlausibleDate(value: unknown): value is string {
  if (!isIsoDate(value)) return false
  const year = Number(value.slice(0, 4))
  return year >= 1900 && year <= 2100
}
