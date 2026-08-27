import type { Profile, StageId } from '@/content/types'
import { CONTENT_META } from '@/content/meta'

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
}

export function buildSnapshot(state: Omit<Snapshot, 'app' | 'schemaVersion' | 'exportedAt' | 'competitionYear'>, now: string): Snapshot {
  return {
    app: 'bolashak-way',
    schemaVersion: CONTENT_META.schemaVersion,
    exportedAt: now,
    competitionYear: CONTENT_META.competitionYear,
    ...state,
  }
}

/** Returns null when the payload is not a Bolashak Way snapshot. */
export function parseSnapshot(text: string): Snapshot | null {
  try {
    const data = JSON.parse(text) as Partial<Snapshot>
    if (data.app !== 'bolashak-way') return null
    return {
      app: 'bolashak-way',
      schemaVersion: typeof data.schemaVersion === 'number' ? data.schemaVersion : CONTENT_META.schemaVersion,
      exportedAt: data.exportedAt ?? '',
      competitionYear: data.competitionYear ?? CONTENT_META.competitionYear,
      profile: data.profile ?? null,
      onboardedAt: data.onboardedAt ?? null,
      checked: Array.isArray(data.checked) ? data.checked : [],
      stagesDone: Array.isArray(data.stagesDone) ? data.stagesDone : [],
      documentsDone: Array.isArray(data.documentsDone) ? data.documentsDone : [],
      notes: typeof data.notes === 'object' && data.notes ? data.notes : {},
    }
  } catch {
    return null
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
