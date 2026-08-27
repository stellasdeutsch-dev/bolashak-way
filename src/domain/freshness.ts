/** Warns when the verified-on date has aged out or the competition year has rolled over. */
export interface Staleness {
  monthsSinceVerified: number
  staleByAge: boolean
  staleByYear: boolean
  stale: boolean
}

const STALE_AFTER_MONTHS = 6

export function staleness(meta: { lastVerified: string; competitionYear: number }, now: Date): Staleness {
  const verified = new Date(`${meta.lastVerified}T12:00:00Z`)
  const months = Number.isNaN(verified.getTime())
    ? 0
    : Math.max(
        0,
        (now.getUTCFullYear() - verified.getUTCFullYear()) * 12 +
          (now.getUTCMonth() - verified.getUTCMonth()) -
          (now.getUTCDate() < verified.getUTCDate() ? 1 : 0),
      )
  const staleByAge = months >= STALE_AFTER_MONTHS
  const staleByYear = meta.competitionYear < now.getUTCFullYear()
  return { monthsSinceVerified: months, staleByAge, staleByYear, stale: staleByAge || staleByYear }
}
