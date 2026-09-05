import { describe, expect, it } from 'vitest'
import type { Profile } from '@/content/types'
import { CONTENT_META } from '@/content/meta'
import { computeProgress } from '@/domain/progress'
import { isEmptySnapshot, mergeSnapshots, rowFromState, sameUserFields, snapshotFromRow, type Side, type UserFields } from '@/cloud/sync'

const medic: Profile = {
  track: 'master',
  category: 'master_medical',
  workerGroup: null,
  invitation: 'none',
  foreignCert: null,
  kazakhCert: true,
  experience: { years: 2, continuousMonths: 18 },
}

const empty: UserFields = { profile: null, onboardedAt: null, checked: [], stagesDone: [], documentsDone: [], notes: {}, dates: {} }
const some: UserFields = { ...empty, profile: medic, onboardedAt: '2026-09-01T00:00:00.000Z', checked: ['eligibility:citizen'], notes: { eligibility: 'позвонить' } }
const other: UserFields = { ...some, checked: ['eligibility:citizen', 'eligibility:education'] }

const side = (snapshot: UserFields | null, updatedAt: string | null): Side => ({ snapshot, updatedAt })

describe('mergeSnapshots', () => {
  const cases: [string, Side, Side, boolean, ReturnType<typeof mergeSnapshots>][] = [
    ['both empty', side(empty, null), side(null, null), true, 'none'],
    ['local empty, remote has data', side(empty, null), side(some, '2026-09-01T10:00:00Z'), true, 'pull'],
    ['remote empty, local has data', side(some, '2026-09-01T10:00:00Z'), side(null, null), true, 'push'],
    ['identical content', side(some, '2026-09-02T00:00:00Z'), side({ ...some }, '2026-09-01T00:00:00Z'), true, 'none'],
    ['first link with different content asks', side(some, '2026-09-02T00:00:00Z'), side(other, '2026-09-01T00:00:00Z'), true, 'ask'],
    ['unknown local age pulls', side(some, null), side(other, '2026-09-01T00:00:00Z'), false, 'pull'],
    ['local newer pushes', side(some, '2026-09-03T00:00:00Z'), side(other, '2026-09-01T00:00:00Z'), false, 'push'],
    ['remote newer pulls', side(some, '2026-09-01T00:00:00Z'), side(other, '2026-09-03T00:00:00Z'), false, 'pull'],
    ['a tie goes to the cloud', side(some, '2026-09-01T00:00:00Z'), side(other, '2026-09-01T00:00:00Z'), false, 'pull'],
    ['remote with unknown age loses to a dated local', side(some, '2026-09-01T00:00:00Z'), side(other, null), false, 'push'],
  ]
  for (const [name, local, remote, firstLink, expected] of cases) {
    it(name, () => {
      expect(mergeSnapshots(local, remote, { firstLink })).toBe(expected)
    })
  }

  it('never asks when one side is empty, even on first link', () => {
    expect(mergeSnapshots(side(empty, null), side(some, '2026-09-01T00:00:00Z'), { firstLink: true })).toBe('pull')
    expect(mergeSnapshots(side(some, '2026-09-01T00:00:00Z'), side(empty, null), { firstLink: true })).toBe('push')
  })
})

describe('snapshot helpers', () => {
  it('treats blank notes and no answers as empty', () => {
    expect(isEmptySnapshot(empty)).toBe(true)
    expect(isEmptySnapshot({ ...empty, notes: { eligibility: '' } })).toBe(true)
    expect(isEmptySnapshot({ ...empty, dates: { award_date: '2026-09-01' } })).toBe(false)
    expect(isEmptySnapshot(null)).toBe(true)
  })

  it('compares content regardless of tick order or envelope', () => {
    const a = { ...some, checked: ['a:1', 'b:2'] }
    const b = { ...some, checked: ['b:2', 'a:1'] }
    expect(sameUserFields(a, b)).toBe(true)
    expect(sameUserFields(a, { ...a, notes: { eligibility: 'другое' } })).toBe(false)
  })
})

describe('row mapping', () => {
  it('round-trips the seven user fields through the server row', () => {
    const row = rowFromState('user-1', some, '2026-09-04T12:00:00.000Z')
    const back = snapshotFromRow(row)
    expect(back).not.toBeNull()
    expect(back!.profile).toEqual(medic)
    expect(back!.checked).toEqual(some.checked)
    expect(back!.notes).toEqual(some.notes)
    expect(back!.onboardedAt).toBe(some.onboardedAt)
    expect(row.schema_version).toBe(CONTENT_META.schemaVersion)
    expect(row.competition_year).toBe(CONTENT_META.competitionYear)
    expect(row.client_updated_at).toBe('2026-09-04T12:00:00.000Z')
  })

  it('denormalises the columns the admin table sorts by from computeProgress', () => {
    const row = rowFromState('user-1', some, '2026-09-04T12:00:00.000Z')
    const p = computeProgress({ profile: medic, checked: some.checked, stagesDone: [] })
    expect(row.track).toBe('master')
    expect(row.category).toBe('master_medical')
    expect(row.current_stage).toBe(p.current?.stage.id ?? null)
    expect(row.ratio).toBeCloseTo(p.ratio, 4)
    expect(row.done_stages).toBe(p.doneStages)
    expect(row.total_stages).toBe(p.totalStages)
  })

  it('writes an empty row for a device that has not onboarded', () => {
    const row = rowFromState('user-2', empty, '2026-09-04T12:00:00.000Z')
    expect(row.category).toBeNull()
    expect(row.current_stage).toBeNull()
    expect(row.ratio).toBe(0)
    expect(row.total_stages).toBe(0)
  })

  it('rejects a stored snapshot that fails the import validator', () => {
    expect(snapshotFromRow({ snapshot: { app: 'something-else' } })).toBeNull()
    expect(snapshotFromRow({ snapshot: null })).toBeNull()
    expect(snapshotFromRow(null)).toBeNull()
  })

  it('drops unknown ids from a stored snapshot instead of failing', () => {
    const row = rowFromState('user-1', { ...some, checked: ['eligibility:citizen', 'nope:nope'] }, '2026-09-04T12:00:00.000Z')
    expect(snapshotFromRow(row)!.checked).toEqual(['eligibility:citizen'])
  })
})
