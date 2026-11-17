import { beforeEach, describe, expect, it } from 'vitest'
import { buildSnapshot, parseSnapshot } from '@/domain/exportImport'
import { useAppStore } from '@/store/useAppStore'
import type { Profile } from '@/content/types'

/** Progress that must never be lost: between programmes, devices, tabs and calendars. */

const master: Profile = { track: 'master', category: 'master_self', workerGroup: null, invitation: 'none', foreignCert: null, kazakhCert: false, experience: null }
const intern: Profile = { track: 'internship', category: 'internship', workerGroup: 'teacher', invitation: 'none', foreignCert: null, kazakhCert: false, experience: null }

const progress = (profile: Profile, checked: string[]) => ({
  profile,
  onboardedAt: '2026-09-01T00:00:00.000Z',
  checked,
  stagesDone: [],
  documentsDone: [],
  notes: {},
  dates: {},
})

beforeEach(() => {
  localStorage.clear()
  useAppStore.getState().reset()
  useAppStore.setState({ locale: 'ru', restoreFailed: false })
})

describe('the backup file', () => {
  it('carries the progress of the other programmes too', () => {
    const snap = buildSnapshot(
      { ...progress(intern, ['eligibility:citizen']), archive: { master: { ...progress(master, ['specialty:open_list']), notes: { specialty: 'заметка' } } } },
      '2026-11-17T10:00:00.000Z',
    )
    const parsed = parseSnapshot(JSON.stringify(snap))!
    expect(parsed.archive?.master?.checked).toEqual(['specialty:open_list'])
    expect(parsed.archive?.master?.notes).toEqual({ specialty: 'заметка' })

    // a new device: import, then switch back to the master's
    useAppStore.getState().hydrateFrom(parsed)
    expect(useAppStore.getState().checked).toEqual(['eligibility:citizen'])
    useAppStore.getState().setProfile(master)
    expect(useAppStore.getState().checked).toEqual(['specialty:open_list'])
    expect(useAppStore.getState().notes).toEqual({ specialty: 'заметка' })
  })

  it('drops archived progress that does not belong to its programme', () => {
    const snap = {
      ...buildSnapshot(progress(intern, []), '2026-11-17T10:00:00.000Z'),
      archive: { master: progress(intern, ['x']), internship: progress(intern, ['eligibility:citizen']), nope: progress(master, []) },
    }
    const parsed = parseSnapshot(JSON.stringify(snap))!
    // master holds an intern's profile, internship is the active programme, nope is no programme
    expect(parsed.archive).toEqual({})
  })

  it('still reads a file written before the archive was saved', () => {
    useAppStore.setState({ archive: { master: progress(master, ['specialty:open_list']) } })
    const old = buildSnapshot(progress(intern, ['eligibility:citizen']), '2026-11-17T10:00:00.000Z') as unknown as Record<string, unknown>
    delete old.archive
    const parsed = parseSnapshot(JSON.stringify(old))!
    expect(parsed.profile?.track).toBe('internship')
    useAppStore.getState().hydrateFrom(parsed)
    // what this device already kept for other programmes stays
    expect(useAppStore.getState().archive.master?.checked).toEqual(['specialty:open_list'])
  })
})

