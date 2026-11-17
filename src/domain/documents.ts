import type { DocItem, Profile, StageId } from '@/content/types'
import { DOCUMENTS, docForTrack } from '@/content/documents'
import { evaluate } from './applicability'
import { applicableStages } from './progress'

export interface DocGroup {
  stage: StageId
  items: DocItem[]
}

/** Documents relevant to the profile, grouped in roadmap order. */
export function documentsFor(profile: Profile): DocGroup[] {
  const stageOrder = applicableStages(profile).map((s) => s.id)
  const relevant = DOCUMENTS.filter((d) => stageOrder.includes(d.stage) && evaluate(d.appliesTo, profile)).map((d) => docForTrack(d, profile.track))
  return stageOrder
    .map((stage) => ({ stage, items: relevant.filter((d) => d.stage === stage) }))
    .filter((g) => g.items.length > 0)
}
