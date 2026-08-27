import type { DocItem, Profile, StageId } from '@/content/types'
import { DOCUMENTS } from '@/content/documents'
import { evaluate } from './applicability'
import { applicableStages } from './progress'

export interface DocGroup {
  stage: StageId
  items: DocItem[]
}

/** True when the profile answers already cover this document. */
export const isDocAuto = (doc: DocItem, profile: Profile): boolean =>
  doc.autoCompleteWhen !== undefined && evaluate(doc.autoCompleteWhen, profile)

/** Documents relevant to the profile, grouped in roadmap order. */
export function documentsFor(profile: Profile): DocGroup[] {
  const stageOrder = applicableStages(profile).map((s) => s.id)
  const relevant = DOCUMENTS.filter((d) => stageOrder.includes(d.stage) && evaluate(d.appliesTo, profile))
  return stageOrder
    .map((stage) => ({ stage, items: relevant.filter((d) => d.stage === stage) }))
    .filter((g) => g.items.length > 0)
}
