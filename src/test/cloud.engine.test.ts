import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Profile } from '@/content/types'
import { CONTENT_META } from '@/content/meta'
import { useAppStore } from '@/store/useAppStore'
import { useSyncStore } from '@/cloud/syncStore'
import { createAuthStore, type AuthClient } from '@/cloud/useAuth'
import { pushProgress, resolveChoice, startSync, type ProgressRow } from '@/cloud/sync'

const medic: Profile = { track: 'master', category: 'master_medical', workerGroup: null, invitation: 'none', foreignCert: null, kazakhCert: true, experience: { years: 2, continuousMonths: 18 } }

/** An in-memory `progress` table that answers the exact query chains sync.ts issues. */
function fakeTable() {
  const rows = new Map<string, ProgressRow>()
  const writes: string[] = []
  const client = {
    from: (table: string) => {
      if (table !== 'progress') throw new Error(`unexpected table ${table}`)
      return {
        select: () => ({
          eq: (_c: string, uid: string) => ({
            maybeSingle: async () => ({ data: rows.get(uid) ?? null, error: null }),
          }),
        }),
        insert: async (row: ProgressRow) => {
          if (rows.has(row.user_id)) return { error: { code: '23505', message: 'duplicate' } }
          rows.set(row.user_id, { ...row, updated_at: row.client_updated_at })
          writes.push('insert')
          return { error: null }
        },
        update: (row: ProgressRow) => ({
          eq: (_c: string, uid: string) => ({
            eq: (_c2: string, token: string) => ({
              select: async () => {
                const cur = rows.get(uid)
                if (!cur || cur.client_updated_at !== token) return { data: [], error: null }
                rows.set(uid, { ...row, updated_at: row.client_updated_at })
                writes.push('update')
                return { data: [{ client_updated_at: row.client_updated_at }], error: null }
              },
            }),
          }),
        }),
      }
    },
  }
  return { rows, writes, client }
}

function fakeAuth() {
  return {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe() {} } } })),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
    from: vi.fn(() => ({ select: () => ({ eq: () => ({ single: async () => ({ data: { role: 'user' }, error: null }) }) }) })),
    rpc: vi.fn(),
  } as unknown as AuthClient
}

/** Let a chain of awaits settle: the engine hops through several async steps per event. */
const flush = async () => {
  for (let i = 0; i < 25; i++) await Promise.resolve()
  await vi.advanceTimersByTimeAsync(0)
  for (let i = 0; i < 25; i++) await Promise.resolve()
}
const remoteRow = (uid: string, at: string, extra: Partial<ProgressRow> = {}): ProgressRow => ({
  user_id: uid,
  snapshot: { app: 'bolashak-way', schemaVersion: CONTENT_META.schemaVersion, exportedAt: at, competitionYear: CONTENT_META.competitionYear, profile: medic, onboardedAt: at, checked: ['eligibility:citizen', 'eligibility:education'], stagesDone: [], documentsDone: [], notes: { eligibility: 'из облака' }, dates: {} },
  schema_version: CONTENT_META.schemaVersion,
  competition_year: CONTENT_META.competitionYear,
  track: 'master',
  category: 'master_medical',
  current_stage: 'eligibility',
  ratio: 0.1,
  done_stages: 0,
  total_stages: 17,
  client_updated_at: at,
  updated_at: at,
  ...extra,
})

let stop: (() => void) | null = null

beforeEach(() => {
  vi.useFakeTimers()
  // The engine stamps changes with the real clock, so the fixtures below only mean what
  // they say against a frozen one — a hard-coded "newer" remote date stops being newer
  // the day the calendar reaches it.
  vi.setSystemTime(new Date('2026-09-04T12:00:00.000Z'))
  useAppStore.getState().reset()
  useSyncStore.setState({ status: 'idle', dirty: false, lastLocalChangeAt: null, lastSeenServerAt: null, linkedUserId: null, backup: null, backupAt: null, lastSavedAt: null, lastError: null, pendingChoice: null })
})
afterEach(() => {
  stop?.()
  stop = null
  vi.useRealTimers()
})

describe('sync engine', () => {
  it('pulls the cloud copy onto an empty device at sign-in', async () => {
    const table = fakeTable()
    table.rows.set('u1', remoteRow('u1', '2026-09-01T10:00:00.000Z'))
    const auth = createAuthStore(fakeAuth())
    stop = startSync(table.client as unknown as Parameters<typeof startSync>[0], auth)
    auth.setState({ status: 'signed-in', user: { id: 'u1', email: 'a@b.kz' }, role: 'user' })
    await flush()
    await flush()
    expect(useAppStore.getState().profile).toEqual(medic)
    expect(useAppStore.getState().checked).toContain('eligibility:education')
    expect(useSyncStore.getState().lastSeenServerAt).toBe('2026-09-01T10:00:00.000Z')
    expect(useSyncStore.getState().linkedUserId).toBe('u1')
    expect(useSyncStore.getState().dirty).toBe(false)
  })

  it('uploads the device copy when the cloud is empty', async () => {
    const table = fakeTable()
    const auth = createAuthStore(fakeAuth())
    useAppStore.getState().setProfile(medic)
    useAppStore.getState().toggleCheck('eligibility', 'citizen')
    stop = startSync(table.client as unknown as Parameters<typeof startSync>[0], auth)
    auth.setState({ status: 'signed-in', user: { id: 'u1', email: 'a@b.kz' }, role: 'user' })
    await flush()
    await flush()
    expect(table.writes).toEqual(['insert'])
    const row = table.rows.get('u1')!
    expect(row.category).toBe('master_medical')
    expect((row.snapshot as { checked: string[] }).checked).toEqual(['eligibility:citizen'])
    expect(useSyncStore.getState().status).toBe('saved')
  })

  it('asks on first link when both copies differ, and honours either answer', async () => {
    const table = fakeTable()
    table.rows.set('u1', remoteRow('u1', '2026-09-01T10:00:00.000Z'))
    const auth = createAuthStore(fakeAuth())
    useAppStore.getState().setProfile(medic)
    useAppStore.getState().setNote('eligibility', 'с устройства')
    useSyncStore.setState({ lastLocalChangeAt: '2026-09-03T00:00:00.000Z' })
    stop = startSync(table.client as unknown as Parameters<typeof startSync>[0], auth)
    auth.setState({ status: 'signed-in', user: { id: 'u1', email: 'a@b.kz' }, role: 'user' })
    await flush()
    await flush()
    expect(useSyncStore.getState().status).toBe('conflict')
    expect(useSyncStore.getState().pendingChoice).not.toBeNull()
    expect(table.writes).toEqual([]) // nothing moved without an answer
    expect(useAppStore.getState().notes.eligibility).toBe('с устройства')

    await resolveChoice('cloud')
    expect(useAppStore.getState().notes.eligibility).toBe('из облака')
    expect(useSyncStore.getState().backup?.notes.eligibility).toBe('с устройства')
    expect(useSyncStore.getState().linkedUserId).toBe('u1')
  })

  it('uploads the device copy when "device" is chosen', async () => {
    const table = fakeTable()
    table.rows.set('u1', remoteRow('u1', '2026-09-01T10:00:00.000Z'))
    const auth = createAuthStore(fakeAuth())
    useAppStore.getState().setProfile(medic)
    useAppStore.getState().setNote('eligibility', 'с устройства')
    stop = startSync(table.client as unknown as Parameters<typeof startSync>[0], auth)
    auth.setState({ status: 'signed-in', user: { id: 'u1', email: 'a@b.kz' }, role: 'user' })
    await flush()
    await flush()
    await resolveChoice('device')
    expect(table.writes).toEqual(['update'])
    expect((table.rows.get('u1')!.snapshot as { notes: Record<string, string> }).notes.eligibility).toBe('с устройства')
  })

  it('pushes a change after the debounce and re-reads when another device wrote first', async () => {
    const table = fakeTable()
    table.rows.set('u1', remoteRow('u1', '2026-09-01T10:00:00.000Z'))
    const auth = createAuthStore(fakeAuth())
    stop = startSync(table.client as unknown as Parameters<typeof startSync>[0], auth)
    auth.setState({ status: 'signed-in', user: { id: 'u1', email: 'a@b.kz' }, role: 'user' })
    await flush()
    await flush()

    useAppStore.getState().toggleCheck('eligibility', 'debts')
    expect(useSyncStore.getState().dirty).toBe(true)
    await vi.advanceTimersByTimeAsync(1600)
    expect(table.writes).toEqual(['update'])
    expect(useSyncStore.getState().dirty).toBe(false)
    expect((table.rows.get('u1')!.snapshot as { checked: string[] }).checked).toContain('eligibility:debts')

    // Another device overwrites the row with a newer copy; our token is now stale.
    table.rows.set('u1', remoteRow('u1', '2026-09-09T00:00:00.000Z', { current_stage: 'category' }))
    useAppStore.getState().setNote('eligibility', 'ещё правка')
    await vi.advanceTimersByTimeAsync(1600)
    // The newer cloud copy won (it is dated after our change); our note is kept as backup.
    expect(useAppStore.getState().notes.eligibility).toBe('из облака')
    expect(useSyncStore.getState().backup?.notes.eligibility).toBe('ещё правка')
    expect(useSyncStore.getState().lastSeenServerAt).toBe('2026-09-09T00:00:00.000Z')
  })

  it('refuses to touch a row written by a newer app version', async () => {
    const table = fakeTable()
    table.rows.set('u1', remoteRow('u1', '2026-09-01T10:00:00.000Z', { schema_version: CONTENT_META.schemaVersion + 1 }))
    const auth = createAuthStore(fakeAuth())
    useAppStore.getState().setProfile(medic)
    stop = startSync(table.client as unknown as Parameters<typeof startSync>[0], auth)
    auth.setState({ status: 'signed-in', user: { id: 'u1', email: 'a@b.kz' }, role: 'user' })
    await flush()
    await flush()
    expect(useSyncStore.getState().status).toBe('outdated')
    useAppStore.getState().toggleCheck('eligibility', 'debts')
    await vi.advanceTimersByTimeAsync(1600)
    await pushProgress()
    expect(table.writes).toEqual([])
  })

  it('never auto-uploads one account\'s data into another account', async () => {
    const table = fakeTable()
    table.rows.set('u2', remoteRow('u2', '2026-09-01T10:00:00.000Z'))
    const auth = createAuthStore(fakeAuth())
    useAppStore.getState().setProfile(medic)
    useAppStore.getState().setNote('eligibility', 'данные u1')
    useSyncStore.setState({ linkedUserId: 'u1', lastLocalChangeAt: '2026-09-05T00:00:00.000Z' })
    stop = startSync(table.client as unknown as Parameters<typeof startSync>[0], auth)
    auth.setState({ status: 'signed-in', user: { id: 'u2', email: 'b@b.kz' }, role: 'user' })
    await flush()
    await flush()
    expect(useSyncStore.getState().status).toBe('conflict')
    expect(table.writes).toEqual([])
  })

  it('keeps the local copy and stops pushing after sign-out', async () => {
    const table = fakeTable()
    const auth = createAuthStore(fakeAuth())
    useAppStore.getState().setProfile(medic)
    stop = startSync(table.client as unknown as Parameters<typeof startSync>[0], auth)
    auth.setState({ status: 'signed-in', user: { id: 'u1', email: 'a@b.kz' }, role: 'user' })
    await flush()
    await flush()
    expect(table.writes).toEqual(['insert'])
    auth.setState({ status: 'anon', user: null, role: null })
    useAppStore.getState().toggleCheck('eligibility', 'debts')
    await vi.advanceTimersByTimeAsync(1600)
    expect(table.writes).toEqual(['insert'])
    expect(useAppStore.getState().profile).toEqual(medic)
    expect(useSyncStore.getState().status).toBe('idle')
  })
})
