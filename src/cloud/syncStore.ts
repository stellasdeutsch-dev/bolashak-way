import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Snapshot } from '@/domain/exportImport'
import { SYNC_STORE_KEY } from './config'

export type SyncStatus = 'idle' | 'saving' | 'saved' | 'error' | 'offline' | 'outdated' | 'conflict'

export interface SyncState {
  status: SyncStatus
  /** Local changes not yet on the server. */
  dirty: boolean
  /** When the roadmap last changed on this device (ISO). Tracked here because the app store carries no timestamp. */
  lastLocalChangeAt: string | null
  /** `client_updated_at` of the server row this device last agreed with — the optimistic-concurrency token. */
  lastSeenServerAt: string | null
  /** The account this device's copy belongs to; a different user signing in must never auto-push over it. */
  linkedUserId: string | null
  /** The local copy that lost a merge. One slot, restorable from Settings. */
  backup: Snapshot | null
  backupAt: string | null
  lastSavedAt: string | null
  lastError: string | null
  /** Set while the first-link question is open: which copy should win. */
  pendingChoice: { remote: Snapshot | null; remoteAt: string | null } | null
  /** The classic-version import was offered and answered. */
  legacyDone: boolean
  set: (patch: Partial<SyncState>) => void
}

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      status: 'idle',
      dirty: false,
      lastLocalChangeAt: null,
      lastSeenServerAt: null,
      linkedUserId: null,
      backup: null,
      backupAt: null,
      lastSavedAt: null,
      lastError: null,
      pendingChoice: null,
      legacyDone: false,
      set: (patch) => set(patch),
    }),
    {
      name: SYNC_STORE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        dirty: s.dirty,
        lastLocalChangeAt: s.lastLocalChangeAt,
        lastSeenServerAt: s.lastSeenServerAt,
        linkedUserId: s.linkedUserId,
        backup: s.backup,
        backupAt: s.backupAt,
        lastSavedAt: s.lastSavedAt,
        legacyDone: s.legacyDone,
      }),
    },
  ),
)
