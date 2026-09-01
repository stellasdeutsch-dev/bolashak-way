/**
 * Builds an .ics file from the deadlines the app has computed, so the dates leave the
 * browser and land in whatever calendar the person actually looks at.
 *
 * Only dates the app can derive from an official term go in. A deadline nobody has an
 * anchor date for is simply absent: inventing one would put a lie in someone's calendar.
 */

export interface IcsEvent {
  /** Stable id, used to build the UID so re-importing updates rather than duplicates. */
  id: string
  /** All-day date, yyyy-mm-dd. */
  date: string
  summary: string
  description?: string
  /** Days before the date to fire a reminder; 0 or less means none. */
  reminderDays?: number
}

/**
 * RFC 5545 §3.3.11: backslash, semicolon and comma separate fields, and a newline is
 * written as a literal \n. The backslash goes first — otherwise it escapes the
 * backslashes this function has just added.
 */
function escape(value: string): string {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/**
 * Line folding (RFC 5545 §3.1): at most 75 octets, continuations start with a space.
 * It has to count OCTETS, not characters, and must not split a multi-byte character —
 * Cyrillic is two bytes per letter, and a cut in the middle arrives as mojibake.
 */
function fold(line: string): string {
  const encoder = new TextEncoder()
  const chunks: string[] = []
  let current = ''
  let bytes = 0
  let limit = 75 // continuations get 74: the leading space costs one

  for (const char of line) {
    const size = encoder.encode(char).length
    if (bytes + size > limit) {
      chunks.push(current)
      current = ''
      bytes = 0
      limit = 74
    }
    current += char
    bytes += size
  }
  chunks.push(current)
  return chunks.join('\r\n ')
}

const compact = (iso: string) => iso.replace(/-/g, '')

/** Shifts an ISO date by whole days, without ever touching a time zone. */
export function shiftIso(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const t = new Date(Date.UTC(y, m - 1, d, 12))
  t.setUTCDate(t.getUTCDate() + days)
  return t.toISOString().slice(0, 10)
}

export function buildIcs(events: IcsEvent[], calendarName: string, now: Date): string {
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bolashak Way//Deadlines//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escape(calendarName)}`,
  ]

  for (const e of events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.id}-${compact(e.date)}@bolashak-way`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(e.date)}`,
      // DTEND is exclusive for all-day events, so a one-day event ends the next day.
      // Without this Google and Apple both draw it as lasting two days.
      `DTEND;VALUE=DATE:${compact(shiftIso(e.date, 1))}`,
      `SUMMARY:${escape(e.summary)}`,
    )
    if (e.description) lines.push(`DESCRIPTION:${escape(e.description)}`)
    lines.push('TRANSP:TRANSPARENT')
    if ((e.reminderDays ?? 0) > 0) {
      lines.push(
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `TRIGGER:-P${e.reminderDays}D`,
        `DESCRIPTION:${escape(e.summary)}`,
        'END:VALARM',
      )
    }
    lines.push('END:VEVENT')
  }

  lines.push('END:VCALENDAR')
  return lines.map(fold).join('\r\n') + '\r\n'
}

export function downloadIcs(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
