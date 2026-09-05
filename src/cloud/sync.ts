import type { StoreApi, UseBoundStore } from 'zustand'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Profile, StageId } from '@/content/types'
import { CONTENT_META } from '@/content/meta'
import { buildSnapshot, parseSnapshot, type Snapshot } from '@/domain/exportImport'
import { computeProgress } from '@/domain/progress'
import { useAppStore, type AppState } from '@/store/useAppStore'
import { useSyncStore } from './syncStore'
import type { AuthState } from './useAuth'

/* ────────────────────────────── pure part ────────────────────────────── */

export const USER_FIELDS = ['profile', 'onboardedAt', 'checked', 'stagesDone', 'documentsDone', 'notes', 'dates'] as const
export type UserFields = Pick<AppState, (typeof USER_FIELDS)[number]>

export function pickUserFields(s: AppState): UserFields {
  return {
    profile: s.profile,
    onboardedAt: s.onboardedAt,
    checked: s.checked,
    stagesDone: s.stagesDone,
    documentsDone: s.documentsDone,
    notes: s.notes,
    dates: s.dates,
  }
}

type Fields = Pick<Snapshot, (typeof USER_FIELDS)[number]>

/** Nothing the user did is in here — no answers, no ticks, no notes, no dates. */
export function isEmptySnapshot(s: Fields | null | undefined): boolean {
  if (!s) return true
  return (
    s.profile === null &&
    s.checked.length === 0 &&
    s.stagesDone.length === 0 &&
    s.documentsDone.length === 0 &&
    Object.values(s.notes).every((n) => !n) &&
    Object.keys(s.dates).length === 0
  )
}

const sortedJson = (v: unknown) => JSON.stringify(v, (_, val) => (Array.isArray(val) ? [...val].sort() : val))

/** Same user content, ignoring the envelope (exportedAt, schemaVersion, competitionYear). */
export function sameUserFields(a: Fields, b: Fields): boolean {
  const norm = (s: Fields) =>
    sortedJson({
      profile: s.profile,
      checked: s.checked,
      stagesDone: s.stagesDone,
      documentsDone: s.documentsDone,
      notes: Object.fromEntries(Object.entries(s.notes).filter(([, v]) => v)),
      dates: s.dates,
    })
  return norm(a) === norm(b)
}

export interface Side {
  snapshot: Fields | null
  /** ISO time of the last change on that side; null when unknown. */
  updatedAt: string | null
}

export type MergeDecision = 'none' | 'pull' | 'push' | 'ask'

/**
 * Which copy wins when a device and the cloud disagree. Checked strictly in order.
 * `firstLink` is true the first time this device meets this account: then neither side
 * is trusted over the other and the person decides.
 */
export function mergeSnapshots(local: Side, remote: Side, opts: { firstLink: boolean }): MergeDecision {
  const localEmpty = isEmptySnapshot(local.snapshot)
  const remoteEmpty = isEmptySnapshot(remote.snapshot)
  if (localEmpty && remoteEmpty) return 'none'
  if (localEmpty) return 'pull'
  if (remoteEmpty) return 'push'
  if (sameUserFields(local.snapshot!, remote.snapshot!)) return 'none'
  if (opts.firstLink) return 'ask'
  if (!local.updatedAt) return 'pull'
  const l = Date.parse(local.updatedAt)
  const r = remote.updatedAt ? Date.parse(remote.updatedAt) : Number.NEGATIVE_INFINITY
  // A tie goes to the cloud so every device converges on the same copy.
  return l > r ? 'push' : 'pull'
}

export interface ProgressRow {
  user_id: string
  snapshot: unknown
  schema_version: number
  competition_year: number
  track: string | null
  category: string | null
  current_stage: string | null
  ratio: number
  done_stages: number
  total_stages: number
  client_updated_at: string
  updated_at?: string
}

/** The server row for the current state: the snapshot plus the columns admins sort by. */
export function rowFromState(userId: string, fields: UserFields, clientUpdatedAt: string): ProgressRow {
  const snapshot = buildSnapshot(fields, clientUpdatedAt)
  const progress = fields.profile
    ? computeProgress({ profile: fields.profile as Profile, checked: fields.checked, stagesDone: fields.stagesDone as StageId[] })
    : null
  return {
    user_id: userId,
    snapshot,
    schema_version: snapshot.schemaVersion,
    competition_year: snapshot.competitionYear,
    track: fields.profile?.track ?? null,
    category: fields.profile?.category ?? null,
    current_stage: progress?.current?.stage.id ?? null,
    ratio: progress ? Math.round(progress.ratio * 10000) / 10000 : 0,
    done_stages: progress?.doneStages ?? 0,
    total_stages: progress?.totalStages ?? 0,
    client_updated_at: clientUpdatedAt,
  }
}

/** Runs the stored snapshot through the same validator as a JSON import. */
export function snapshotFromRow(row: Pick<ProgressRow, 'snapshot'> | null | undefined): Snapshot | null {
  if (!row || row.snapshot == null) return null
  try {
    return parseSnapshot(JSON.stringify(row.snapshot))
  } catch {
    return null
  }
}

/* ────────────────────────────── live part ────────────────────────────── */

type SyncClient = Pick<SupabaseClient, 'from'>
type AuthStore = UseBoundStore<StoreApi<AuthState>>

const DEBOUNCE_MS = 1500
const sync = useSyncStore

let client: SyncClient | null = null
let auth: AuthStore | null = null
let timer: ReturnType<typeof setTimeout> | null = null
let applyingRemote = false
let inFlight: Promise<void> | null = null

const now = () => new Date().toISOString()
const userId = () => auth?.getState().user?.id ?? null
const online = () => (typeof navigator === 'undefined' ? true : navigator.onLine !== false)

function applyRemote(snapshot: Snapshot, remoteAt: string) {
  applyingRemote = true
  try {
    useAppStore.getState().hydrateFrom(snapshot as Partial<AppState>)
  } finally {
    applyingRemote = false
  }
  sync.getState().set({ lastLocalChangeAt: remoteAt, lastSeenServerAt: remoteAt, dirty: false })
}

function keepBackup() {
  const fields = pickUserFields(useAppStore.getState())
  if (isEmptySnapshot(fields)) return
  sync.getState().set({ backup: buildSnapshot(fields, now()), backupAt: now() })
}

async function fetchRemote(uid: string): Promise<{ row: ProgressRow | null; error: string | null }> {
  if (!client) return { row: null, error: 'no client' }
  const { data, error } = await client.from('progress').select('*').eq('user_id', uid).maybeSingle()
  if (error) return { row: null, error: error.message }
  return { row: (data as ProgressRow | null) ?? null, error: null }
}

/** Pulls the server copy when it is newer than what this device has seen. */
export async function pullProgress(): Promise<void> {
  const uid = userId()
  if (!uid || !client) return
  const { row, error } = await fetchRemote(uid)
  if (error) {
    sync.getState().set({ status: online() ? 'error' : 'offline', lastError: error })
    return
  }
  if (!row) return
  if (row.schema_version > CONTENT_META.schemaVersion) {
    sync.getState().set({ status: 'outdated' })
    return
  }
  const seen = sync.getState().lastSeenServerAt
  if (seen && Date.parse(row.client_updated_at) <= Date.parse(seen)) return
  const snapshot = snapshotFromRow(row)
  if (!snapshot) return
  if (sync.getState().dirty) return // local edits pending; they will push and the row will be re-read then
  applyRemote(snapshot, row.client_updated_at)
  sync.getState().set({ status: 'saved', lastSavedAt: row.client_updated_at })
}

/** Writes the current state; re-reads and merges once if somebody else wrote first. */
export async function pushProgress(retry = true): Promise<void> {
  const uid = userId()
  if (!uid || !client) return
  const st = sync.getState()
  if (st.status === 'outdated' || st.pendingChoice) return
  if (!online()) {
    st.set({ status: 'offline' })
    return
  }
  st.set({ status: 'saving', lastError: null })
  const at = now()
  const row = rowFromState(uid, pickUserFields(useAppStore.getState()), at)
  const token = st.lastSeenServerAt

  let written = false
  let message: string | null = null
  if (token) {
    const { data, error } = await client.from('progress').update(row).eq('user_id', uid).eq('client_updated_at', token).select('client_updated_at')
    if (error) message = error.message
    else written = Array.isArray(data) && data.length > 0
  } else {
    const { error } = await client.from('progress').insert(row)
    if (!error) written = true
    else if (error.code !== '23505') message = error.message
  }

  if (written) {
    sync.getState().set({ status: 'saved', dirty: false, lastSeenServerAt: at, lastSavedAt: at, lastError: null })
    return
  }
  if (message) {
    sync.getState().set({ status: online() ? 'error' : 'offline', lastError: message })
    return
  }
  // No row matched our token: another device wrote in between. Take the newer copy and try once more.
  const { row: remote } = await fetchRemote(uid)
  if (remote && remote.schema_version > CONTENT_META.schemaVersion) {
    sync.getState().set({ status: 'outdated' })
    return
  }
  const decision = mergeSnapshots(
    { snapshot: pickUserFields(useAppStore.getState()), updatedAt: sync.getState().lastLocalChangeAt },
    { snapshot: remote ? snapshotFromRow(remote) : null, updatedAt: remote?.client_updated_at ?? null },
    { firstLink: false },
  )
  if (decision === 'pull' && remote) {
    const snap = snapshotFromRow(remote)
    if (snap) {
      keepBackup()
      applyRemote(snap, remote.client_updated_at)
      sync.getState().set({ status: 'saved', lastSavedAt: remote.client_updated_at })
      return
    }
  }
  sync.getState().set({ lastSeenServerAt: remote?.client_updated_at ?? null })
  if (retry) await pushProgress(false)
  else sync.getState().set({ status: 'error', lastError: 'conflict' })
}

function schedulePush() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    timer = null
    void flush()
  }, DEBOUNCE_MS)
}

async function flush() {
  if (inFlight) return inFlight
  inFlight = (async () => {
    if (userId() && sync.getState().dirty) await pushProgress()
  })().finally(() => {
    inFlight = null
  })
  return inFlight
}

/** The first meeting between this device and an account, or a return visit. */
async function onSignedIn(uid: string) {
  const st = sync.getState()
  const firstLink = st.linkedUserId !== uid
  const { row, error } = await fetchRemote(uid)
  if (error) {
    st.set({ status: online() ? 'error' : 'offline', lastError: error })
    return
  }
  if (row && row.schema_version > CONTENT_META.schemaVersion) {
    st.set({ status: 'outdated' })
    return
  }
  const remoteSnap = row ? snapshotFromRow(row) : null
  const local = { snapshot: pickUserFields(useAppStore.getState()), updatedAt: st.lastLocalChangeAt }
  const remote = { snapshot: remoteSnap, updatedAt: row?.client_updated_at ?? null }
  const decision = mergeSnapshots(local, remote, { firstLink })

  if (decision === 'ask') {
    st.set({ status: 'conflict', pendingChoice: { remote: remoteSnap, remoteAt: remote.updatedAt } })
    return
  }
  st.set({ linkedUserId: uid, pendingChoice: null })
  if (decision === 'none') {
    st.set({ lastSeenServerAt: row?.client_updated_at ?? null, dirty: row ? false : st.dirty, status: row ? 'saved' : 'idle' })
    if (!row && !isEmptySnapshot(local.snapshot)) await pushProgress()
    return
  }
  if (decision === 'pull' && remoteSnap && row) {
    keepBackup()
    applyRemote(remoteSnap, row.client_updated_at)
    st.set({ status: 'saved', lastSavedAt: row.client_updated_at })
    return
  }
  // push
  st.set({ lastSeenServerAt: row?.client_updated_at ?? null, dirty: true })
  await pushProgress()
}

/** Answers the first-link question. */
export async function resolveChoice(choice: 'cloud' | 'device'): Promise<void> {
  const uid = userId()
  const st = sync.getState()
  const pending = st.pendingChoice
  if (!uid || !pending) return
  st.set({ pendingChoice: null, linkedUserId: uid })
  if (choice === 'cloud' && pending.remote && pending.remoteAt) {
    keepBackup()
    applyRemote(pending.remote, pending.remoteAt)
    st.set({ status: 'saved', lastSavedAt: pending.remoteAt })
    return
  }
  st.set({ lastSeenServerAt: pending.remoteAt, dirty: true, status: 'idle' })
  await pushProgress()
}

export async function syncNow(): Promise<void> {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (sync.getState().dirty) await flush()
  else await pullProgress()
}

export function restoreBackup(): boolean {
  const st = sync.getState()
  if (!st.backup) return false
  useAppStore.getState().hydrateFrom(st.backup as Partial<AppState>)
  st.set({ backup: null, backupAt: null })
  return true
}

/** Wires the app store, the auth store and the browser events together. Call once at boot. */
export function startSync(c: SyncClient, a: AuthStore): () => void {
  client = c
  auth = a
  const unsubs: (() => void)[] = []

  const attachAppSubscription = () => {
    unsubs.push(
      useAppStore.subscribe((s, prev) => {
        if (applyingRemote) return
        if (!USER_FIELDS.some((k) => s[k] !== prev[k])) return
        sync.getState().set({ dirty: true, lastLocalChangeAt: now() })
        if (userId() && !sync.getState().pendingChoice) schedulePush()
      }),
    )
  }
  if (useAppStore.persist.hasHydrated()) attachAppSubscription()
  else unsubs.push(useAppStore.persist.onFinishHydration(attachAppSubscription))

  let lastUser: string | null = a.getState().user?.id ?? null
  if (lastUser) void onSignedIn(lastUser)
  unsubs.push(
    a.subscribe((s) => {
      const uid = s.status === 'signed-in' ? (s.user?.id ?? null) : null
      if (uid && uid !== lastUser) {
        lastUser = uid
        void onSignedIn(uid)
      } else if (!uid && lastUser) {
        lastUser = null
        if (timer) clearTimeout(timer)
        timer = null
        sync.getState().set({ status: 'idle', pendingChoice: null, lastSeenServerAt: null })
      }
    }),
  )

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') {
      if (timer) {
        clearTimeout(timer)
        timer = null
        void flush()
      }
    } else if (userId() && !sync.getState().dirty) void pullProgress()
  }
  const onOnline = () => {
    if (userId() && sync.getState().dirty) void flush()
  }
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('online', onOnline)
  unsubs.push(() => document.removeEventListener('visibilitychange', onVisibility))
  unsubs.push(() => window.removeEventListener('online', onOnline))

  return () => unsubs.forEach((u) => u())
}

export type { Snapshot }
