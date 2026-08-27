import type { DateKey, ExamId, Invitation, Profile, StageId, Track, WorkerGroup } from '@/content/types'
import { CONTENT_META } from '@/content/meta'
import { CATEGORIES } from '@/content/categories'
import { STAGES } from '@/content/stages'
import { DOCUMENTS } from '@/content/documents'

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
}

const TRACKS: Track[] = ['bachelor', 'master', 'phd_residency', 'internship', 'science_internship']
const WORKER_GROUP_IDS: WorkerGroup[] = ['engineer_agro', 'teacher', 'medical', 'civil', 'media', 'culture', 'judge', 'ai_user', 'nuclear']
const INVITATIONS: Invitation[] = ['none', 'applied', 'unconditional']
const EXAMS: ExamId[] = ['ielts', 'toefl_ibt', 'toefl_pbt', 'det', 'other']
const DATE_KEYS: DateKey[] = ['award_date', 'study_start', 'study_end', 'return_date', 'work_start']

const STAGE_IDS = new Set<string>(STAGES.map((s) => s.id))
const DOC_IDS = new Set<string>(DOCUMENTS.map((d) => d.id))
const CHECK_IDS = new Set<string>(STAGES.flatMap((s) => s.checklist.map((i) => `${s.id}:${i.id}`)))

const isIsoDate = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))

/**
 * Accepts a profile only when every field matches the current content model —
 * an unknown category would otherwise crash the roadmap on the next render.
 */
function validProfile(value: unknown): Profile | null {
  if (!value || typeof value !== 'object') return null
  const p = value as Record<string, unknown>
  if (!TRACKS.includes(p.track as Track)) return null
  if (typeof p.category !== 'string' || !(p.category in CATEGORIES)) return null
  const category = CATEGORIES[p.category as keyof typeof CATEGORIES]
  if (category.track !== p.track) return null
  if (!INVITATIONS.includes(p.invitation as Invitation)) return null
  if (typeof p.kazakhCert !== 'boolean') return null

  const workerGroup = p.workerGroup == null ? null : WORKER_GROUP_IDS.includes(p.workerGroup as WorkerGroup) ? (p.workerGroup as WorkerGroup) : undefined
  if (workerGroup === undefined) return null

  let foreignCert: Profile['foreignCert'] = null
  if (p.foreignCert != null) {
    const fc = p.foreignCert as Record<string, unknown>
    if (!EXAMS.includes(fc.exam as ExamId) || typeof fc.score !== 'number' || !Number.isFinite(fc.score)) return null
    foreignCert = { exam: fc.exam as ExamId, score: fc.score }
  }

  let experience: Profile['experience'] = null
  if (p.experience != null) {
    const ex = p.experience as Record<string, unknown>
    if (typeof ex.years !== 'number' || typeof ex.continuousMonths !== 'number') return null
    if (ex.years < 0 || ex.continuousMonths < 0) return null
    experience = { years: ex.years, continuousMonths: ex.continuousMonths }
  }

  return {
    track: p.track as Track,
    category: p.category as Profile['category'],
    workerGroup,
    invitation: p.invitation as Invitation,
    foreignCert,
    kazakhCert: p.kazakhCert,
    experience,
  }
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

  const profile = data.profile == null ? null : validProfile(data.profile)
  // A payload that carries a profile we cannot honour is rejected outright.
  if (data.profile != null && profile === null) return null

  const notes: Record<string, string> = {}
  if (data.notes && typeof data.notes === 'object') {
    for (const [k, v] of Object.entries(data.notes)) {
      if (STAGE_IDS.has(k) && typeof v === 'string') notes[k] = v
    }
  }

  const dates: Partial<Record<DateKey, string>> = {}
  if (data.dates && typeof data.dates === 'object') {
    for (const [k, v] of Object.entries(data.dates)) {
      if (DATE_KEYS.includes(k as DateKey) && isIsoDate(v)) dates[k as DateKey] = v
    }
  }

  return {
    app: 'bolashak-way',
    schemaVersion: typeof data.schemaVersion === 'number' ? data.schemaVersion : CONTENT_META.schemaVersion,
    exportedAt: typeof data.exportedAt === 'string' ? data.exportedAt : '',
    competitionYear: typeof data.competitionYear === 'number' ? data.competitionYear : CONTENT_META.competitionYear,
    profile,
    onboardedAt: typeof data.onboardedAt === 'string' ? data.onboardedAt : null,
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
