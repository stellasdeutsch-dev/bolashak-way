import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { DateKey, Locale, Profile, StageId } from '@/content/types'
import { CONTENT_META } from '@/content/meta'

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

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      schemaVersion: CONTENT_META.schemaVersion,
      locale: detectLocale(),
      theme: 'system',
      ...EMPTY,

      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => set({ theme }),
      setProfile: (profile) => set({ profile, onboardedAt: new Date().toISOString() }),

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

      reset: () => set({ ...EMPTY }),

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
      name: 'bolashak-way',
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
      }),
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
        state.schemaVersion = CONTENT_META.schemaVersion
        return state
      },
    },
  ),
)
