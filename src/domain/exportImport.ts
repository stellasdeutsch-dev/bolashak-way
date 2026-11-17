import { DATE_KEYS, TRACKS, WORKER_GROUP_IDS, type DateKey, type Profile, type StageId, type Track, type WorkerGroup } from '@/content/types'
import { CONTENT_META } from '@/content/meta'
import { CATEGORIES } from '@/content/categories'
import { STAGES } from '@/content/stages'
import { DOCUMENTS } from '@/content/documents'
import { isIsoDate } from './dates'

export interface Snapshot {
  app: 'bolashak-way'
  schemaVersion: number
  exportedAt: string
  competitionYear: number
  profile: Profile | null
  onboardedAt: string | null
  checked: string[]
  stagesDone: StageId[]
  documentsDone: string[]
  notes: Record<string, string>
  dates: Partial<Record<DateKey, string>>
  /** Progress of the other programmes on this device. Absent in files from before it was saved. */
  archive?: Archive
}

const oneOf = <T extends string>(list: readonly T[], v: unknown): v is T => (list as readonly unknown[]).includes(v)

const STAGE_IDS = new Set<string>(STAGES.map((s) => s.id))
const DOC_IDS = new Set<string>(DOCUMENTS.map((d) => d.id))
const CHECK_IDS = new Set<string>(STAGES.flatMap((s) => s.checklist.map((i) => `${s.id}:${i.id}`)))


/**
 * Accepts a profile only when every field matches the current content model –
 * an unknown category would otherwise crash the roadmap on the next render. Plans saved
 * while the questions still asked about the invitation, certificates and experience carry
 * those answers too; they are not asked any more and are left out, not held against the plan.
 */
export function validProfile(value: unknown): Profile | null {
  if (!value || typeof value !== 'object') return null
  const p = value as Record<string, unknown>
  if (!oneOf(TRACKS, p.track)) return null
  if (typeof p.category !== 'string' || !(p.category in CATEGORIES)) return null
  const category = CATEGORIES[p.category as keyof typeof CATEGORIES]
  if (category.track !== p.track) return null

  const workerGroup: WorkerGroup | null | undefined = p.workerGroup == null ? null : oneOf(WORKER_GROUP_IDS, p.workerGroup) ? p.workerGroup : undefined
  if (workerGroup === undefined) return null

  return { track: p.track, category: p.category as Profile['category'], workerGroup }
}

const keepKnown = (value: unknown, known: Set<string>): string[] =>
  Array.isArray(value) ? Array.from(new Set(value.filter((v): v is string => typeof v === 'string' && known.has(v)))) : []

export function buildSnapshot(state: Omit<Snapshot, 'app' | 'schemaVersion' | 'exportedAt' | 'competitionYear'>, now: string): Snapshot {
  return {
    app: 'bolashak-way',
    schemaVersion: CONTENT_META.schemaVersion,
    exportedAt: now,
    competitionYear: CONTENT_META.competitionYear,
    ...state,
  }
}

/**
 * Returns null when the payload is not a Bolashak Way snapshot or its profile does
 * not match the current content model. Unknown list entries are dropped silently.
 */
export function parseSnapshot(text: string): Snapshot | null {
  let data: Partial<Snapshot>
  try {
    data = JSON.parse(text) as Partial<Snapshot>
  } catch {
    return null
  }
  if (!data || typeof data !== 'object' || data.app !== 'bolashak-way') return null

  const progress = sanitizeProgress(data)
  // A payload that carries a profile we cannot honour is rejected outright.
  if (data.profile != null && progress.profile === null) return null

  return {
    app: 'bolashak-way',
    schemaVersion: typeof data.schemaVersion === 'number' ? data.schemaVersion : CONTENT_META.schemaVersion,
    exportedAt: typeof data.exportedAt === 'string' ? data.exportedAt : '',
    competitionYear: typeof data.competitionYear === 'number' ? data.competitionYear : CONTENT_META.competitionYear,
    ...progress,
    // An older file has no archive: leave the device's own as it is rather than wipe it.
    ...(data.archive !== undefined ? { archive: sanitizeArchive(data.archive, progress.profile?.track) } : {}),
  }
}

export type Progress = Pick<Snapshot, 'profile' | 'onboardedAt' | 'checked' | 'stagesDone' | 'documentsDone' | 'notes' | 'dates'>
export type Archive = Partial<Record<Track, Progress>>

/**
 * The other programmes' progress, each checked like the active one. An entry is kept only
 * under the programme its own profile belongs to, and never for the programme that is open.
 */
export function sanitizeArchive(raw: unknown, activeTrack?: Track): Archive {
  const archive: Archive = {}
  if (!raw || typeof raw !== 'object') return archive
  for (const [track, value] of Object.entries(raw)) {
    if (track === activeTrack) continue
    const clean = sanitizeProgress(value)
    if (clean.profile && clean.profile.track === track) archive[track as Track] = clean
  }
  return archive
}

/**
 * Keeps only what the current content model understands. Used for imported files and
 * for whatever the browser stored last year: a category renamed since then must lead
 * back to the questions, not to a blank screen.
 */
export function sanitizeProgress(raw: unknown): Progress {
  const data = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const notes: Record<string, string> = {}
  if (data.notes && typeof data.notes === 'object') {
    for (const [k, v] of Object.entries(data.notes)) {
      if (STAGE_IDS.has(k) && typeof v === 'string') notes[k] = v.slice(0, 20_000)
    }
  }

  const dates: Partial<Record<DateKey, string>> = {}
  if (data.dates && typeof data.dates === 'object') {
    for (const [k, v] of Object.entries(data.dates)) {
      if (oneOf(DATE_KEYS, k) && isIsoDate(v)) dates[k] = v
    }
  }

  const profile = data.profile == null ? null : validProfile(data.profile)
  return {
    profile,
    onboardedAt: profile && typeof data.onboardedAt === 'string' ? data.onboardedAt : null,
    checked: keepKnown(data.checked, CHECK_IDS),
    stagesDone: keepKnown(data.stagesDone, STAGE_IDS) as StageId[],
    documentsDone: keepKnown(data.documentsDone, DOC_IDS),
    notes,
    dates,
  }
}

export function downloadSnapshot(snapshot: Snapshot) {
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `bolashak-way-${snapshot.exportedAt.slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
