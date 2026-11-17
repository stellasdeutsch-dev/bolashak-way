import { describe, expect, it } from 'vitest'
import { CATEGORY_IDS, DATE_KEYS, LOCALE_IDS, PLATFORM_SLUG_IDS, TRACKS, WORKER_GROUP_IDS } from '@/content/types'
import { CATEGORIES, CATEGORIES_BY_TRACK, WORKER_GROUPS } from '@/content/categories'
import { PLATFORMS } from '@/content/platforms'
import { DEADLINE_RULES } from '@/content/deadlines'
import { LOCALES } from '@/i18n'
import { sanitizeProgress } from '@/domain/exportImport'

/**
 * The id lists are written once (content/types.ts) and everything else is derived from
 * them. These checks keep the data that cannot be derived – the categories, worker groups
 * and platforms themselves – in step with those lists.
 */
describe('one list per kind of id', () => {
  it('lists every category once, in the order of the data', () => {
    expect(Object.keys(CATEGORIES)).toEqual([...CATEGORY_IDS])
    expect(Object.values(CATEGORIES).every((c) => c.id in CATEGORIES)).toBe(true)
  })

  it('gives every programme at least one category', () => {
    for (const track of TRACKS) expect(CATEGORIES_BY_TRACK[track].length, track).toBeGreaterThan(0)
  })

  it('describes every worker group and every platform', () => {
    expect(WORKER_GROUPS.map((g) => g.id)).toEqual([...WORKER_GROUP_IDS])
    expect(PLATFORMS.map((p) => p.slug)).toEqual([...PLATFORM_SLUG_IDS])
    expect([...new Set(PLATFORMS.map((p) => p.track))].sort()).toEqual([...TRACKS].sort())
    expect(LOCALES.map((l) => l.id)).toEqual([...LOCALE_IDS])
  })

  it('counts deadlines only from dates the reader can enter', () => {
    for (const r of DEADLINE_RULES) expect(DATE_KEYS, r.id).toContain(r.anchor)
  })

  it('keeps a saved plan of every programme and category on reload', () => {
    for (const id of CATEGORY_IDS) {
      const track = CATEGORIES[id].track
      const workerGroup = track === 'internship' ? WORKER_GROUP_IDS[0] : null
      const dates = Object.fromEntries(DATE_KEYS.map((k) => [k, '2026-09-01']))
      const clean = sanitizeProgress({ profile: { track, category: id, workerGroup }, dates })
      expect(clean.profile, id).toEqual({ track, category: id, workerGroup })
      expect(Object.keys(clean.dates), id).toEqual([...DATE_KEYS])
    }
  })
})
