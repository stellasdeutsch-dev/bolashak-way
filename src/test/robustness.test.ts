import { describe, expect, it } from 'vitest'
import { isIsoDate, localIso } from '@/domain/dates'
import { sanitizeProgress } from '@/domain/exportImport'

describe('calendar dates', () => {
  it('rejects days that do not exist instead of rolling them over', () => {
    expect(isIsoDate('2026-02-28')).toBe(true)
    expect(isIsoDate('2028-02-29')).toBe(true)
    expect(isIsoDate('2026-02-29')).toBe(false)
    expect(isIsoDate('2026-02-31')).toBe(false)
    expect(isIsoDate('2026-04-31')).toBe(false)
    expect(isIsoDate('2026-13-01')).toBe(false)
    expect(isIsoDate('26-01-01')).toBe(false)
  })

  it('takes "today" from the reader\'s calendar, not from UTC', () => {
    // 02:00 local time on 1 March: in UTC+5 the UTC date is still 28 February.
    const early = new Date(2026, 2, 1, 2, 0)
    expect(localIso(early)).toBe('2026-03-01')
  })
})

describe('stored progress from an older content year', () => {
  it('drops a profile whose category no longer exists rather than crashing the plan', () => {
    const clean = sanitizeProgress({
      profile: { track: 'master', category: 'master_retired', workerGroup: null, invitation: 'none', foreignCert: null, kazakhCert: true, experience: null },
      onboardedAt: '2025-09-01T00:00:00.000Z',
      checked: ['eligibility:citizen', 'gone:item'],
      dates: { award_date: '2026-02-31', study_start: '2026-09-01', bogus: '2026-01-01' },
    })
    expect(clean.profile).toBeNull()
    expect(clean.onboardedAt).toBeNull()
    expect(clean.checked).not.toContain('gone:item')
    expect(clean.dates).toEqual({ study_start: '2026-09-01' })
  })

  it('survives garbage in storage', () => {
    expect(sanitizeProgress(null).profile).toBeNull()
    expect(sanitizeProgress('nonsense').checked).toEqual([])
  })
})
