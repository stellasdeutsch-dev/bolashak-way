import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { DateKey, Locale, Profile, StageId, Track } from '@/content/types'
import { CONTENT_META } from '@/content/meta'
import { STORE_KEY } from '@/cloud/config'
import { sanitizeProgress, type Progress } from '@/domain/exportImport'

export type ThemePref = 'system' | 'light' | 'dark'

export interface AppState {
  schemaVersion: number
  locale: Locale
  theme: ThemePref
  profile: Profile | null
  onboardedAt: string | null
  /** Ids of manually checked checklist items ("stageId:itemId"). */
  checked: string[]
  /** Stages the user explicitly marked as done. */
  stagesDone: StageId[]
  /** Document ids the user has collected. */
  documentsDone: string[]
  /** Free-form note per stage. */
  notes: Record<string, string>
  /** Anchor dates (ISO yyyy-mm-dd) that personal deadlines are computed from. */
  dates: Partial<Record<DateKey, string>>
  /**
   * Progress of the other programmes the reader has tried. Checklists share stage ids
   * across programmes, so a tick made for the master's must not count for an internship:
   * switching programme files the current progress here and brings back the target's.
   */
  archive: Partial<Record<Track, Progress>>

  setLocale: (l: Locale) => void
  setTheme: (t: ThemePref) => void
  setProfile: (p: Profile) => void
  toggleCheck: (stage: StageId, item: string) => void
  isChecked: (stage: StageId, item: string) => boolean
  setStageDone: (stage: StageId, done: boolean) => void
  toggleDocument: (docId: string) => void
  setNote: (stage: StageId, note: string) => void
  setDate: (key: DateKey, value: string | null) => void
  reset: () => void
  hydrateFrom: (data: Partial<AppState>) => void
}

const detectLocale = (): Locale => {
  if (typeof navigator === 'undefined') return 'ru'
  const l = navigator.language.slice(0, 2).toLowerCase()
  return l === 'kk' ? 'kk' : l === 'en' ? 'en' : 'ru'
}

const EMPTY = {
  profile: null,
  onboardedAt: null,
  checked: [] as string[],
  stagesDone: [] as StageId[],
  documentsDone: [] as string[],
  notes: {} as Record<string, string>,
  dates: {} as Partial<Record<DateKey, string>>,
}

const progressOf = (st: AppState): Progress => ({
  profile: st.profile,
  onboardedAt: st.onboardedAt,
  checked: st.checked,
  stagesDone: st.stagesDone,
  documentsDone: st.documentsDone,
  notes: st.notes,
  dates: st.dates,
})

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      schemaVersion: CONTENT_META.schemaVersion,
      locale: detectLocale(),
      theme: 'system',
      ...EMPTY,
      archive: {},

      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => set({ theme }),
      setProfile: (profile) => {
        const st = get()
        const now = new Date().toISOString()
        if (!st.profile || st.profile.track === profile.track) {
          set({ profile, onboardedAt: st.onboardedAt && st.profile ? st.onboardedAt : now })
          return
        }
        const archive = { ...st.archive, [st.profile.track]: progressOf(st) }
        const back = archive[profile.track]
        delete archive[profile.track]
        set({ ...EMPTY, ...(back ?? {}), profile, onboardedAt: back?.onboardedAt ?? now, archive })
      },

      toggleCheck: (stage, item) => {
        const key = `${stage}:${item}`
        const checked = get().checked
        set({ checked: checked.includes(key) ? checked.filter((k) => k !== key) : [...checked, key] })
      },
      isChecked: (stage, item) => get().checked.includes(`${stage}:${item}`),

      setStageDone: (stage, done) => {
        const list = get().stagesDone
        set({ stagesDone: done ? (list.includes(stage) ? list : [...list, stage]) : list.filter((s) => s !== stage) })
      },

      toggleDocument: (docId) => {
        const list = get().documentsDone
        set({ documentsDone: list.includes(docId) ? list.filter((d) => d !== docId) : [...list, docId] })
      },

      setNote: (stage, note) => set({ notes: { ...get().notes, [stage]: note } }),

      setDate: (key, value) => {
        const dates = { ...get().dates }
        if (value) dates[key] = value
        else delete dates[key]
        set({ dates })
      },

      reset: () => set({ ...EMPTY, archive: {} }),

      hydrateFrom: (data) =>
        set({
          profile: data.profile ?? null,
          onboardedAt: data.onboardedAt ?? null,
          checked: data.checked ?? [],
          stagesDone: data.stagesDone ?? [],
          documentsDone: data.documentsDone ?? [],
          notes: data.notes ?? {},
          dates: data.dates ?? {},
          locale: data.locale ?? get().locale,
          theme: data.theme ?? get().theme,
        }),
    }),
    {
      // The cloud build shares github.io's origin with the classic build; distinct keys keep them apart.
      name: STORE_KEY,
      version: CONTENT_META.schemaVersion,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        schemaVersion: s.schemaVersion,
        locale: s.locale,
        theme: s.theme,
        profile: s.profile,
        onboardedAt: s.onboardedAt,
        checked: s.checked,
        stagesDone: s.stagesDone,
        documentsDone: s.documentsDone,
        notes: s.notes,
        dates: s.dates,
        archive: s.archive,
      }),
      // Runs on every load, not only on version bumps: whatever the browser kept from an
      // older content year is cut down to what the current model understands.
      merge: (persisted, current) => {
        const raw = (persisted ?? {}) as Partial<AppState>
        const archive: Partial<Record<Track, Progress>> = {}
        for (const [track, value] of Object.entries(raw.archive ?? {})) {
          const clean = sanitizeProgress(value)
          if (clean.profile && clean.profile.track === track) archive[track as Track] = clean
        }
        return {
          ...current,
          locale: raw.locale === 'kk' || raw.locale === 'en' || raw.locale === 'ru' ? raw.locale : current.locale,
          theme: raw.theme === 'light' || raw.theme === 'dark' || raw.theme === 'system' ? raw.theme : current.theme,
          ...sanitizeProgress(raw),
          archive,
        }
      },
      migrate: (persisted, version) => {
        const state = { ...((persisted ?? {}) as Record<string, unknown>) }
        // v0 → v1: the pre-release build stored a flat `answers` object; normalise the lists.
        if (version < 1) {
          state.checked = Array.isArray(state.checked) ? state.checked : []
          state.stagesDone = Array.isArray(state.stagesDone) ? state.stagesDone : []
          state.documentsDone = Array.isArray(state.documentsDone) ? state.documentsDone : []
          state.notes = typeof state.notes === 'object' && state.notes ? state.notes : {}
        }
        // v1 → v2: personal anchor dates.
        if (version < 2) {
          state.dates = typeof state.dates === 'object' && state.dates ? state.dates : {}
        }
        // v2 → v3: progress of other programmes is kept apart.
        if (version < 3) {
          state.archive = {}
        }
        state.schemaVersion = CONTENT_META.schemaVersion
        return state
      },
    },
  ),
)
