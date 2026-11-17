import { beforeEach, describe, expect, it } from 'vitest'
import { act } from '@testing-library/react'
import { buildSnapshot, parseSnapshot } from '@/domain/exportImport'
import { buildIcs } from '@/domain/ics'
import { parseCentreDates } from '@/domain/centreDates'
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

describe('two tabs', () => {
  it('picks up what the other tab saved before writing its own change', async () => {
    useAppStore.setState({ profile: master, onboardedAt: '2026-09-01T00:00:00.000Z', checked: [] })
    // the other tab ticks a box and saves
    const other = JSON.parse(localStorage.getItem('bolashak-way')!)
    other.state.checked = ['eligibility:citizen']
    localStorage.setItem('bolashak-way', JSON.stringify(other))
    await act(async () => {
      window.dispatchEvent(new StorageEvent('storage', { key: 'bolashak-way', storageArea: localStorage }))
    })
    expect(useAppStore.getState().checked).toEqual(['eligibility:citizen'])
    // this tab now acts: both ticks are saved
    useAppStore.getState().toggleCheck('specialty', 'open_list')
    expect(JSON.parse(localStorage.getItem('bolashak-way')!).state.checked).toEqual(['eligibility:citizen', 'specialty:open_list'])
  })
})

describe('switching programme', () => {
  it('brings back the target programme from the archive when no plan is open', () => {
    useAppStore.setState({ profile: null, checked: ['leftover:item'], archive: { internship: progress(intern, ['eligibility:citizen']) } })
    useAppStore.getState().setProfile(intern)
    expect(useAppStore.getState().checked).toEqual(['eligibility:citizen'])
    expect(useAppStore.getState().archive.internship).toBeUndefined()
  })

  it('does not count ticks of an unknown programme for a new one', () => {
    useAppStore.setState({ profile: null, checked: ['eligibility:citizen'], stagesDone: ['eligibility'], archive: {} })
    useAppStore.getState().setProfile(master)
    expect(useAppStore.getState().checked).toEqual([])
    expect(useAppStore.getState().stagesDone).toEqual([])
  })
})

describe('a damaged save', () => {
  it('is reported and kept, not silently overwritten', async () => {
    const broken = '{"state":{"profile":{"track":"master","category":"master_self"},"checked":["eligibility:cit'
    localStorage.setItem('bolashak-way', broken)
    await useAppStore.persist.rehydrate()
    expect(useAppStore.getState().restoreFailed).toBe(true)
    useAppStore.getState().setLocale('en')
    expect(localStorage.getItem('bolashak-way.unreadable')).toBe(broken)
  })
})

describe('the .ics file', () => {
  it('keeps one UID per event when its date changes, so a re-import updates it', () => {
    const now = new Date('2026-11-17T10:00:00Z')
    const uid = (text: string) => text.split('\r\n').find((l) => l.startsWith('UID:'))
    const a = buildIcs([{ id: 'contract_90', date: '2026-12-01', summary: 'S' }], 'Cal', now)
    const b = buildIcs([{ id: 'contract_90', date: '2026-12-15', summary: 'S' }], 'Cal', now)
    expect(uid(a)).toBe('UID:contract_90@bolashak-way')
    expect(uid(b)).toBe(uid(a))
  })
})

describe('the Center’s dates', () => {
  it('keeps the upcoming dates when the feed is longer than the cap', () => {
    const feed = Array.from({ length: 600 }, (_, i) => {
      const d = new Date(Date.UTC(2025, 0, 1 + i))
      return { date: d.toISOString().slice(0, 10), text: `Событие ${i}`, title: 'Новость', url: `https://bolashak.gov.kz/ru/news/${i}` }
    })
    const out = parseCentreDates(feed)!
    expect(out).toHaveLength(500)
    expect(out.at(-1)!.date).toBe(feed.at(-1)!.date)
  })
})

